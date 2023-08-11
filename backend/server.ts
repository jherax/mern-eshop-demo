import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import http, {type Server} from 'http';

import config from './config/server.cfg';
import connectDb from './db/mongodb';
import registerRoutes from './routes';

let app: Express;
let server: Server;
const appPort = config.app.port;
const appHost = config.app.host;

export const init = async () => {
  app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  registerRoutes(app);
  server = http.createServer(app);
  return server;
};

export const prepareDb = async () => {
  server.on('ready', start);
  connectDb(server);
  return server;
};

export const start = async () => {
  server.listen(appPort, () => {
    console.info(`⚡️ Express running at http://${appHost}:${appPort}`);
  });
  return server;
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});
