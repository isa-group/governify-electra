'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const $SyncRefParser = require('json-schema-ref-parser-sync');

const utils = require('./utils/utils');
const logger = require('./../logger');

module.exports.generateDOT = function (filePath, graphvizPath, name, INPUT_SUBFOLDER_NAME) {

    try {
        const oasDocRef = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        const oasDoc = $SyncRefParser.dereference(oasDocRef);

        let sla;
        if (oasDoc.info["x-sla"]) {
            let slaFilePath = path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, oasDoc.info["x-sla"]);
            const slaRef = yaml.safeLoad(fs.readFileSync(slaFilePath, 'utf8'));
            sla = $SyncRefParser.dereference(slaRef);
        }

        // let graphvizContent = "@startuml".concat("\n")
        //     .concat("set namespaceSeparator none").concat("\n")
        //     .concat("hide circle").concat("\n")
        //     .concat("hide class methods").concat("\n")
        //     .concat("hide empty attributes").concat("\n")
        //     .concat("skinparam linetype ortho").concat("\n")
        //     .concat("skinparam monochrome true").concat("\n")
        //     .concat("skinparam shadowing false").concat("\n")
        //     .concat("skinparam nodesep 5").concat("\n");

        let graphvizContent = 'subgraph "'.concat(name).concat('" {').concat('\n')
            .concat("node [shape=box]").concat("\n");



        Object.entries(oasDoc.paths).forEach(([apiPath, apiOperations]) => {
            apiPath = apiPath.replace(/\{/g, ":").replace(/\}/g, "");

            Object.entries(apiOperations).forEach(([method, apiOperation]) => {
                Object.entries(apiOperation.responses).forEach(([statusCode, response]) => {

                    // create REQUEST node
                    graphvizContent = graphvizContent.concat('node [ style=rounded, shape=box, label = "' + '<' + name + '> ' + method.toUpperCase() + ' ' + apiPath + '" ] ').concat('"').concat(apiOperation.operationId).concat('"').concat("\n");

                    // PLANS ATTACH
                    if (sla) {
                        // create SLA node
                        graphvizContent = graphvizContent.concat('limits_' + apiOperation.operationId).concat(' [shape=note, style=filled, fillcolor="#F1D991" label=<').concat("\n")
                            .concat('<table border="0" cellborder="1" cellpadding="2" cellspacing="0">').concat("\n")
                            .concat('<tr>').concat("\n")
                            .concat('<td></td>').concat("\n");
                        Object.entries(sla.plans).forEach(([planName, plan]) => {
                            graphvizContent = graphvizContent.concat('<td><b>').concat(planName).concat('</b></td>').concat("\n");
                        });
                        graphvizContent = graphvizContent.concat('</tr>').concat("\n")
                            .concat('<tr>').concat("\n")
                            .concat('<td><b>Quota</b></td>').concat("\n");
                        Object.entries(sla.plans).forEach(([planName, plan]) => {
                            let limitValue = utils.getPlan(sla, planName, "quotas", apiPath, method.toLowerCase());
                            limitValue = limitValue["requests"][0]; //TODO: We only support "requests" so far with 1 element
                            graphvizContent = graphvizContent.concat('<td>').concat(limitValue.max).concat(' req ').concat(limitValue.period).concat('</td>').concat("\n");
                        });
                        graphvizContent = graphvizContent.concat('</tr>').concat("\n")
                            .concat('<tr>').concat("\n")
                            .concat('<td><b>Rate</b></td>').concat("\n");
                        Object.entries(sla.plans).forEach(([planName, plan]) => {
                            let limitValue = utils.getPlan(sla, planName, "rates", apiPath, method.toLowerCase());
                            limitValue = limitValue["requests"][0]; //TODO: We only support "requests" so far with 1 element
                            graphvizContent = graphvizContent.concat('<td>').concat(limitValue.max).concat(' req ').concat(limitValue.period).concat('</td>').concat("\n");
                        });
                        graphvizContent = graphvizContent.concat('</tr>').concat("\n")
                            .concat('</table>').concat("\n")
                            .concat('>];').concat("\n");

                        // create SLA--REQUEST
                        graphvizContent = graphvizContent.concat(apiOperation.operationId)
                            .concat(" -> ")
                            .concat('limits_' + apiOperation.operationId).concat('[ style=dashed, color=black, penwidth=0.5 ]').concat(";").concat("\n");
                    }

                    // // create RESPONSE node
                    // graphvizContent = graphvizContent.concat('node [ style="rounded,filled", fillcolor="#E6E6E6", shape=box, label = "' + statusCode + '" ] ').concat('"').concat(apiOperation.operationId + statusCode).concat('"').concat("\n");

                    // if (Object.keys(apiOperation.responses).length > 1) {
                    //     // create XOR_GATEWAY node
                    //     graphvizContent = graphvizContent.concat('node [ style=filled, fillcolor=white, shape=diamond, label = "X" ] ').concat('"').concat('XOR_' + apiOperation.operationId).concat('"').concat("\n");
                    //     if (Object.keys(apiOperation.responses).indexOf(statusCode) == 0) {
                    //         // create REQUEST--XOR_GATEWAY
                    //         graphvizContent = graphvizContent.concat(apiOperation.operationId).concat(" -> ").concat('XOR_' + apiOperation.operationId).concat(";").concat("\n");
                    //     }
                    //     // create XOR_GATEWAY--RESPONSE
                    //     graphvizContent = graphvizContent.concat('XOR_' + apiOperation.operationId).concat(" -> ").concat(apiOperation.operationId + statusCode).concat(' [ style="rounded,filled" shape=box ] ').concat(";").concat("\n");

                    //     if (response.links) {
                    //         Object.entries(response.links).forEach(([linkName, link]) => {
                    //             // create RESPONSE--LINKED_REQUEST
                    //             graphvizContent = graphvizContent.concat(apiOperation.operationId + statusCode).concat(" -> ").concat(link.operationId).concat(' [ style=dashed ]').concat(";").concat("\n");
                    //         });
                    //     }
                    // } else {
                    //     // create REQUEST--RESPONSE
                    //     graphvizContent = graphvizContent.concat(apiOperation.operationId).concat(" -> ").concat(apiOperation.operationId + statusCode).concat(";").concat("\n");
                    // }
                });


            });
        });
        // graphvizContent = graphvizContent.concat("@enduml");
        graphvizContent = graphvizContent.concat("}");



        fs.writeFileSync(graphvizPath, graphvizContent, 'utf8');


    } catch (e) {
        logger.error(e);
    }

};