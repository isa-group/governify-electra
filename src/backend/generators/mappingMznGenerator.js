'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const $SyncRefParser = require('json-schema-ref-parser-sync');
const downloadFileSync = require('download-file-sync');

const mznModules = require('./utils/mznModules');
const utils = require('./utils/utils');
const logger = require('./../logger');
const config = require('./../configurations/');

const REMOTE_ENDPOINT_REGEX = /https?:\/\/electra.governify.io\/data/;

module.exports.generateMZN = function (mappingFilePath, name, selectedPlan, mznModuleName, sizeVarName, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME, START_NODE_NAME) {
    try {
        const docRef = yaml.safeLoad(fs.readFileSync(mappingFilePath, 'utf8'));
        const mapping = $SyncRefParser.dereference(docRef);

        const oas = {};
        const sla = {};
        let mznData = '';
        const regex = /[^\w]/gi;

        START_NODE_NAME = START_NODE_NAME ? START_NODE_NAME : mapping.params.rootOperation.value;


        Object.entries(mapping['services']).forEach(([serviceName, oasPath]) => {
            try {
                let docRef = '';
                if (oasPath.includes('http') && !REMOTE_ENDPOINT_REGEX.test(oasPath)) {
                    logger.info('(mappingMznGenerator) DOWNLOADING REMOTE OAS from %s', oasPath);
                    docRef = yaml.safeLoad(downloadFileSync(oasPath));
                } else if (oasPath.includes('http') && REMOTE_ENDPOINT_REGEX.test(oasPath)) {
                    let oasFilePath = path.join(__dirname, '../', '../', '../', config.app.PUBLIC_SUBFOLDER_PATH, oasPath.replace(REMOTE_ENDPOINT_REGEX, ""));
                    logger.info('(mappingMznGenerator) DOWNLOADING LOCAL OAS from %s', oasFilePath);
                    docRef = yaml.safeLoad(fs.readFileSync(oasFilePath, 'utf8'));
                } else if (oasPath.includes('./')) {
                    let oasFilePath = path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, name, oasPath);
                    logger.info('(mappingMznGenerator) DOWNLOADING LOCAL OAS from %s', oasFilePath);
                    docRef = yaml.safeLoad(fs.readFileSync(oasFilePath, 'utf8'));
                }
                oas[serviceName] = $SyncRefParser.dereference(docRef);
            } catch (e) {
                logger.error('Error ', e);
            }
            const slaPath = oas[serviceName].info['x-sla'];
            if (slaPath) {
                try {
                    let slaRef = '';
                    if (slaPath.includes('http') && !REMOTE_ENDPOINT_REGEX.test(slaPath)) {
                        logger.info('(mappingMznGenerator) DOWNLOADING REMOTE SLA from %s', slaPath);
                        slaRef = yaml.safeLoad(downloadFileSync(slaPath));
                    } else if (slaPath.includes('http') && REMOTE_ENDPOINT_REGEX.test(slaPath)) {
                        let slaFilePath = path.join(__dirname, '../', '../', '../', config.app.PUBLIC_SUBFOLDER_PATH, slaPath.replace(REMOTE_ENDPOINT_REGEX, ""));
                        logger.info('(mappingMznGenerator) DOWNLOADING LOCAL SLA from %s', slaFilePath);
                        slaRef = yaml.safeLoad(fs.readFileSync(slaFilePath, 'utf8'));
                    } else if (slaPath.includes('./')) {
                        let slaFilePath = path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, name, slaPath);
                        logger.info('(mappingMznGenerator) DOWNLOADING LOCAL SLA from %s', slaFilePath);
                        slaRef = yaml.safeLoad(fs.readFileSync(slaFilePath, 'utf8'));
                    }
                    sla[serviceName] = $SyncRefParser.dereference(slaRef);
                } catch (e) {
                    logger.error('Error ', e);
                }
            }
        });
        mznData = mznData.concat('%% -------- BEGIN CONSTANTS DEFINITION --------').concat('\n');
        selectedPlan = selectedPlan ? selectedPlan : mapping.params.selectedPlan.value;
        sizeVarName = sizeVarName ? sizeVarName : mapping.params.sizeVarName.value;
        Object.entries(mapping.params).forEach(([paramName, paramObj]) => {
            if (paramObj.value) {
                let value = paramObj.value;
                let paramObjValueNumber = Number(value);
                let isNotNumber = typeof value === 'string' && isNaN(paramObjValueNumber);
                let mznParamType = isNotNumber ? 'string' : 'float'; //TODO: warning if type not supported
                let mznParamValue = isNotNumber ? '"'.concat(value).concat('"') : value;
                mznData = mznData.concat(mznParamType).concat(': ').concat(paramName).concat(' = ').concat(mznParamValue).concat(';').concat('\n');
            } else if (paramObj.plans) {
                let plans = utils.getAllPlanNames(sla, mapping);
                plans.forEach(planName => {
                    let planNameVar = planName.replace(regex, ''); //remove special characters
                    if (planName === selectedPlan || planNameVar === selectedPlan) {
                        let value = paramObj.plans[planName].value;
                        let paramObjValueNumber = Number(value);
                        let isNotNumber = typeof value === 'string' && isNaN(paramObjValueNumber);
                        let mznParamType = isNotNumber ? 'string' : 'float'; //TODO: warning if type not supported
                        let mznParamValue = isNotNumber ? '"'.concat(value).concat('"') : value;
                        mznData = mznData.concat(mznParamType).concat(': ').concat(paramName).concat(' = ').concat(mznParamValue).concat(';').concat('\n');
                    }
                });
            }
        });
        mznData = mznData.concat('%% -------- END CONSTANTS DEFINITION --------').concat('\n');

        mznData = mznData.concat('\n\n');

        mznData = mznData.concat('%% -------- BEGIN SERVICES DEFINITION --------').concat('\n');
        mznData = mznData.concat('\n');

        let mznReqOuterComposition = ''.concat('array[int] of float: ').concat('compositionReq').concat(' = [');
        let mznQuotaOuterComposition = ''.concat('array[int] of float: ').concat('compositionQuota').concat('_').concat('planNameVar').concat(' = [');
        let mznRateOuterComposition = ''.concat('array[int] of float: ').concat('compositionRate').concat('_').concat('planNameVar').concat(' = [');

        let mznReqOuterCompositionCalculated = ''.concat('float: ').concat('compositionReq').concat('_').concat('calculated').concat(' = ');
        let mznQuotaOuterCompositionCalculated = ''.concat('float: ').concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat('calculated').concat(' = ');
        let mznRateOuterCompositionCalculated = ''.concat('float: ').concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat('calculated').concat(' = ');

        let mznProbOuterComposition = '';

        mapping.mappings.forEach(singleMapping => {
            //EACH SERVICE
            let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
            mznData = mznData.concat('%% -------- BEGIN ').concat(inputOperationId).concat(' DEFINITION --------').concat('\n');
            mznData = mznData.concat('\t%name: ').concat(singleMapping.input.service).concat('\n');
            mznData = mznData.concat('\t%operationId: ').concat(inputOperationId).concat('\n');
            mznData = mznData.concat('\t%path: ').concat(singleMapping.input.path).concat('\n');
            mznData = mznData.concat('\t%method: ').concat(singleMapping.input.method).concat('\n');
            mznData = mznData.concat('\n');

            let mznReqInnerComposition = ''.concat('array[int] of float: ').concat('compositionReq').concat('_').concat(inputOperationId).concat(' = [');
            let mznQuotaInnerComposition = ''.concat('array[int] of float: ').concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(' = [');
            let mznRateInnerComposition = ''.concat('array[int] of float: ').concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(' = [');

            let mznReqInnerCompositionCalculated = ''.concat('float: ').concat('compositionReq').concat('_').concat(inputOperationId).concat('_').concat('calculated').concat(' = ');
            let mznQuotaInnerCompositionCalculated = ''.concat('float: ').concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated').concat(' = ');
            let mznRateInnerCompositionCalculated = ''.concat('float: ').concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated').concat(' = ');

            mznData = mznData.concat('%Mapping').concat('\n');
            // mznData = mznData.concat('float: ').concat('count_').concat('START').concat('_').concat(inputOperationId).concat(' = ').concat(singleMapping.input.count).concat(';').concat('\n');

            let mznProbInnerComposition = '';

            singleMapping.output.forEach(singleOutput => {
                //EACH DEPENDENCE OF THE SERVICE
                let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);
                mznData = mznData.concat('%% -------- BEGIN DEPENDENCY ').concat(outputOperationId).concat(' OF ').concat(inputOperationId).concat(' DEFINITION --------').concat('\n');
                mznData = mznData.concat('\t%name: ').concat(singleOutput.service).concat('\n');
                mznData = mznData.concat('\t%operationId: ').concat(outputOperationId).concat('\n');
                mznData = mznData.concat('\t%path: ').concat(singleOutput.path).concat('\n');
                mznData = mznData.concat('\t%method: ').concat(singleOutput.method).concat('\n');

                mznData = mznData.concat('\n');

                mznData = mznData.concat('%Mapping').concat('\n');
                mznData = mznData.concat('float: ').concat('count_').concat(inputOperationId).concat('_').concat(outputOperationId).concat(' = ').concat(singleOutput.count).concat(';').concat('\n');

                mznData = mznData.concat('\t%BEGIN LIMITS FOR: ').concat(outputOperationId).concat('\n');
                if (sla[singleOutput.service] && sla[singleOutput.service].plans) {
                    Object.entries(sla[singleOutput.service].plans).forEach(([planName, plan]) => {
                        mznData = mznData.concat('\t\t%Plan: ').concat(planName).concat('\n');
                        let planNameVar = planName.replace(regex, ''); //remove special characters

                        let quotaReqPlan = utils.getPlan(sla[singleOutput.service], planName, 'quotas', singleOutput.path, singleOutput.method);
                        let rateReqPlan = utils.getPlan(sla[singleOutput.service], planName, 'rates', singleOutput.path, singleOutput.method);

                        if (quotaReqPlan && quotaReqPlan['requests']) {
                            quotaReqPlan = quotaReqPlan['requests'][0]; //TODO: We only support 'requests' so far with 1 element
                            //FIXME: .concat(inputOperationId)
                            if (mznData.indexOf('quota_'.concat(planNameVar).concat('_').concat(outputOperationId).concat('_').concat('value')) < 0) {
                                mznData = mznData.concat('\t\tfloat: ').concat('quota_').concat(planNameVar).concat('_').concat(outputOperationId).concat('_').concat('value').concat(' = ').concat(quotaReqPlan.max).concat(';').concat('\n');
                            }
                            mznData = mznData.concat('\t\tfloat: ').concat('quota_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value').concat(' = ').concat(quotaReqPlan.max).concat(';').concat('\n');
                            mznData = mznData.concat('\t\tfloat: ').concat('quota_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_val').concat(' = ').concat('1').concat(';').concat('\n');
                            mznData = mznData.concat('\t\tstring: ').concat('quota_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_period').concat(' = ').concat('"').concat(quotaReqPlan.period).concat('"').concat(';').concat('\n');

                            mznData = mznData.concat('\n');

                            mznData = mznData.concat('\t\t\t%Unit quota consumption').concat('\n');
                            mznData = mznData.concat('\t\t\tfloat: ').concat('unitQuotaConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value')
                                .concat(' = ')
                                .concat('count_').concat(inputOperationId).concat('_').concat(outputOperationId)
                                .concat('/')
                                .concat('quota_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value').concat(';').concat('\n');

                            mznData = mznData.concat('\t\t\tfloat: ').concat('unitQuotaConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_val')
                                .concat(' = ')
                                .concat('1').concat(';').concat('\n');

                            mznData = mznData.concat('\t\t\tstring: ').concat('unitQuotaConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_period')
                                .concat(' = ')
                                .concat('"').concat(quotaReqPlan.period).concat('"').concat(';').concat('\n');


                            mznData = mznData.concat('\n');
                        } else {
                            mznData = mznData.concat('\t\t%No quotas for plan ').concat(planName).concat(' and path ').concat(singleOutput.path).concat(' and method ').concat(singleOutput.method).concat('\n');
                        }

                        if (rateReqPlan && rateReqPlan['requests']) {
                            rateReqPlan = rateReqPlan['requests'][0]; //TODO: We only support 'requests' so far with 1 element
                            mznData = mznData.concat('\t\tfloat: ').concat('rate_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value').concat(' = ').concat(rateReqPlan.max).concat(';').concat('\n');
                            mznData = mznData.concat('\t\tfloat: ').concat('rate_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_val').concat(' = ').concat('1').concat(';').concat('\n');
                            mznData = mznData.concat('\t\tstring: ').concat('rate_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_period').concat(' = ').concat('"').concat(rateReqPlan.period).concat('"').concat(';').concat('\n');

                            mznData = mznData.concat('\n');

                            mznData = mznData.concat('\t\t\t%Unit rate consumption').concat('\n');

                            mznData = mznData.concat('\t\t\tfloat: ').concat('unitRateConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value')
                                .concat(' = ')
                                .concat('count_').concat(inputOperationId).concat('_').concat(outputOperationId)
                                .concat('/')
                                .concat('rate_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value').concat(';').concat('\n');

                            mznData = mznData.concat('\t\t\tfloat: ').concat('unitRateConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_val')
                                .concat(' = ')
                                .concat('1').concat(';').concat('\n');

                            mznData = mznData.concat('\t\t\tstring: ').concat('unitRateConsumption_').concat(planNameVar).concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('period_period')
                                .concat(' = ')
                                .concat('"').concat(rateReqPlan.period).concat('"').concat(';').concat('\n');

                        } else {
                            mznData = mznData.concat('\t\t%No rates for plan ').concat(planName).concat(' and path ').concat(singleOutput.path).concat(' and method ').concat(singleOutput.method).concat('\n');
                        }
                    });
                }
                mznData = mznData.concat('\t%END LIMITS FOR: ').concat(outputOperationId).concat('\n');
                mznData = mznData.concat('\n');

                // INNER SERVICE COMPOSITION CREATION. TODO: WE ARE SUPPONSING EVERYTHING IS SEQUENTIAL


                let mappingVar = ''.concat('count_').concat(inputOperationId).concat('_').concat(outputOperationId);
                let unitQuotaVar = ''.concat('unitQuotaConsumption_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');
                let unitRateVar = ''.concat('unitRateConsumption_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');

                let probVar = ''.concat('prob_').concat(inputOperationId).concat('_').concat(outputOperationId);

                mznProbInnerComposition = mznProbInnerComposition.concat('float: ').concat(probVar)
                    .concat(' = ')
                    .concat(utils.getGatewayProb(oas, mapping, inputOperationId, outputOperationId)).concat(';').concat('\n');

                // mznReqInnerComposition = mznReqInnerComposition.concat('ceil(').concat(probVar).concat(' * ').concat(mappingVar).concat(')').concat(' , '); //TODO: think about it
                mznReqInnerComposition = mznReqInnerComposition.concat(probVar).concat(' * ').concat(mappingVar).concat(' , '); //TODO: think about it
                mznQuotaInnerComposition = mznQuotaInnerComposition.concat(probVar).concat(' * ').concat(unitQuotaVar).concat(' , '); //TODO: think about it 
                mznRateInnerComposition = mznRateInnerComposition.concat(probVar).concat(' * ').concat(unitRateVar).concat(' , '); //TODO: think about it 

                //nota mental: estas mezclando probabilidades con ativacion/descativacion. Ek XOR(a,b,c) = prob_1(1,0,0)+prob_2(0,1,0)+prob_3(0,0,1)


                if (singleMapping.output.indexOf(singleOutput) == singleMapping.output.length - 1) {
                    mznReqInnerComposition = mznReqInnerComposition.slice(0, -3).concat(']').concat(';').concat('\n');
                    mznQuotaInnerComposition = mznQuotaInnerComposition.slice(0, -3).concat(']').concat(';').concat('\n');
                    mznRateInnerComposition = mznRateInnerComposition.slice(0, -3).concat(']').concat(';').concat('\n');


                    const gatewayType = singleOutput.gateway ? singleOutput.gateway.type.toLowerCase() : 'sequential';

                    if (gatewayType !== 'or') {
                        mznReqInnerCompositionCalculated = mznReqInnerCompositionCalculated.concat('sum(').concat('compositionReq').concat('_').concat(inputOperationId).concat(')').concat(';').concat('\n');
                        mznQuotaInnerCompositionCalculated = mznQuotaInnerCompositionCalculated.concat('max(').concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(')').concat(';').concat('\n');
                        mznRateInnerCompositionCalculated = mznRateInnerCompositionCalculated.concat('max(').concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(')').concat(';').concat('\n');
                    } else { //TODO: think about it     
                        logger.info('Warning: OR gateway detected. quotas when OR gw is not supported')
                        const inputAmount = utils.getGatewayInputAmount(oas, mapping, utils.getGatewayId(oas, mapping, singleOutput.id));
                        const factor = '(pow(2,'.concat(inputAmount).concat(')/2)');

                        mznReqInnerCompositionCalculated = mznReqInnerCompositionCalculated.concat(factor).concat('*').concat('sum(').concat('compositionReq').concat('_').concat(inputOperationId).concat(')').concat(';').concat('\n');
                        mznQuotaInnerCompositionCalculated = mznQuotaInnerCompositionCalculated.concat('max(').concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(')').concat(';').concat('\n');
                        mznRateInnerCompositionCalculated = mznRateInnerCompositionCalculated.concat('max(').concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat(')').concat(';').concat('\n');
                    }

                }
                // END INNER SERVICE COMPOSITION CREATION. TODO: WE ARE SUPPONSING EVERYTHING IS SEQUENTIAL

            }); // end output for a mapping

            mznData = mznData.concat('%% -------- BEGIN INNER COMPOSITION DEFINITION --------').concat('\n');
            //TODO: composition in not needed in the CSP approach
            // mznData = mznnData.concat(mznProbInnerComposition).concat('\n');
            // mznData = mznData.concat(mznReqInnerComposition).concat('\n');
            // mznData = mznData.concat(mznReqInnerCompositionCalculated).concat('\n');
            // let plans = utils.getAllPlanNames(sla, mapping);
            // plans.forEach(planName => {
            //     let planNameVar = planName.replace(regex, ''); //remove special characters
            //     mznData = mznData.concat(mznQuotaInnerComposition.replace(/planNameVar/gi, planNameVar)).concat('\n');
            //     mznData = mznData.concat(mznRateInnerComposition.replace(/planNameVar/gi, planNameVar)).concat('\n');

            //     mznData = mznData.concat(mznQuotaInnerCompositionCalculated.replace(/planNameVar/gi, planNameVar)).concat('\n');
            //     mznData = mznData.concat(mznRateInnerCompositionCalculated.replace(/planNameVar/gi, planNameVar)).concat('\n');
            // });
            mznData = mznData.concat('%% -------- END INNER COMPOSITION DEFINITION --------').concat('\n');
            mznData = mznData.concat('\n');

            mznData = mznData.concat('%% -------- END ').concat(inputOperationId).concat(' DEFINITION --------').concat('\n');
            mznData = mznData.concat('\n');


            // OUTER SERVICE COMPOSITION CREATION. TODO: WE ARE SUPPONSING EVERYTHING IS SEQUENTIAL

            let mappingVar = ''.concat('compositionReq').concat('_').concat(inputOperationId).concat('_').concat('calculated');
            let unitQuotaVar = ''.concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated');
            let unitRateVar = ''.concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated');

            let probVar = ''.concat('prob_').concat(inputOperationId);

            mznProbOuterComposition = mznProbOuterComposition.concat('float: ').concat(probVar)
                .concat(' = ')
                .concat(utils.getGatewayProb(oas, mapping, inputOperationId, null)).concat(';').concat('\n');

            // mznReqOuterComposition = mznReqOuterComposition.concat('ceil(').concat(probVar).concat(' * ').concat(mappingVar).concat(')').concat(' , '); //TODO: think about it
            mznReqOuterComposition = mznReqOuterComposition.concat(probVar).concat(' * ').concat(mappingVar).concat(' , '); //TODO: think about it
            mznQuotaOuterComposition = mznQuotaOuterComposition.concat(probVar).concat(' * ').concat(unitQuotaVar).concat(' , '); //TODO: think about it 
            mznRateOuterComposition = mznRateOuterComposition.concat(probVar).concat(' * ').concat(unitRateVar).concat(' , '); //TODO: think about it 


            if (mapping.mappings.indexOf(singleMapping) == mapping.mappings.length - 1) {
                mznReqOuterComposition = mznReqOuterComposition.slice(0, -3).concat(']').concat(';').concat('\n');
                mznQuotaOuterComposition = mznQuotaOuterComposition.slice(0, -3).concat(']').concat(';').concat('\n');
                mznRateOuterComposition = mznRateOuterComposition.slice(0, -3).concat(']').concat(';').concat('\n');

                const gatewayType = singleMapping.input.gateway ? singleMapping.input.gateway.type.toLowerCase() : 'sequential';

                if (gatewayType !== 'or') {
                    mznReqOuterCompositionCalculated = mznReqOuterCompositionCalculated.concat('sum(').concat('compositionReq').concat(')').concat(';').concat('\n');
                    mznQuotaOuterCompositionCalculated = mznQuotaOuterCompositionCalculated.concat('max(').concat('compositionQuota').concat('_').concat('planNameVar').concat('').concat(')').concat(';').concat('\n');
                    mznRateOuterCompositionCalculated = mznRateOuterCompositionCalculated.concat('max(').concat('compositionRate').concat('_').concat('planNameVar').concat('').concat(')').concat(';').concat('\n');
                } else { //TODO: think about it     
                    logger.info('Warning: OR gateway detected. quotas when OR gw is not supported')
                    const inputAmount = utils.getGatewayInputAmount(oas, mapping, utils.getGatewayId(oas, mapping, singleMapping.input.gateway.id));
                    const factor = '(pow(2,'.concat(inputAmount).concat(')/2)');

                    mznReqOuterCompositionCalculated = mznReqOuterCompositionCalculated.concat(factor).concat('*').concat('sum(').concat('compositionReq').concat(')').concat(';').concat('\n');
                    mznQuotaOuterCompositionCalculated = mznQuotaOuterCompositionCalculated.concat(factor).concat('*').concat('max(').concat('compositionQuota').concat('_').concat('planNameVar').concat('').concat(')').concat(';').concat('\n');
                    mznRateOuterCompositionCalculated = mznRateOuterCompositionCalculated.concat(factor).concat('*').concat('max(').concat('compositionRate').concat('_').concat('planNameVar').concat('').concat(')').concat(';').concat('\n');
                }

            }
            // END OUTER SERVICE COMPOSITION CREATION. TODO: WE ARE SUPPOSING EVERYTHING IS SEQUENTIAL

        }); // end single mapping
        mznData = mznData.concat('%% -------- END SERVICES DEFINITION --------').concat('\n');
        mznData = mznData.concat('\n');



        mznData = mznData.concat('%% -------- BEGIN OUTER COMPOSITION DEFINITION --------').concat('\n');
        //TODO: composition in not needed in the CSP approach
        // mznData = mznData.concat(mznProbOuterComposition).concat('\n');
        // mznData = mznData.concat(mznReqOuterComposition).concat('\n');
        // mznData = mznData.concat(mznReqOuterCompositionCalculated).concat('\n');
        // let plans = utils.getAllPlanNames(sla, mapping);
        // plans.forEach(planName => {
        //     let planNameVar = planName.replace(regex, ''); //remove special characters
        //     mznData = mznData.concat(mznQuotaOuterComposition.replace(/planNameVar/gi, planNameVar)).concat('\n');
        //     mznData = mznData.concat(mznRateOuterComposition.replace(/planNameVar/gi, planNameVar)).concat('\n');

        //     mznData = mznData.concat(mznQuotaOuterCompositionCalculated.replace(/planNameVar/gi, planNameVar)).concat('\n');
        //     mznData = mznData.concat(mznRateOuterCompositionCalculated.replace(/planNameVar/gi, planNameVar)).concat('\n');
        // });
        mznData = mznData.concat('%% -------- END OUTER COMPOSITION DEFINITION --------').concat('\n');

        mznData = mznData.concat('\n');
        mznData = mznData.concat('\n');
        mznData = mznData.concat('\n');
        mznData = mznData.concat('\n');

        mznData = mznData.concat('%% -------- BEGIN QUESTIONS DEFINITION --------').concat('\n');
        // try {
        let question = mznModules[mznModuleName](sla, mapping, oas, selectedPlan, sizeVarName, START_NODE_NAME);
        mznData = mznData.concat(question);
        // } catch (e) {
        //     logger.error('Error while invoking module %s: %s', mznModuleName, e);
        // }

        mznData = mznData.concat('%% -------- END QUESTIONS DEFINITION --------').concat('\n');

        const mznPath = mappingFilePath.replace('yaml', 'mzn').replace(INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME);
        fs.writeFileSync(mznPath, mznData, 'utf8');
    } catch (e) {
        logger.error(e);
        throw e;
    }

};