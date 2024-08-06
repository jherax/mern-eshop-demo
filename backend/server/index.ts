/* eslint-disable curly */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {type Express} from 'express';
import helmet from 'helmet';
import http, {type Server} from 'http';

import connectDb from '../db/mongodb';
import defaultRoutes from '../routes/default';
import logger from '../utils/logger';
import config from './config';
import events from './events';

export class NodeServer {
  private _app: Express;
  private _server: Server;
  private _started = false;

  constructor() {
    this._app = express();
    this.config();
    this.routerConfig();
    this._server = http.createServer(this._app);
  }

  private config() {
    this._app.use(cookieParser());
    this._app.use(cors<cors.CorsRequest>());
    this._app.use(bodyParser.json({limit: '1mb'}));
    this._app.use(bodyParser.urlencoded({extended: true}));
    // https://blog.logrocket.com/using-helmet-node-js-secure-application/
    // https://helmetjs.github.io/#cross-origin-resource-policy
    this._app.use(
      helmet({
        crossOriginResourcePolicy: {policy: 'cross-origin'},
      }),
    );
  }

  private routerConfig() {
    defaultRoutes(this._app);
    // RegisterRoutes(this.app);
    // handleErrors(this.app);
  }

  public get app(): Express {
    return this._app;
  }

  public get server(): Server {
    return this._server;
  }

  public startDB(): Promise<void> {
    if (this._started) return Promise.resolve();
    this._app.on(events.SERVER_READY, this.start.bind(this));
    return connectDb(this._app);
  }

  public start(): void {
    if (this._started) return;
    const {host, port} = config.app;
    this._server.listen(port, () => {
      logger.info(`⚡️ Express running at http://${host}:${port}`);
      this._started = true;
    });
  }
}
