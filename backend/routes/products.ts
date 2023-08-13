import express, {type Express} from 'express';
import rateLimit from 'express-rate-limit';

import uploadMiddleware from '../config/middleware.multer';
import config from '../config/server.cfg';
import {addProduct, getProducts} from '../controllers/productController';
import validateRequestProduct from '../controllers/productValidator';
import messages from '../utils/messages';

export default function productRoutes(app: Express) {
  const router = express.Router();

  /**
   * @see https://www.npmjs.com/package/express-rate-limit
   */
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: config.app.maxRequests, // limit each IP to X requests per windowMs,
    statusCode: messages.TOO_MANY_REQUESTS.code,
    message: () => {
      const serverMsg: ServerResponse = messages.TOO_MANY_REQUESTS;
      const errorMsg = 'Limit of requests exceeded, please try again later';
      serverMsg.error = {message: errorMsg, stack: null};
      return serverMsg;
    },
  });

  // imgfile is the field <input type="file" name="imgfile" />
  // when using enctype="multipart/form-data" in your form.
  router.post(
    '/products',
    validateRequestProduct,
    uploadMiddleware.single('imgfile'),
    addProduct,
  );

  /**
   * Pagination
   * @see https://www.educba.com/mongodb-pagination/
   * @see https://dev.to/max_vynohradov/the-right-way-to-make-advanced-and-efficient-mongodb-pagination-16oa
   */
  router.get('/products', limiter, getProducts);

  // it's a prefix before api it is useful when you have many modules and
  // you want to differentiate b/w each module you can use this technique
  app.use('/api/v1', router);
}
