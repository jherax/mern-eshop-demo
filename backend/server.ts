import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import config from './config/server.cfg';
import connectDb from './db/mongodb';
import registerRoutes from './routes';

const app = express();
const appPort = config.app.port;
const appHost = config.app.host;

connectDb(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

registerRoutes(app);

app.on('ready', () => {
  app.listen(appPort, () => {
    console.info(`⚡️ Express running at http://${appHost}:${appPort}`);
  });
});
