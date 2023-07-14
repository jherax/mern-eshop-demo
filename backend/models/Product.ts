import mongoose from 'mongoose';

import config from '../config/server.cfg';

/**
 * @see https://mongoosejs.com/docs/typescript/statics-and-methods.html
 */
const ProductSchema = new mongoose.Schema<
  IProduct,
  ProductModel,
  IProductMethods
>(
  {
    name: String,
    size: String,
    unitaryPrice: Number,
    imgUrl: {type: String, required: false},
    description: String,
  },
  {
    timestamps: true,
  },
);

const app = config.app;

ProductSchema.methods.setImgUrl = function setImgUrl(filename: string) {
  // sets the public routed URL, not the absolute path
  this.imgUrl = `//${app.host}:${app.port}/public/${filename}`;
};

const Product = mongoose.model('Products', ProductSchema);

export default Product;
