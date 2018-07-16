'use strict';

const logger = require('./../../logger');

function getAllPlanNames(sla, mapping) {
    const planNamesSet = new Set();
    mapping.mappings.forEach(singleMapping => {
        singleMapping.output.forEach(singleOutput => {
            Object.entries(sla[singleOutput.service].plans).forEach(([planName, plan]) => {
                planNamesSet.add(planName);
            });
        });
    });
    return planNamesSet;
}

function getMznShowLineVar(varName) {
    return 'output ["'.concat(varName).concat(' = ",show(').concat(varName).concat(')];').concat('\n');
}

function getMznBreakLine() {
    return 'output ["'.concat('\\n').concat('"];').concat('\n');
}

function getMznShowConstraint(left, op, right) {
    return 'constraint  '.concat(left).concat(op).concat(right).concat(';').concat('\n');
}


function getPlan(sla, plan, type, path, method) {
    if (sla && sla.plans && sla.plans[plan] && sla.plans[plan][type]) {

        let res;
        Object.entries(sla.plans[plan][type]).forEach(([slaPath, slaPathObject]) => {
            if (slaPath === path || slaPath.replace(/\{/g, ":").replace(/\}/g, "") === path) {
                method = method.toLowerCase();
                if (sla.plans[plan][type][slaPath] && sla.plans[plan][type][slaPath][method]) {
                    res = sla.plans[plan][type][slaPath][method];
                } else {
                    logger.info("%s not found for plan %s and path %s and method %s", type, plan, path, method);
                }
            }
        });
        if (res) {
            return res;
        } else {
            logger.info("%s not found for plan %s and path %s and method %s", type, plan, path, method);
        }
    } else {
        logger.info("%s not found for plan %s and path %s and method %s", type, plan, path, method);
    }
}

function findOperationId(oas, path, method) {
    method = method.toLowerCase();
    if (oas !== undefined && oas.paths !== undefined && oas.paths[path] !== undefined && oas.paths[path][method] !== undefined) {
        return oas.paths[path][method]["operationId"];
    } else {
        logger.info("operationId not found for path %s and method %s", path, method);
    }
}

function findPathAndMethod(oas, operationId) {
    if (oas !== undefined && oas.paths !== undefined) {
        let pathMethod;
        Object.entries(oas.paths).forEach(([pathName, pathObj]) => {
            Object.entries(pathObj).forEach(([methodName, methodObj]) => {
                if (methodObj.operationId && methodObj.operationId === operationId) {
                    pathMethod = {
                        path: pathName,
                        method: methodName
                    };
                }
            });
        });
        if (pathMethod) {
            return pathMethod;
        } else {
            logger.info("path/method not found for operationId %s", operationId);
        }
    } else {
        logger.info("OAS document not OK %s", oas);
    }
}

function getGatewayProb(oas, mapping, inputOperationId, outputOperationId) {
    let prob;
    mapping.mappings.forEach(singleMapping => {
        let pathMethodIn = findPathAndMethod(oas[singleMapping.input.service], inputOperationId);
        if (pathMethodIn !== undefined && singleMapping.input.path == pathMethodIn.path && singleMapping.input.method.toUpperCase() === pathMethodIn.method.toUpperCase()) {
            singleMapping.output.forEach(singleOutput => {
                if (outputOperationId) {
                    let pathMethodOut = findPathAndMethod(oas[singleOutput.service], outputOperationId);
                    if (singleOutput && pathMethodOut && singleOutput.path == pathMethodOut.path && singleOutput.method.toUpperCase() === pathMethodOut.method.toUpperCase()) {
                        if (singleOutput.gateway && singleOutput.gateway.type) {
                            let gatewayType = singleOutput.gateway.type.toLowerCase();
                            let gwOne = ['sequential', 'and'].includes(gatewayType)
                            let probIsDefined = singleOutput.gateway.prob != undefined;
                            let probIsSupported = ['sequential', 'and', 'xor', 'or'].includes(gatewayType);
                            if (probIsSupported) {
                                prob = probIsSupported && !probIsDefined && gwOne ? 1 : singleOutput.gateway.prob;
                            } else {
                                logger.error('Gateway %s is not supported yet', gatewayType);
                            }
                        }
                    }
                } else {
                    if (singleMapping.input && singleMapping.input.gateway.type) {
                        let gatewayType = singleMapping.input.gateway.type.toLowerCase();
                        let gwOne = ['sequential', 'and'].includes(gatewayType);
                        let probIsDefined = singleMapping.input.gateway.prob != undefined;
                        let probIsSupported = ['sequential', 'and', 'xor', 'or'].includes(gatewayType);
                        if (probIsSupported) {
                            prob = probIsSupported && !probIsDefined && gwOne ? 1 : singleMapping.input.gateway.prob;
                        } else {
                            logger.error('Gateway %s is not supported yet', gatewayType);
                        }
                    }
                }


            });
        }
    });
    if (prob) {
        return prob;
    } else {
        logger.info('prob not found for inputOperationId %s and outputOperationId %s. USING DEFAULT=1', inputOperationId, outputOperationId);
        return 1;
    }
}

function getGatewayId(oas, mapping, inputOperationId, outputOperationId) {
    let gatewayId;
    mapping.mappings.forEach(singleMapping => {
        let pathMethodIn = findPathAndMethod(oas[singleMapping.input.service], inputOperationId);
        if (singleMapping.input.path == pathMethodIn.path && singleMapping.input.method.toUpperCase() === pathMethodIn.method.toUpperCase()) {
            singleMapping.output.forEach(singleOutput => {
                let pathMethodOut = findPathAndMethod(oas[singleOutput.service], outputOperationId);
                if (singleOutput.path == pathMethodOut.path && singleOutput.method.toUpperCase() === pathMethodOut.method.toUpperCase()) {
                    if (singleOutput.gateway && singleOutput.gateway.type) {
                        gatewayId = singleOutput.gateway.id;
                    }
                }
            });
        }
    });
    if (gatewayId) {
        return gatewayId;
    } else {
        logger.info('gatewayId not found for inputOperationId %s and outputOperationId %s', inputOperationId, outputOperationId);
    }
}

function getGatewayInputAmount(oas, mapping, gatewayId) {
    let gatewayIdRes = 0;
    mapping.mappings.forEach(singleMapping => {
        singleMapping.output.forEach(singleOutput => {
            if (singleOutput.gateway && singleOutput.gateway.id && singleOutput.gateway.id.toLowerCase() === gatewayId.toLowerCase()) {
                gatewayIdRes++;
            }
        });
    });
    if (gatewayIdRes) {
        return gatewayIdRes;
    } else {
        logger.info('gatewayAmount not found for gatewayId %s', gatewayId);
    }
}

module.exports = {
    'getAllPlanNames': getAllPlanNames,
    'getMznBreakLine': getMznBreakLine,
    'getMznShowLineVar': getMznShowLineVar,
    'getPlan': getPlan,
    'findOperationId': findOperationId,
    'findPathAndMethod': findPathAndMethod,
    'getMznShowConstraint': getMznShowConstraint,
    'getGatewayProb': getGatewayProb,
    'getGatewayId': getGatewayId,
    'getGatewayInputAmount': getGatewayInputAmount
}