import {type Express} from 'express';
import type {Server} from 'http';
import mongoose from 'mongoose';

import config from '../server/config';
import logger from '../utils/logger';

/**
 * @see https://github.com/docker/awesome-compose/blob/master/react-express-mongodb/backend/db/index.js
 * @see https://mongoosejs.com/docs/5.x/docs/connections.html
 */

let intents = 1;
let timerId: NodeJS.Timeout;
const MAX_TRIES = 10;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Use new server discovery and monitoring engine
  autoIndex: false, // Don't build indexes
  // maxPoolSize: 10, // Maintain up to 10 socket connections
};

async function connectDb(app: Express | Server) {
  const {host, port, database, username, password} = config.db;
  const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  mongoose.Promise = global.Promise;

  const connectWithRetry = () => {
    mongoose
      .connect(uri, options)
      .then(() => {
        clearTimeout(timerId);
        logger.info('🍃 MongoDB is connected');
        app.emit('ready');
      })
      .catch(err => {
        if (intents === MAX_TRIES) {
          logger.error(err);
          throw new Error('Maximum number of connection retries reached');
        }
        logger.info('🍃 MongoDB connection failed, retry in 2 secs.');
        logger.error(err);
        timerId = setTimeout(connectWithRetry, 2000);
        intents += 1;
      });
  };

  connectWithRetry();
}

export default connectDb;
