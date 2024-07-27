import {initServer, startDB, startServer} from './server';
import events from './server/events';
import logger from './utils/logger';

/**
 * The initServer() function will initialize the server (starts the cache,
 * finalizes plugin registration) but does not start the server.
 * This is what you will use in your tests. The startServer() function
 * will actually start the server. This is what you will use in our main
 * entry-point for the server.
 */
initServer().then(startDB).then(startServer);

// Catch unhandling rejected promises
process.on(events.UNHANDLED_REJECTION, reason => {
  logger.error('UNHANDLED_REJECTION 👇');
  logger.error(reason);
  process.exit(1);
});

// Catch unhandling unexpected exceptions
process.on(events.UNCAUGHT_EXCEPTION, (error: Error) => {
  logger.error(`UNCAUGHT_EXCEPTION 👉 ${error.message}`);
  process.exit(1);
});
