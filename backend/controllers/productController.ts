import type {Request, Response} from 'express';

import Product from '../models/Product';
import messages from '../utils/messages';
import {sendError, sendSuccess} from '../utils/responses';

export async function addProduct(req: Request, res: Response) {
  const params = req.body;
  try {
    const product = new Product({
      name: params.name,
      size: params.size,
      unitaryPrice: params.unitaryPrice,
      description: params.description,
    });

    const data = await product.save();
    sendSuccess(res, messages.SUCCESSFUL_ADDED, data);
  } catch (err) {
    sendError(res, messages.INTERNAL_SERVER_ERROR, err);
  }
}
