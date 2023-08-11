import {type Server} from 'http';
import mongoose from 'mongoose';

import config from '../config/server.cfg';

/**
 * @see https://github.com/docker/awesome-compose/blob/master/react-express-mongodb/backend/db/index.js
 * @see https://mongoosejs.com/docs/5.x/docs/connections.html
 */

let intents = 1;
let timerId: NodeJS.Timeout;
const MAX_TRIES = 10;

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  // maxPoolSize: 10, // Maintain up to 10 socket connections
};

async function connectDb(server: Server) {
  const {host, port, database, username, password} = config.db;
  const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`;
  mongoose.Promise = global.Promise;

  const connectWithRetry = () => {
    mongoose
      .connect(uri, options)
      .then(() => {
        clearTimeout(timerId);
        console.info('🍃 MongoDB is connected');
        server.emit('ready');
      })
      .catch(err => {
        if (intents === MAX_TRIES) {
          console.error(err);
          process.exit(0);
        }
        console.info('🍃 MongoDB connection failed, retry in 2 secs.');
        console.error(err);
        timerId = setTimeout(connectWithRetry, 2000);
        intents += 1;
      });
  };

  connectWithRetry();
}

export default connectDb;
