'use strict';

const utils = require('./utils');
// const graphs = require('./graphs');
const Graph = require('node-all-paths');
const logger = require('./../../logger');

const regex = /[^\wmi]/gi;

function module_1(sla, mapping, oas, selectedPlan) {
    let mznData = '';
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 1: "outer info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    let mznReqOuterCompositionCalculatedVar = ''.concat('compositionReq').concat('_').concat('calculated');
    let mznQuotaOuterCompositionCalculatedVar = ''.concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat('calculated');
    let mznRateOuterCompositionCalculatedVar = ''.concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat('calculated');

    mznData = mznData.concat(utils.getMznShowLineVar(mznReqOuterCompositionCalculatedVar));
    mznData = mznData.concat(utils.getMznBreakLine());
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        let planNameVar = planName.replace(regex, ''); //remove special characters
        mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar)));
        mznData = mznData.concat(utils.getMznBreakLine());
        mznData = mznData.concat(utils.getMznShowLineVar(mznRateOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar)));
        mznData = mznData.concat(utils.getMznBreakLine());
    });
    mznData = mznData.concat(utils.getMznBreakLine());
    mznData = mznData.concat(utils.getMznBreakLine());

    const sizeVarName = 'researchers';

    mznData = mznData.concat(utils.getMznShowLineVar(mznReqOuterCompositionCalculatedVar.concat('*').concat(sizeVarName)));
    mznData = mznData.concat(utils.getMznBreakLine());
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        let planNameVar = planName.replace(regex, ''); //remove special characters
        mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
        mznData = mznData.concat(utils.getMznBreakLine());
        mznData = mznData.concat(utils.getMznShowLineVar(mznRateOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
        mznData = mznData.concat(utils.getMznBreakLine());
    });
    mznData = mznData.concat(utils.getMznBreakLine());

    mznData = mznData.concat('\t%% -------- END MODULE 1: "outer info" --------').concat('\n');

    return mznData;
}

function module_2(sla, mapping, oas, selectedPlan) {
    let mznData = '';
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 2: "inner info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);


        let mznReqInnerCompositionCalculatedVar = ''.concat('compositionReq').concat('_').concat(inputOperationId).concat('_').concat('calculated');
        let mznQuotaInnerCompositionCalculatedVar = ''.concat('compositionQuota').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated');
        let mznRateInnerCompositionCalculatedVar = ''.concat('compositionRate').concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat('value').concat('_').concat('calculated');

        mznData = mznData.concat(utils.getMznShowLineVar(mznReqInnerCompositionCalculatedVar));
        mznData = mznData.concat(utils.getMznBreakLine());
        utils.getAllPlanNames(sla, mapping).forEach(planName => {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar)));
            mznData = mznData.concat(utils.getMznBreakLine());
            mznData = mznData.concat(utils.getMznShowLineVar(mznRateInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar)));
            mznData = mznData.concat(utils.getMznBreakLine());
        });
        mznData = mznData.concat(utils.getMznBreakLine());
        mznData = mznData.concat(utils.getMznBreakLine());

        const sizeVarName = 'researchers';

        mznData = mznData.concat(utils.getMznShowLineVar(mznReqInnerCompositionCalculatedVar.concat('*').concat(sizeVarName)));
        mznData = mznData.concat(utils.getMznBreakLine());
        utils.getAllPlanNames(sla, mapping).forEach(planName => {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
            mznData = mznData.concat(utils.getMznBreakLine());
            mznData = mznData.concat(utils.getMznShowLineVar(mznRateInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
            mznData = mznData.concat(utils.getMznBreakLine());
        });
        mznData = mznData.concat(utils.getMznBreakLine());
    });
    mznData = mznData.concat('\t%% -------- END MODULE 2: "inner info" --------').concat('\n');

    return mznData;
}

function module_3(sla, mapping, oas, selectedPlan) {
    let mznData = '';
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 3: "all info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);


            let mappingVar = 'count_'.concat(inputOperationId).concat('_').concat(outputOperationId);
            let mznUnitQuotaConsumptionVar = 'unitQuotaConsumption_'.concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');
            let mznUnitRateConsumptionVar = 'unitRateConsumption_'.concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');

            mznData = mznData.concat(utils.getMznShowLineVar(mappingVar));
            mznData = mznData.concat(utils.getMznBreakLine());

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                let planNameVar = planName.replace(regex, ''); //remove special characters
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitQuotaConsumptionVar.replace(/planNameVar/gi, planNameVar)));
                mznData = mznData.concat(utils.getMznBreakLine());
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitRateConsumptionVar.replace(/planNameVar/gi, planNameVar)));
                mznData = mznData.concat(utils.getMznBreakLine());
            });
            mznData = mznData.concat(utils.getMznBreakLine());
            mznData = mznData.concat(utils.getMznBreakLine());

            const sizeVarName = 'researchers';

            mznData = mznData.concat(utils.getMznShowLineVar(mappingVar.concat('*').concat(sizeVarName)));
            mznData = mznData.concat(utils.getMznBreakLine());

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                let planNameVar = planName.replace(regex, ''); //remove special characters
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitQuotaConsumptionVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
                mznData = mznData.concat(utils.getMznBreakLine());
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitRateConsumptionVar.replace(/planNameVar/gi, planNameVar).concat('*').concat(sizeVarName)));
                mznData = mznData.concat(utils.getMznBreakLine());
            });
            mznData = mznData.concat(utils.getMznBreakLine());
        });
    });

    mznData = mznData.concat('\t%% -------- END MODULE 3: "all info" --------').concat('\n');

    return mznData;
}

function module_4(sla, mapping, oas, selectedPlan, sizeVarName) {
    let mznData = '';
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 4: "max input size" --------').concat('\n');

    const allPlans = false;

    mznData = mznData.concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat('var int: ').concat(maximizeVar).concat(';').concat('\n');
            mznData = mznData.concat(utils.getMznShowConstraint(maximizeVar, ' >= ', 0));
        }
    });
    mznData = mznData.concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);


            let mappingVar = 'count_'.concat(inputOperationId).concat('_').concat(outputOperationId);

            let mznQuotaVar = 'quota'.concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');
            // let mznRateVar = 'rate'.concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');


            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                if (allPlans || selectedPlan === planName) {
                    let planNameVar = planName.replace(regex, ''); //remove special characters
                    let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
                    mznData = mznData.concat(utils.getMznShowConstraint(maximizeVar.concat('*').concat(mappingVar), ' <= ', mznQuotaVar.replace(/planNameVar/gi, planNameVar)));

                    //

                    mznData = mznData.concat(utils.getMznShowLineVar(mappingVar));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat(utils.getMznShowLineVar(maximizeVar));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat(utils.getMznShowLineVar(mappingVar.concat('*').concat(maximizeVar)));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaVar.replace(/planNameVar/gi, planNameVar)));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat(utils.getMznBreakLine());
                }
            });
            mznData = mznData.concat('\n');
        });
    });

    mznData = mznData.concat('\t%Choose ONE solve statement').concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat('solve maximize ').concat(maximizeVar).concat(';').concat('\n');
        }
    });
    mznData = mznData.concat('\n');

    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat(utils.getMznShowLineVar(maximizeVar));
            mznData = mznData.concat(utils.getMznBreakLine());
        }
    });

    mznData = mznData.concat('\n');
    mznData = mznData.concat('\t%% -------- END MODULE 4: "max input size" --------').concat('\n');

    return mznData;
}

function module_5(sla, mapping, oas, selectedPlan, sizeVarName, startOp) {


    let mznData = '';
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 5: "full csp" --------').concat('\n');

    const allPlans = false;

    mznData = mznData.concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat('var int: ').concat(maximizeVar).concat(';').concat('\n');
            mznData = mznData.concat(utils.getMznShowConstraint(maximizeVar, ' >= ', 0));
        }
    });
    mznData = mznData.concat('\n');

    //////////////////////////////
    //////////////////////////////
    let graph = {};
    let limitedOps = new Set(); //avoid dups
    // graph[startOp] = {};
    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        // graph[startOp][inputOperationId] = 1;
        graph[inputOperationId] = {};
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);
            graph[inputOperationId][outputOperationId] = 1;

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                if (allPlans || selectedPlan === planName) {
                    let planForQuota = utils.getPlan(sla[singleOutput.service], planName, 'quotas', singleOutput.path, singleOutput.method);
                    if (planForQuota) {
                        limitedOps.add(outputOperationId);
                    }
                }
            });
        });
    });
    limitedOps = Array.from(limitedOps);
    logger.info('Generated graph: %s', JSON.stringify(graph, 2, null));
    logger.info('limitedOps graph: %s', JSON.stringify(limitedOps));


    const route = new Graph(graph);
    limitedOps.forEach(limitedOp => {
        const paths = route.path(startOp, limitedOp, {
            cost: true
        });


        logger.info('There are %d paths from %s to %s', paths.length, startOp, limitedOp);
        utils.getAllPlanNames(sla, mapping).forEach(planName => {
            if (allPlans || selectedPlan === planName) {
                let planNameVar = planName.replace(regex, ''); //remove special characters
                let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
                let quotaVar = 'quota'.concat('_').concat(planNameVar).concat('_').concat(limitedOp).concat('_').concat('value');

                let str = 'constraint '.concat(maximizeVar).concat(' *');

                str = (paths.length > 1) ? str.concat(' ( ( ') : str;

                paths.forEach(path => {
                    const pathNoCost = path.path.slice(1);
                    logger.info('Path from %s to %s: %s', startOp, limitedOp, pathNoCost);

                    for (let index = 0; index < pathNoCost.length; index++) {
                        const operation = pathNoCost[index];
                        const previousOperation = pathNoCost[index - 1];
                        // if (previousOperation) {
                        if (previousOperation && utils.isDirectlyConnected(oas, mapping, previousOperation, operation)) {
                            str = str.concat(' count').concat('_').concat(previousOperation).concat('_').concat(operation).concat(' *');
                        } else if (utils.isDirectlyConnected(oas, mapping, startOp, operation)) { //startOp is directly connected to op
                            str = str.concat(' count').concat('_').concat(startOp).concat('_').concat(operation).concat(' *');
                        }
                    } //end foreach element in path

                    str = str.slice(0, -1);
                    str = (paths.length > 1) ? str.concat(' ) + ( ') : str;

                }); //end foreach paths

                str = (paths.length > 1) ? str.slice(0, -5).concat(' )').replace('+ ( )', '').concat(' <= ') : str.slice(0, -1).concat(' <= ');
                str = str.concat(quotaVar).concat(';');

                mznData = mznData.concat(str);
                mznData = mznData.concat('\n');

                let printVar = str.split('<= ')[0].split('constraint ')[1].trim();
                mznData = mznData.concat(utils.getMznShowLineVar(printVar));
                mznData = mznData.concat(utils.getMznBreakLine());
                str.split('<= ')[0].split('constraint ')[1].split('*').forEach(strPart => {
                    printVar = strPart.replace(/\(/g, '').replace(/\)/g, '').trim();
                    mznData = mznData.concat(utils.getMznShowLineVar(printVar));
                    mznData = mznData.concat(utils.getMznBreakLine());
                });
                printVar = str.split('<= ')[1].trim().replace(';', '');
                mznData = mznData.concat(utils.getMznShowLineVar(printVar));
                mznData = mznData.concat(utils.getMznBreakLine());
                mznData = mznData.concat(utils.getMznBreakLine());
                mznData = mznData.concat('\n');
                mznData = mznData.concat('\n');

            } // end if(allPlans || selectedPlan === planName)
        }); // end foreach getAllPlanNames
    }); // end foreach limitedOps



    //////////////////////////////
    //////////////////////////////

    mznData = mznData.concat('\t%Choose ONE solve statement').concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat('solve maximize ').concat(maximizeVar).concat(';').concat('\n');
        }
    });
    mznData = mznData.concat('\n');

    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
            mznData = mznData.concat(utils.getMznShowLineVar(maximizeVar));
            mznData = mznData.concat(utils.getMznBreakLine());
        }
    });

    mznData = mznData.concat('\n');
    mznData = mznData.concat('\t%% -------- END MODULE 4: "full csp " --------').concat('\n');

    return mznData;
}


module.exports = {
    'module_1': module_1,
    'module_2': module_2,
    'module_3': module_3,
    'module_4': module_4,
    'module_5': module_5
}