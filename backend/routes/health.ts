import express, {type Express} from 'express';
import rateLimit from 'express-rate-limit';

import {healthCheck} from '../controllers/healthController';
import messages from '../utils/messages';

export default function healthCheckRoutes(app: Express) {
  const router = express.Router();

  /**
   * @see https://www.npmjs.com/package/express-rate-limit
   */
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 requests per windowMs
    statusCode: messages.TOO_MANY_REQUESTS.code,
    message: () => {
      const serverMsg: ServerResponse = messages.TOO_MANY_REQUESTS;
      const errorMsg = 'Limit of requests exceeded, please try again later';
      serverMsg.error = {message: errorMsg, stack: null};
      return serverMsg;
    },
  });

  /**
   * Maybe adding another security layer as JWT or a custom http Header
   * @see https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
   * @see https://gist.github.com/cteyton/ba3cfa0e055a47b2a6755b37c916a5b2
   */

  router.get('/healthcheck', limiter, healthCheck);

  router.get('/healthz', limiter, healthCheck);

  app.use('/', router);
}
