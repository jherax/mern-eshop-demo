import type {Express, Request, Response} from 'express';

import productRoutes from './products';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function routes(app: Express) {
  productRoutes(app);

  app.route('/').get((req: Request, res: Response) => {
    res.send('MongoDB + Express + TypeScript Server');
  });
}
