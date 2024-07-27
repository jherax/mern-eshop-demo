import {NodeServer} from './server';
import events from './server/events';
import logger from './utils/logger';

new NodeServer().startDB();

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
