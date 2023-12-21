import express, {type Express, type Request, type Response} from 'express';
import path from 'path';

import config from '../server/config';
import healthCheckRoutes from './health';
import productRoutes from './products';

/**
 * @see https://expressjs.com/en/guide/routing.html
 */

export default function registerRoutes(app: Express) {
  productRoutes(app);
  healthCheckRoutes(app);

  const CWD = process.cwd();

  app.route('/').get((req: Request, res: Response) => {
    const docsFolder = path.join(CWD, 'public', 'docs');
    res.sendFile(path.join(docsFolder, 'README.html'));
  });

  app.use('/public', express.static(CWD + config.app.images));
}
