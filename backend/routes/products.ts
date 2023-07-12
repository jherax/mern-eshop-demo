import express, {type Express} from 'express';

import {addProduct} from '../controllers/productController';

export default function productRoutes(app: Express) {
  const router = express.Router();

  router.post('/products', addProduct);

  // it's a prefix before api it is useful when you have many modules and
  // you want to differentiate b/w each module you can use this technique
  app.use('/api/v1', router);
}
