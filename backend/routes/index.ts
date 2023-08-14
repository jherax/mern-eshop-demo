import express, {type Express, type Request, type Response} from 'express';

import config from '../config/server.cfg';
import healthCheckRoutes from './health';
import productRoutes from './products';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function registerRoutes(app: Express) {
  productRoutes(app);
  healthCheckRoutes(app);

  app.route('/').get((req: Request, res: Response) => {
    res.send('MongoDB + Express + TypeScript Server');
  });

  app.use('/public', express.static(process.cwd() + config.app.images));
}
