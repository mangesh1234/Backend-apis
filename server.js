/**
 * Server configuration
 */

'use strict';
const bunyan = require('bunyan');
const restify = require('restify');
const customErrors = require('./config/errors');
const config = require('./config');

// Accept environment info from host machine
const env = process.env.NODE_ENV || 'development';

// Pick up app's config based on the type of environment
restify.appConfig = config[env];

//Create a global app logger
restify.__log = bunyan.createLogger({
  name: restify.appConfig.project.name,
  streams: [{
    stream: process.stdout,
    level: 'debug'
  }]
});

// Standard method to fetch child loggers
// Example use case - To segregate logs between two different modules
// OR subsystems within the app
restify.getLogger = (name) => {
  return restify.__log.child({
    module: name
  });
};

if (!restify.appConfig) {
  restify.__log.fatal('Application has crashed, urgen attention required', restify.appConfig, config);
  return new Error('App Crashed');
}

const routes = require('./routes');
const runMigrations = require('../storage/runMigrations');

runMigrations()
  .then(() => {
    restify.fcErrors = customErrors;

    // restify.CORS.ALLOW_HEADERS.push('authorization');
    const server = restify.createServer({
      log: restify.__log,
      name: restify.appConfig.project.name
    });
    server.use(restify.requestLogger());
    server.pre(restify.CORS({
      // Defaults to ['*'].
      // origins: ['http://192.168.0.121', 'http://localhost', 'http://admin.fcappservices.in'],

      // Defaults to false.
      credentials: true,

      // Sets expose-headers.
      headers: ['x-brainbees']
    }));
    // server.pre(restify.fullResponse());
    server.use(restify.queryParser({
      mapParams: true
    }));
    server.use(restify.bodyParser({
      maxBodySize: 0, // 0 - No limit
      mapParams: true //Maps the body params to req.params
    }));

    if ('production' === env) {
      server.on('after', restify.auditLogger({
        log: restify.getLogger('audit')
      }));
      server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
      }));
    }

    function unknownMethodHandler(req, res) {
      if (req.method.toLowerCase() === 'options') {
         // added Origin & X-Requested-With & **Authorization**
        const allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization'];

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(200);
      } else {
        return res.send(new restify.MethodNotAllowedError());
      }
    }

    server.on('MethodNotAllowed', unknownMethodHandler);
    routes(server);
    server.listen(restify.appConfig.project.port, restify.appConfig.ip, () => {
      // console.log('Server listening on %d', restify.appConfig.development.project.port);
      server.log.debug('Server listening on %d', restify.appConfig.project.port);
    });
  });
