/* eslint-disable curly */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import http, {type Server} from 'http';

import connectDb from '../db/mongodb';
import registerRoutes from '../routes';
import logger from '../utils/logger';
import config from './config';
import events from './events';

let app: Express;
let server: Server;
let started = false;

/**
 * The initServer() function will initialize the server (starts the cache,
 * finalizes plugin registration) but does not start the server.
 * This is what you will use in your tests. The startServer() function
 * will actually start the server. This is what you will use in our main
 * entry-point for the server.
 */
export const initServer = async () => {
  app = express();
  app.use(cors<cors.CorsRequest>());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

  registerRoutes(app);
  server = http.createServer(app);
  return server;
};

export const startServer = () => {
  if (started) return;
  const {host, port} = config.app;
  server.listen(port, () => {
    logger.info(`⚡️ Express running at http://${host}:${port}`);
    started = true;
  });
};

export const startDB = async () => {
  if (started) return Promise.resolve();
  app.on(events.SERVER_READY, startServer);
  return connectDb(app);
};
