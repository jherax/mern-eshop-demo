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
  try {
    const data = await Product.find().lean().exec();
    sendSuccess<IProduct[]>(res, messages.SUCCESSFUL, data);
  } catch (err) {
    sendError(res, err);
  }
}
