'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const $SyncRefParser = require('json-schema-ref-parser-sync');
const downloadFileSync = require('download-file-sync');
const OASDotGenerator = require('./OASDotGenerator');
const utils = require('./utils/utils');
const logger = require('./../logger');


module.exports.generateMappingDOT = function (mappingFilePath, name, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME, START_NODE_NAME) {
    try {
        const docRef = yaml.safeLoad(fs.readFileSync(mappingFilePath, 'utf8'));
        const mapping = $SyncRefParser.dereference(docRef);

        const oas = {};

        START_NODE_NAME = START_NODE_NAME ? START_NODE_NAME : mapping.params.rootOperation.value;

        Object.entries(mapping['services']).forEach(([serviceName, oasPath]) => {

            try {
                let docRef = '';
                let oasDocPath = '';
                if (oasPath.includes('http')) {
                    logger.info('DOWNLOADING OAS from %s', oasPath);
                    docRef = yaml.safeLoad(downloadFileSync(oasPath));
                    oasDocPath = oasPath;
                } else if (oasPath.includes('./')) {
                    let oasFilePath = path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, name, oasPath);
                    docRef = yaml.safeLoad(fs.readFileSync(oasFilePath, 'utf8'));
                    oasDocPath = path.join(__dirname, '../', INPUT_SUBFOLDER_NAME, name, serviceName.concat('-oas.yaml'));
                }
                oas[serviceName] = $SyncRefParser.dereference(docRef);

                let graphDocPath = path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, name, serviceName.concat('.dot'));
                OASDotGenerator.generateDOT(oasDocPath, graphDocPath, name, serviceName, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME, START_NODE_NAME);
            } catch (e) {
                logger.error('Error ', e);
            }
        });
        // logger.info(oas)
        // logger.info(mapping)

        let graphvizContent = '';


        if (mapping.params) {
            // create params node
            graphvizContent = graphvizContent.concat('params').concat(' [shape=note, style=filled, fillcolor="#F0F8FF" label=<').concat('\n')
                .concat('<table border="0" cellborder="1" cellpadding="2" cellspacing="0">').concat('\n')
                .concat('<tr>').concat('\n')
                .concat('<td><b>Param name</b></td>').
                concat('<td><b>Param value</b></td>').concat('\n');

            Object.entries(mapping.params).forEach(([param, value]) => {
                if (param && !['sizeVarName', 'selectedPlan', 'rootOperation'].includes(param)) {
                    graphvizContent = graphvizContent.concat('</tr>').concat('\n')
                        .concat('<tr>').concat('\n')
                        .concat('<td><b>').concat(param).concat('</b></td>').concat('\n');
                    let valueToConcat = value.value ? value.value : value.plans[mapping.params.selectedPlan.value].value;
                    graphvizContent = graphvizContent.concat('<td>').concat(valueToConcat).concat('</td>').concat('\n');
                }
            });
            graphvizContent = graphvizContent.concat('</tr>').concat('\n')
                .concat('<tr><td><b>Root operation</b></td><td>').concat(START_NODE_NAME).concat('</td></tr>').concat('\n')
                .concat('</table>').concat('\n')
                .concat('>];').concat('\n');
        }


        mapping.mappings.forEach(singleMapping => {
            let inputOperationId = utils.findOperationId(oas[singleMapping.input.service], singleMapping.input.path, singleMapping.input.method);
            singleMapping.output.forEach(singleOutput => {
                let outputOperationId = utils.findOperationId(oas[singleOutput.service], singleOutput.path, singleOutput.method);
                let edgeInnerLabel = '[R='.concat(singleOutput.count);
                if (singleOutput.gateway && !["sequential", "and"].includes(singleOutput.gateway.type.toLowerCase())) {
                    edgeInnerLabel = edgeInnerLabel.concat(', GW=').concat(singleOutput.gateway.type).concat(', p=').concat(singleOutput.gateway.prob).concat(']');
                } else {
                    edgeInnerLabel = edgeInnerLabel.concat(']');
                }
                graphvizContent = graphvizContent.concat(inputOperationId).concat(' -> ').concat(outputOperationId).concat(' [ color="#7a7a7a", penwidth=2.0, label="').concat(edgeInnerLabel).concat('" ]').concat(';').concat('\n');
            });

            // graphvizContent = graphvizContent.concat('boundary'.concat(START_NODE_NAME)).concat(' -> ').concat(inputOperationId).concat(' [ color=grey, penwidth=2.0, label="').concat(edgeOuterLabel).concat('" ]').concat(';').concat('\n');
            let edgeOuterLabel = '[R='.concat(singleMapping.input.count);
            if (singleMapping.input.gateway && !['sequential', 'and'].includes(singleMapping.input.gateway.type.toLowerCase())) {
                edgeOuterLabel = edgeOuterLabel.concat(', GW=').concat(singleMapping.input.gateway.type).concat(', p=').concat(singleMapping.input.gateway.prob).concat(']');
            } else {
                edgeOuterLabel = edgeOuterLabel.concat(']');
            }
        });

        fs.writeFileSync(mappingFilePath.replace('yaml', 'dot').replace(INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME), graphvizContent, 'utf8');

        const combinedFilePath = path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, name, name.concat('.dot'));
        fs.writeFileSync(combinedFilePath, '');
        fs.appendFileSync(combinedFilePath, 'digraph restalk \{ \n\n rankdir=LR;\n\n');
        Object.entries(oas).forEach(([serviceName, service]) => {
            let serviceContent = fs.readFileSync(path.join(__dirname, '../', OUTPUT_SUBFOLDER_NAME, name, serviceName.concat('.dot')), "utf8");
            // Change color to SLA of the boundary operation
            serviceContent = serviceContent.replace('limits_'.concat(START_NODE_NAME).concat(' [shape=note, style=filled, fillcolor="#F1D991" label=<'), 'limits_'.concat(START_NODE_NAME).concat(' [shape=note, style=filled, fillcolor="#F0F8FF" label=<'));
            fs.appendFileSync(combinedFilePath, '\n\n'.concat(serviceContent).concat('\n\n'));
        });
        fs.appendFileSync(combinedFilePath, graphvizContent.concat('\n\n').concat('}'));

    } catch (e) {
        logger.error(e);
    }

};