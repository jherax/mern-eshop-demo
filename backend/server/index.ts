import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import http, {type Server} from 'http';

import connectDb from '../db/mongodb';
import registerRoutes from '../routes';
import logger from '../utils/logger';
import config from './config';

let app: Express;
let server: Server;
const appPort = config.app.port;
const appHost = config.app.host;

export const initServer = async () => {
  app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  registerRoutes(app);
  server = http.createServer(app);
  return server;
};

export const startServer = async () => {
  server.listen(appPort, () => {
    logger.info(`⚡️ Express running at http://${appHost}:${appPort}`);
  });
  return server;
};

export const initDb = async () => {
  app.on('ready', startServer);
  connectDb(app);
  return server;
};

process.on('unhandledRejection', err => {
  logger.error(err);
  process.exit(1);
});
