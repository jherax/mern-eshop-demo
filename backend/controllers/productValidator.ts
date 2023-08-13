import type {NextFunction, Request, Response} from 'express';

import messages from '../utils/messages';
import {sendError} from '../utils/responses';

export default function validateRequestProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errorMessages: string[] = [];
  const productBody = req.body as IProduct;

  if (!productBody.name?.length) {
    errorMessages.push('- Product name is not set');
  }

  if (!productBody.size?.length) {
    errorMessages.push('- Product size is not set');
  }

  if (!productBody.unitaryPrice) {
    errorMessages.push('- Unitary price is not set');
  }

  if (!productBody.description?.length) {
    errorMessages.push('- Product description is not set');
  }

  if (errorMessages.length) {
    sendError(res, {
      code: messages.INCOMPLETE_REQUEST.code,
      message: messages.INCOMPLETE_REQUEST.message,
      stack: ['There are errors in the body payload.']
        .concat(errorMessages)
        .join('\n'),
    });
    return;
  }

  next();
}
