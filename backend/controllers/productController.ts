import type {Request, Response} from 'express';

import Product from '../models/Product';
import messages from '../server/messages';
import {sendError, sendSuccess} from '../server/responses';

export async function addProduct(req: Request, res: Response) {
  const params = req.body;

  try {
    const product = new Product({
      name: params.name,
      size: params.size,
      unitaryPrice: params.unitaryPrice,
      description: params.description,
    });

    if (req.file) {
      product.setImgUrl(req.file.filename);
    }

    const data = await product.save();
    sendSuccess<IProduct>(res, messages.SUCCESSFUL_ADDED, data);
  } catch (err) {
    sendError(res, err);
  }
}

export async function getProducts(req: Request, res: Response) {
  const page = +(req.query.page || 1);
  const limit = +(req.query.limit || 10);
  const startIndex = (page - 1) * limit;
  try {
    const data = await Product.find()
      .skip(startIndex)
      .limit(limit)
      .lean()
      .exec();
    sendSuccess<IProduct[]>(res, messages.SUCCESSFUL, data);
  } catch (err) {
    sendError(res, err);
  }
}
