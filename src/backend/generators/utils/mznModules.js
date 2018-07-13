'use strict';

const utils = require('./utils');
// const graphs = require('./graphs');
const Graph = require('node-all-paths');
const logger = require('./../../logger');

const regex = /[^\wmi]/gi;

function module_1(sla, mapping, oas, selectedPlan) {
    let mznData = "";
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 1: "outer info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    let mznReqOuterCompositionCalculatedVar = "".concat('compositionReq').concat('_calculated');
    let mznQuotaOuterCompositionCalculatedVar = "".concat('compositionQuota_').concat("planNameVar").concat('_calculated');
    let mznRateOuterCompositionCalculatedVar = "".concat('compositionRate_').concat("planNameVar").concat('_calculated');

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

    const sizeVarName = "researchers";

    mznData = mznData.concat(utils.getMznShowLineVar(mznReqOuterCompositionCalculatedVar + '*' + sizeVarName));
    mznData = mznData.concat(utils.getMznBreakLine());
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        let planNameVar = planName.replace(regex, ''); //remove special characters
        mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
        mznData = mznData.concat(utils.getMznBreakLine());
        mznData = mznData.concat(utils.getMznShowLineVar(mznRateOuterCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
        mznData = mznData.concat(utils.getMznBreakLine());
    });
    mznData = mznData.concat(utils.getMznBreakLine());

    mznData = mznData.concat('\t%% -------- END MODULE 1: "outer info" --------').concat('\n');

    return mznData;
}

function module_2(sla, mapping, oas, selectedPlan) {
    let mznData = "";
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 2: "inner info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);


        let mznReqInnerCompositionCalculatedVar = "".concat('compositionReq_').concat(inputOperationId).concat('_calculated');
        let mznQuotaInnerCompositionCalculatedVar = "".concat('compositionQuota_').concat("planNameVar").concat('_').concat(inputOperationId).concat('_value').concat('_calculated');
        let mznRateInnerCompositionCalculatedVar = "".concat('compositionRate_').concat("planNameVar").concat('_').concat(inputOperationId).concat('_value').concat('_calculated');

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

        const sizeVarName = "researchers";

        mznData = mznData.concat(utils.getMznShowLineVar(mznReqInnerCompositionCalculatedVar + '*' + sizeVarName));
        mznData = mznData.concat(utils.getMznBreakLine());
        utils.getAllPlanNames(sla, mapping).forEach(planName => {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            mznData = mznData.concat(utils.getMznShowLineVar(mznQuotaInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
            mznData = mznData.concat(utils.getMznBreakLine());
            mznData = mznData.concat(utils.getMznShowLineVar(mznRateInnerCompositionCalculatedVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
            mznData = mznData.concat(utils.getMznBreakLine());
        });
        mznData = mznData.concat(utils.getMznBreakLine());
    });
    mznData = mznData.concat('\t%% -------- END MODULE 2: "inner info" --------').concat('\n');

    return mznData;
}

function module_3(sla, mapping, oas, selectedPlan) {
    let mznData = "";
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 3: "all info" --------').concat('\n');

    mznData = mznData.concat('solve satisfy;').concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);


            let mappingVar = 'mapping_'.concat(inputOperationId).concat('_').concat(outputOperationId);
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

            const sizeVarName = "researchers";

            mznData = mznData.concat(utils.getMznShowLineVar(mappingVar + '*' + sizeVarName));
            mznData = mznData.concat(utils.getMznBreakLine());

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                let planNameVar = planName.replace(regex, ''); //remove special characters
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitQuotaConsumptionVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
                mznData = mznData.concat(utils.getMznBreakLine());
                mznData = mznData.concat(utils.getMznShowLineVar(mznUnitRateConsumptionVar.replace(/planNameVar/gi, planNameVar) + '*' + sizeVarName));
                mznData = mznData.concat(utils.getMznBreakLine());
            });
            mznData = mznData.concat(utils.getMznBreakLine());
        });
    });

    mznData = mznData.concat('\t%% -------- END MODULE 3: "all info" --------').concat('\n');

    return mznData;
}

function module_4(sla, mapping, oas, selectedPlan, sizeVarName) {
    let mznData = "";
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 4: "max input size" --------').concat('\n');

    const allPlans = false;

    mznData = mznData.concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat('var int: ').concat(maximizeVar).concat(';').concat('\n');
            mznData = mznData.concat(utils.getMznShowConstraint(maximizeVar, ' >= ', 0));
        }
    });
    mznData = mznData.concat('\n');

    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);


            let mappingVar = 'mapping_'.concat(inputOperationId).concat('_').concat(outputOperationId);

            let mznQuotaVar = 'quota'.concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');
            // let mznRateVar = 'rate'.concat('_').concat('planNameVar').concat('_').concat(inputOperationId).concat('_').concat(outputOperationId).concat('_').concat('value');


            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                if (allPlans || selectedPlan === planName) {
                    let planNameVar = planName.replace(regex, ''); //remove special characters
                    let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
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
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat('solve maximize ').concat(maximizeVar).concat(';').concat('\n');
        }
    });
    mznData = mznData.concat('\n');

    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat(utils.getMznShowLineVar(maximizeVar));
            mznData = mznData.concat(utils.getMznBreakLine());
        }
    });

    mznData = mznData.concat('\n');
    mznData = mznData.concat('\t%% -------- END MODULE 4: "max input size" --------').concat('\n');

    return mznData;
}

function module_5(sla, mapping, oas, selectedPlan, sizeVarName, start) {


    let mznData = "";
    mznData = mznData.concat('\t%% -------- BEGIN MODULE 5: "full csp" --------').concat('\n');

    const allPlans = false;
    start = start ? start : 'START';

    mznData = mznData.concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat('var int: ').concat(maximizeVar).concat(';').concat('\n');
            mznData = mznData.concat(utils.getMznShowConstraint(maximizeVar, ' >= ', 0));
        }
    });
    mznData = mznData.concat('\n');

    //////////////////////////////
    //////////////////////////////
    let graph = {};
    let limitedOps = [];
    graph["START"] = {};
    mapping.mappings.forEach(singleMapping => {
        let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
        graph["START"][inputOperationId] = 1;
        graph[inputOperationId] = {};
        singleMapping.output.forEach(singleOutput => {
            let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);
            graph[inputOperationId][outputOperationId] = 1;

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                if (allPlans || selectedPlan === planName) {
                    let planForQuota = utils.getPlan(sla[singleOutput.service], planName, "quotas", singleOutput.path, singleOutput.method);
                    if (planForQuota) {
                        limitedOps.push(outputOperationId);
                    }
                }
            });
        });
    });
    logger.info("Generated graph: " + JSON.stringify(graph, 2, null));
    logger.info("limitedOps graph: " + JSON.stringify(limitedOps));


    const route = new Graph(graph);
    limitedOps.forEach(node => {
        const paths = route.path(start, node, {
            cost: true
        });

        paths.forEach(path => {

            utils.getAllPlanNames(sla, mapping).forEach(planName => {
                if (allPlans || selectedPlan === planName) {
                    let planNameVar = planName.replace(regex, ''); //remove special characters
                    let maximizeVar = ''.concat(sizeVarName).concat('_').concat(planNameVar).concat('_').concat('maximize');
                    let quotaVar = 'quota'.concat('_').concat(planNameVar).concat('_').concat(node).concat('_').concat('value');

                    let str = 'constraint  '.concat(maximizeVar).concat(' *');
                    const pathsNoCost = path.path.slice(1);


                    for (let index = 0; index < pathsNoCost.length; index++) {
                        const spath = pathsNoCost[index];
                        const spathm1 = pathsNoCost[index - 1];
                        if (spathm1) {
                            str += " mapping_" + spathm1 + "_" + spath + " *";
                        } else {
                            str += " mapping_" + "START" + "_" + spath + " *";
                        }
                    }

                    str = str.slice(0, -1);
                    str += " <= " + quotaVar + ";";

                    mznData = mznData.concat(str);
                    mznData = mznData.concat('\n');

                    // ["constraint  researchers_subscriber_maximize * mapp…TART_getAuthor * mapping_getAuthor_AuthorSearch  ", "quota_subscriber_AuthorSearch_value;"]
                    mznData = mznData.concat(utils.getMznShowLineVar(str.split("<= ")[0].split("constraint  ")[1].trim()));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    str.split("<= ")[0].split("constraint  ")[1].split("*").forEach(strPart => {
                        mznData = mznData.concat(utils.getMznShowLineVar(strPart.trim()));
                        mznData = mznData.concat(utils.getMznBreakLine());
                    });
                    mznData = mznData.concat(utils.getMznShowLineVar(str.split("<= ")[1].trim().replace(';', '')));
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat(utils.getMznBreakLine());
                    mznData = mznData.concat('\n');
                    mznData = mznData.concat('\n');
                    //
                }
            });
        });
    });


    //////////////////////////////
    //////////////////////////////

    mznData = mznData.concat('\t%Choose ONE solve statement').concat('\n');
    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat('solve maximize ').concat(maximizeVar).concat(';').concat('\n');
        }
    });
    mznData = mznData.concat('\n');

    utils.getAllPlanNames(sla, mapping).forEach(planName => {
        if (allPlans || selectedPlan === planName) {
            let planNameVar = planName.replace(regex, ''); //remove special characters
            let maximizeVar = "".concat(sizeVarName).concat('_').concat(planNameVar).concat('_maximize');
            mznData = mznData.concat(utils.getMznShowLineVar(maximizeVar));
            mznData = mznData.concat(utils.getMznBreakLine());
        }
    });


    //TODO: generar grafo automaticamente
    //TODO: decidir cuando es sla-claculable
    //TODO: componer servicios. creo que sera algo del tipo mapping(y) + R(x/via_y), aunque entonces los paths no sé. Y si metemos probalidaid directamente ahi y  listo?
    //TODO: 


    mznData = mznData.concat('\n');
    mznData = mznData.concat('\t%% -------- END MODULE 4: "full csp" --------').concat('\n');

    return mznData;
}


module.exports = {
    "module_1": module_1,
    "module_2": module_2,
    "module_3": module_3,
    "module_4": module_4,
    "module_5": module_5
}