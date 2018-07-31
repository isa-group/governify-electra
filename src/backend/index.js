'use strict';

/*
 * Put here your dependencies
 */
const http = require('http'); // Use https if your app will not be behind a proxy.
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
var jsyaml = require('js-yaml');

const mappingDotGenerator = require('./generators/mappingDotGenerator');
const mappingMznGenerator = require('./generators/mappingMznGenerator');
const config = require('./configurations');
const utils = require('./generators/utils/utils');
const logger = require('./logger');


const app = express();

app.use(compression());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: 'true'
  })
);

app.use(
  bodyParser.json({
    limit: '50mb',
    type: 'application/json'
  })
);

app.set('view engine', 'html');

const frontendPath = __dirname.concat('/../frontend');
logger.info('Serving "%s" as static folder', frontendPath);
app.use(express.static(frontendPath));

if (config.server.bypassCORS) {
  logger.info('Adding "Access-Control-Allow-Origin: * " header to every path.');
  app.use(cors());
}
if (config.server.useHelmet) {
  logger.info('Adding Helmet related headers.');
  app.use(helmet());
}

const serverPort = process.env.PORT || config.server.port;

const server = http.createServer(app);


/// ROUTES


app.get('/generate', function (req, res) {
  logger.info('GET /generate...');

  const dot = req.query.dot;
  const mzn = req.query.mzn;

  function generate(dot, mzn) {
    const FILE_NAME = req.query.mapping ? req.query.mapping : config.app.DEFAULT_MAPPING;
    const START_NODE_NAME = req.query.start ? req.query.start : null;

    const SELECTED_PLAN = null; // used the default in mapping file
    const SIZE_NAME = null; // used the default in mapping file
    try {
      const mappingFilePath = path.join(__dirname, config.app.INPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.yaml'));
      if (dot && dot === "true") {
        logger.info('Generating DOT...');
        mappingDotGenerator.generateMappingDOT(mappingFilePath, FILE_NAME, config.app.INPUT_SUBFOLDER_NAME, config.app.OUTPUT_SUBFOLDER_NAME, START_NODE_NAME);
        //TODO: hardcoded paths, fix it
        let dotInput = '';
        let pngOutput = '';
        if (process.platform === "win32") {
          dotInput = dotInput.concat('%CD%//src//backend//').concat(config.app.OUTPUT_SUBFOLDER_NAME).concat('//').concat(FILE_NAME).concat('//').concat(FILE_NAME).concat('.dot');
          pngOutput = pngOutput.concat('%CD%//src//frontend//data').concat('//').concat(FILE_NAME).concat('.png');
        } else {
          dotInput = dotInput.concat('/opt/app/src/backend/').concat(config.app.OUTPUT_SUBFOLDER_NAME).concat('/').concat(FILE_NAME).concat('/').concat(FILE_NAME).concat('.dot');
          pngOutput = pngOutput.concat('/opt/app/src/frontend/data').concat('/').concat(FILE_NAME).concat('.png');
        }
        const cmd = 'dot '.concat(dotInput).concat(' -Tpng -o ').concat(pngOutput);
        logger.info("Executing %s", cmd);
        exec(cmd);
        logger.info('Generating DOT OK');
      }
      if (mzn && mzn === "true") {
        logger.info('Generating MZN...');
        mappingMznGenerator.generateMZN(mappingFilePath, FILE_NAME, SELECTED_PLAN, config.app.SELECTED_ANALYSIS_MODULE, SIZE_NAME, config.app.INPUT_SUBFOLDER_NAME, config.app.OUTPUT_SUBFOLDER_NAME, START_NODE_NAME);
        logger.info('Generating MZN OK');
      }
    } catch (e) {
      logger.error(e);
      return {
        status: 0,
        reason: e.stack
      };
    }
    return {
      status: 1,
      reason: 'OK'
    };
  }

  let resp = generate(dot, mzn);
  if (resp.status > 0) {
    logger.info('GET /generate... OK');
    // res.redirect('index.html#main');
    res.send('OK');
  } else {
    logger.info('GET /generate... ERROR');
    res.status(400).send(resp.reason);
  }

});

app.get('/exec', function (req, res) {
  logger.info('GET /exec...');


  const FILE_NAME = req.query.mapping ? req.query.mapping : config.app.DEFAULT_MAPPING;

  async function execMZN() {
    //TODO: hardcoded paths, fix it
    let mznFilePath = '';
    if (process.platform === "win32") {
      mznFilePath = mznFilePath.concat('%CD%//').concat(config.app.OUTPUT_SUBFOLDER_PATH).concat('//').concat(FILE_NAME).concat('//').concat(FILE_NAME).concat('.mzn');
    } else {
      mznFilePath = mznFilePath.concat('/opt/app/').concat(config.app.OUTPUT_SUBFOLDER_PATH).concat('/').concat(FILE_NAME).concat('/').concat(FILE_NAME).concat('.mzn');
    }
    const cmd = 'mzn-fzn --solver fzn-gecode '.concat(mznFilePath);
    logger.info('Executing: "%s"', cmd);
    const { stdout, stderr } = await exec(cmd);
    logger.info('Minizinc stout: "%s"', stdout);

    //TODO: improve this awful way to do this!
    let matches = stdout.match(/(.*)_maximize\s?=\s?\d+/gi); //get the _maximize matches
    let msg = matches[matches.length - 1]; // get the last one
    logger.info('Minizinc: "%s"', msg);

    let cspVariable = msg.split((/\s?=\s?/));
    let cspVariableName = cspVariable[0];
    let cspVariableValue = Number(cspVariable[1]);
    logger.info('The quota for %s is %s', cspVariableName, cspVariableValue);

    utils.setQuotaValueFromCSP(FILE_NAME, cspVariableName, cspVariableValue);
    return msg;
  }

  try {
    execMZN().then(msg => {
      logger.info('GET /exec... OK');
      fs.copyFileSync(path.join(__dirname, '../', '..', config.app.OUTPUT_SUBFOLDER_PATH, FILE_NAME, FILE_NAME.concat('.mzn')), path.join(__dirname, '../', '..', config.app.PUBLIC_SUBFOLDER_PATH, FILE_NAME.concat('.mzn')));
      res.send(msg);
    });
  } catch (e) {
    logger.info('GET /exec... ERROR');
    logger.error(e);
    res.sendStatus(400);
  }
});


app.post('/postMapping', function (req, res) {
  logger.info('POST /postMapping...');

  const FILE_NAME = req.query.mapping ? req.query.mapping : config.app.DEFAULT_MAPPING;

  const fileContent = req.body;
  const internalPath = path.join(__dirname, config.app.INPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.yaml'));
  const publicPath = path.join(__dirname, '../', '../', config.app.PUBLIC_SUBFOLDER_PATH, FILE_NAME.concat('.yaml'));
  fs.writeFileSync(internalPath, jsyaml.safeDump(fileContent));
  fs.writeFileSync(publicPath, jsyaml.safeDump(fileContent));
  logger.info('POST /postMapping... OK');
  res.send('OK');
});


/// END ROUTES


server.listen(serverPort, function () {
  logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});


exports.close = function (callback) {
  if (server.listening) {
    server.close(callback);
  } else {
    callback();
  }
};