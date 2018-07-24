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
const formidable = require('formidable');
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

const uploadDir = path.join(__dirname, 'data/');


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

    //TODO: extract to confi
    // const INPUT_SUBFOLDER_NAME = 'inputSABIUS';
    const INPUT_SUBFOLDER_NAME = 'input';
    const OUTPUT_SUBFOLDER_NAME = 'output';

    const FILE_NAME = req.query.mapping ? req.query.mapping : 'mapping';
    const START_NODE_NAME = req.query.start ? req.query.start : null;
    const SELECTED_ANALYSIS_MODULE = 'module_5';

    const SELECTED_PLAN = null; // used the default in mapping file
    const SIZE_NAME = null; // used the default in mapping file
    try {
      const mappingFilePath = path.join(__dirname, INPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.yaml'));
      if (dot) {
        logger.info('Generating DOT...');
        mappingDotGenerator.generateMappingDOT(mappingFilePath, FILE_NAME, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME, START_NODE_NAME);
        exec('dot %CD%\\src\\backend\\'.concat(OUTPUT_SUBFOLDER_NAME).concat('\\').concat(FILE_NAME).concat('\\').concat(FILE_NAME).concat('.dot -Tpng -o %CD%\\src\\frontend\\data').concat('\\').concat(FILE_NAME).concat('.png'));
        logger.info('Generating DOT OK');
      }
      if (mzn) {
        logger.info('Generating MZN...');
        mappingMznGenerator.generateMZN(mappingFilePath, FILE_NAME, SELECTED_PLAN, SELECTED_ANALYSIS_MODULE, SIZE_NAME, INPUT_SUBFOLDER_NAME, OUTPUT_SUBFOLDER_NAME, START_NODE_NAME);
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
    res.redirect('editor.html#main');
    // res.send('OK');
  } else {
    logger.info('GET /generate... ERROR');
    res.status(400).send(resp.reason);
  }

});

app.get('/exec', function (req, res) {
  logger.info('GET /exec...');

  //TODO: extract to config
  const OUTPUT_SUBFOLDER_NAME = 'src/backend/output';
  const FILE_NAME = req.query.mapping ? req.query.mapping : 'mapping';

  async function execMZN() {
    const {
      stdout,
      stderr
    } = await exec('mzn-fzn --solver fzn-gecode %CD%\\'.concat(OUTPUT_SUBFOLDER_NAME).concat('\\').concat(FILE_NAME).concat('\\').concat(FILE_NAME).concat('.mzn'));

    let stdoutArray = stdout.split(/\r|\n/);
    let msg = stdoutArray[stdoutArray.length - 7];
    logger.info('Minizinc: "%s"', msg);

    //TODO: improve this awful way to do this!
    let cspVariable = msg.split(' = ')[0];
    let cspValue = Number(msg.split(' = ')[1]);
    utils.setQuotaValueFromCSP(FILE_NAME, cspVariable, cspValue);

    logger.info('The quota for %s is %s', cspVariable, cspValue);
    return msg;
  }

  try {
    execMZN().then(msg => {
      logger.info('GET /exec... OK');
      fs.copyFileSync(path.join(__dirname, '../', '..', OUTPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.mzn')), path.join(__dirname, '../', '..', 'src/frontend/data', FILE_NAME.concat('.mzn')));
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
  //TODO: extract to config
  // const INPUT_SUBFOLDER_NAME = 'inputSABIUS';
  const FILE_NAME = req.query.mapping ? req.query.mapping : 'mapping';
  const INPUT_SUBFOLDER_NAME = 'input';

  const fileContent = req.body;
  const internalPath = path.join(__dirname, INPUT_SUBFOLDER_NAME, FILE_NAME, FILE_NAME.concat('.yaml'));
  const publicPath = path.join(__dirname, '../frontend/data', FILE_NAME.concat('.yaml'));
  fs.writeFileSync(internalPath, jsyaml.safeDump(fileContent));
  fs.writeFileSync(publicPath, jsyaml.safeDump(fileContent));
  logger.info('POST /postMapping... OK');
  res.send('OK');
});

//old
app.post('/doUpload', function (req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = uploadDir;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      res.redirect('./exec?filename='.concat(files.file.name));
    }
  });
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.');
    file.path = path.join(uploadDir, `${fileName}.${fileExt}`);
  });
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