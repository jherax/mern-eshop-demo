import {initDb, initServer} from './server';
import logger from './utils/logger';

/**
 * The initServer() function will initialize the
 * server (starts the caches, finalizes plugin registration) but does not start
 * the server. This is what you will use in your tests. The initDb() function
 * will actually start the server. This is what you will use in our main
 * entry-point for the server.
 */
initServer().then(initDb);

// Catch unhandling rejected promises
process.on('unhandledRejection', reason => {
  logger.error('UNHANDLED_REJECTION 👇');
  logger.error(reason);
  // process.exit(1)
});

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error(`UNCAUGHT_EXCEPTION 👉 ${error.message}`);
  // process.exit(1)
});
