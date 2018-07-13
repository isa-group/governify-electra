'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const $SyncRefParser = require('json-schema-ref-parser-sync');
const OASDotGenerator = require('./OASDotGenerator');
const utils = require('./utils/utils');
const logger = require('./../logger');


module.exports.generateDOT = function (mappingFilePath, name, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME) {
    try {
        const docRef = yaml.safeLoad(fs.readFileSync(mappingFilePath, 'utf8'));
        const mapping = $SyncRefParser.dereference(docRef);

        const oas = {};

        Object.entries(mapping.services).forEach(([serviceName, servicePath]) => {
            let docRef = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, servicePath), 'utf8'));
            oas[serviceName] = $SyncRefParser.dereference(docRef);
            OASDotGenerator.generateDOT(path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, serviceName + '-oas.yaml'), path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, serviceName + '.dot'), serviceName, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME);
        });
        // logger.info(oas)
        // logger.info(mapping)

        let graphvizContent = "";


        if (mapping.params) {
            // create params node
            graphvizContent = graphvizContent.concat('params').concat(' [shape=note, style=filled, fillcolor="#F0F8FF" label=<').concat("\n")
                .concat('<table border="0" cellborder="1" cellpadding="2" cellspacing="0">').concat("\n")
                .concat('<tr>').concat("\n")
                .concat('<td><b>Param name</b></td>').
            concat('<td><b>Param value</b></td>').concat("\n");

            Object.entries(mapping.params).forEach(([param, value]) => {
                if (param && param !== "size" && param !== "selectedPlan") {
                    graphvizContent = graphvizContent.concat('</tr>').concat("\n")
                        .concat('<tr>').concat("\n")
                        .concat('<td><b>').concat(param).concat('</b></td>').concat("\n");
                    let valueToConcat = value.value ? value.value : value.plans[mapping.params.selectedPlan.value].value;
                    graphvizContent = graphvizContent.concat('<td>').concat(valueToConcat).concat('</td>').concat("\n");
                }
            });
            graphvizContent = graphvizContent.concat('</tr>').concat("\n")
                .concat('</table>').concat("\n")
                .concat('>];').concat("\n");
        }


        graphvizContent = graphvizContent.concat('node [ style="rounded,filled", fillcolor="#E6E6E6", shape=circle, xlabel = "').concat(mapping.params["size"].value).concat('" ] "boundary"').concat(";").concat("\n");
        mapping.mappings.forEach(singleMapping => {
            let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
            singleMapping.output.forEach(singleOutput => {
                let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);
                let edgeInnerLabel = '[R='.concat(singleOutput.size);
                if (!["sequential", "and"].includes(singleOutput.gateway.type.toLowerCase())) {
                    edgeInnerLabel = edgeInnerLabel.concat(', GW=').concat(singleOutput.gateway.type).concat(', p=').concat(singleOutput.gateway.prob).concat(']');
                } else {
                    edgeInnerLabel = edgeInnerLabel.concat(']');
                }
                graphvizContent = graphvizContent.concat(inputOperationId).concat(" -> ").concat(outputOperationId).concat(' [ color=red, penwidth=2.0, label="').concat(edgeInnerLabel).concat('" ]').concat(";").concat("\n");
            });
            let edgeOuterLabel = '[R='.concat(singleMapping.input.size);
            if (!["sequential", "and"].includes(singleMapping.input.gateway.type.toLowerCase())) {
                edgeOuterLabel = edgeOuterLabel.concat(', GW=').concat(singleMapping.input.gateway.type).concat(', p=').concat(singleMapping.input.gateway.prob).concat(']');
            } else {
                edgeOuterLabel = edgeOuterLabel.concat(']');
            }
            graphvizContent = graphvizContent.concat("boundary").concat(" -> ").concat(inputOperationId).concat(' [ color=grey, penwidth=2.0, label="').concat(edgeOuterLabel).concat('" ]').concat(";").concat("\n");
        });

        fs.writeFileSync(mappingFilePath.replace("yaml", "dot").replace(INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME), graphvizContent, 'utf8');

        const combinedFilePath = path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, name + '.dot');
        fs.writeFileSync(combinedFilePath, '');
        fs.appendFileSync(combinedFilePath, 'digraph restalk \{ \n\n rankdir=LR;\n\n');
        Object.entries(oas).forEach(([serviceName, service]) => {
            let serviceContent = fs.readFileSync(path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, serviceName + '.dot'), "utf8");
            fs.appendFileSync(combinedFilePath, '\n\n' + serviceContent + '\n\n');
        });
        fs.appendFileSync(combinedFilePath, graphvizContent + '\n\n' + '}');

    } catch (e) {
        logger.error(e);
    }

};