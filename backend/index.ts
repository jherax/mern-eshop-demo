import {initDb, initServer} from './server';

initServer().then(initDb);
