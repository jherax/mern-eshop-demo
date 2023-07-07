import express, {type Request, type Response} from 'express';

import config from './config/server.cfg';
import connectDb from './db/mongodb';

const app = express();
const appPort = config.app.port;

connectDb(app);

app.get('/', (req: Request, res: Response) => {
  res.send('MongoDB + Express + TypeScript Server');
});

app.on('ready', () => {
  app.listen(appPort, () => {
    console.info(`⚡️ Express running at http://localhost:${appPort}`);
  });
});
