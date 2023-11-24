import {initDb, initServer} from './server';

/**
 * The initServer() function will initialize the
 * server (starts the caches, finalizes plugin registration) but does not start
 * the server. This is what you will use in your tests. The initDb() function
 * will actually start the server. This is what you will use in our main
 * entry-point for the server.
 */
initServer().then(initDb);
