import {type Model} from 'mongoose';

declare global {
  interface IProduct {
    name: string;
    size: string;
    unitaryPrice: number;
    description: string;
    imgUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
  }

  interface IProductMethods {
    setImgUrl: (filename: string) => void;
  }

  type ProductModel = Model<IProduct, Record<string, never>, IProductMethods>;
}
