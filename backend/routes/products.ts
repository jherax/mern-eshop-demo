import express, {type Express} from 'express';

import uploadMiddleware from '../config/middleware.multer';
import {addProduct} from '../controllers/productController';

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

  // it's a prefix before api it is useful when you have many modules and
  // you want to differentiate b/w each module you can use this technique
  app.use('/api/v1', router);
}
