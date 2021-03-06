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
        let sep = '';
        if (process.platform === "win32") {
          sep = "//";
          dotInput = dotInput.concat('%CD%//src//backend//');
          pngOutput = pngOutput.concat('%CD%//src//frontend//data');
        } else {
          sep = "/";
          dotInput = dotInput.concat('/opt/app/src/backend/');
          pngOutput = pngOutput.concat('/opt/app/src/frontend/data');
        }
        dotInput = dotInput.concat(config.app.OUTPUT_SUBFOLDER_NAME).concat(sep).concat(FILE_NAME).concat(sep).concat(FILE_NAME).concat('.dot');
        pngOutput = pngOutput.concat(sep).concat(FILE_NAME).concat('.png');

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
      const copyFrom = path.join(__dirname, '../', '..', config.app.OUTPUT_SUBFOLDER_PATH, FILE_NAME, FILE_NAME.concat('.mzn'));
      const copyTo = path.join(__dirname, '../', '..', config.app.PUBLIC_SUBFOLDER_PATH, FILE_NAME.concat('.mzn'));
      fs.copyFile(copyFrom, copyTo, function (e) {
        if (e) {
          logger.info('GET /exec... ERROR');
          logger.error(e);
          res.status(400).send({
            status: 0,
            reason: e
          });
        } else {
          res.send(msg);
        }
      });
    });
  } catch (e) {
    logger.info('GET /exec... ERROR');
    logger.error(e);
    res.status(400).send({
      status: 0,
      reason: e
    });
  }
});


app.post('/postMapping', function (req, res) {
  logger.info('POST /postMapping...');

  const FILE_NAME = req.query.mapping ? req.query.mapping : config.app.DEFAULT_MAPPING;

  const fileContent = req.body;
  const internalPath = path.join(__dirname, config.app.INPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.yaml'));
  const publicPath = path.join(__dirname, '../', '../', config.app.PUBLIC_SUBFOLDER_PATH, FILE_NAME.concat('.yaml'));
  fs.writeFile(internalPath, jsyaml.safeDump(fileContent), function (e) {
    if (e) {
      logger.info('POST /postMapping... ERROR');
      logger.error(e);
      res.status(400).send({
        status: 0,
        reason: e
      });
    } else {
      fs.writeFile(publicPath, jsyaml.safeDump(fileContent), function (e) {
        if (e) {
          logger.info('POST /postMapping... ERROR');
          logger.error(e);
          res.status(400).send({
            status: 0,
            reason: e
          });
        } else {
          logger.info('POST /postMapping... OK');
          res.send('OK');
        }
      });
    }
  });
});

app.post('/createWorkspace', function (req, res) {
  logger.info('POST /createWorkspace...');

  // name: 45010064645373668034401065373631080192024_cyz4rfx3l2q
  // from: mapping - complex
  const FROM_FILE_NAME = req.body.from;
  const FILE_NAME = req.body.name;

  const mappingFileName = 'mapping'.concat('-').concat(FILE_NAME);

  const internalInputFolderPath = path.join(__dirname, config.app.INPUT_SUBFOLDER_NAME, mappingFileName);
  const internalOutFromFolderPath = path.join(__dirname, config.app.OUTPUT_SUBFOLDER_NAME, mappingFileName);

  const internalInputFromFolderPath = path.join(__dirname, config.app.INPUT_SUBFOLDER_NAME, FROM_FILE_NAME);
  const publicFolderPath = path.join(__dirname, '../', '../', config.app.PUBLIC_SUBFOLDER_PATH);

  const internalPath = path.join(internalInputFolderPath, mappingFileName.concat('.yaml'));
  const publicPath = path.join(publicFolderPath, mappingFileName.concat('.yaml'));


  const copyFrom = path.join(internalInputFromFolderPath, FROM_FILE_NAME.concat('.yaml'));

  fs.exists(internalOutFromFolderPath, function (exists) {
    if (!exists) {
      fs.mkdir(internalOutFromFolderPath, function (e) {
        if (e) {
          logger.info('POST /createWorkspace... ERROR');
          logger.error(e);
          res.status(400).send({
            status: 0,
            reason: e
          });
        } else {
          fs.exists(internalInputFolderPath, function (exists) {
            if (!exists) {
              fs.mkdir(internalInputFolderPath, function (e) {
                if (e) {
                  logger.info('POST /createWorkspace... ERROR');
                  logger.error(e);
                  res.status(400).send({
                    status: 0,
                    reason: e
                  });
                } else {
                  if (FROM_FILE_NAME && FROM_FILE_NAME != "false") {
                    fs.copyFile(copyFrom, publicPath, function (e) {
                      if (e) {
                        logger.info('POST /createWorkspace... ERROR');
                        logger.error(e);
                        res.status(400).send({
                          status: 0,
                          reason: e
                        });
                      } else {
                        fs.copyFile(copyFrom, internalPath, function (e) {
                          if (e) {
                            logger.info('POST /createWorkspace... ERROR');
                            logger.error(e);
                            res.status(400).send({
                              status: 0,
                              reason: e
                            });
                          } else {
                            logger.info('POST /createWorkspace (from "%s")(%s)... OK', FROM_FILE_NAME, mappingFileName);
                            res.send(mappingFileName);
                          }
                        });
                      }
                    });
                  } else {
                    fs.writeFile(internalPath, "", function (e) {
                      if (e) {
                        logger.info('POST /createWorkspace... ERROR');
                        logger.error(e);
                        res.status(400).send({
                          status: 0,
                          reason: e
                        });
                      } else {
                        fs.writeFile(publicPath, "", function (e) {
                          if (e) {
                            logger.info('POST /createWorkspace... ERROR');
                            logger.error(e);
                            res.status(400).send({
                              status: 0,
                              reason: e
                            });
                          } else {
                            logger.info('POST /createWorkspace (empty)(%s)... OK', FILE_NAME);
                            res.send(FILE_NAME);
                          }
                        });
                      }
                    });
                  }
                }
              });
            } else {
              logger.info('POST /createWorkspace... ERROR');
              let e = "Name input collision: ".concat(mappingFileName);
              logger.error(e);
              res.status(500).send({
                status: 0,
                reason: e
              });
            }
          });
        }
      });

    } else {
      logger.info('POST /createWorkspace... ERROR');
      let e = "Name output collision: ".concat(mappingFileName);
      logger.error(e);
      res.status(500).send({
        status: 0,
        reason: e
      });
    }
  });
});

/// END ROUTES

server.listen(serverPort, function () {
  logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  if (process.env.NODE_ENV != "production") {
    require('child_process').exec('git rev-parse HEAD', function (err, stdout) {
      fs.writeFile(path.join(__dirname, '..', 'frontend/version'), stdout, function (err) {
        if (!err) {
          logger.info('Running version:', stdout);
        } else {
          logger.info('Unable to write version file', err);
        }
      });
    });
  }
});


exports.close = function (callback) {
  if (server.listening) {
    server.close(callback);
  } else {
    callback();
  }
};