import env from 'dotenv';
import express from 'express';

import config from '../../config/server.cfg';

env.config();
const app = express();
const port = config.app.port;

app.get('/', (req, res) => {
  res.send('Main page!');
});

app.listen(port, () => {
  console.info(`Express running at http://localhost:${port}`);
});
