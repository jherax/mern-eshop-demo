import express, {type Express} from 'express';

import uploadMiddleware from '../config/middleware.multer';
import {addProduct, getProducts} from '../controllers/productController';

export default function productRoutes(app: Express) {
  const router = express.Router();

  // imgfile is the field <input type="file" name="imgfile" />
  // when using enctype="multipart/form-data" in your form.
  router.post(
    '/products',
    /* validateRequestBody, */
    uploadMiddleware.single('imgfile'),
    addProduct,
  );

  /**
   * TODO: Add pagination
   * @see https://www.educba.com/mongodb-pagination/
   * @see https://dev.to/max_vynohradov/the-right-way-to-make-advanced-and-efficient-mongodb-pagination-16oa
   */
  router.get('/products', getProducts);

  // it's a prefix before api it is useful when you have many modules and
  // you want to differentiate b/w each module you can use this technique
  app.use('/api/v1', router);
}
