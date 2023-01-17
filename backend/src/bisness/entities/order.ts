import mongoose from 'mongoose';

export interface IOrderAdditive {
  additive: mongoose.Types.ObjectId;
}

export interface IOrderProduct {
  product: mongoose.Types.ObjectId;
  sum: number;
  quantity: number;
  additives: Array<IOrderAdditive>;
}

export interface IOrder {
  user: mongoose.Types.ObjectId;
  products: Array<IOrderProduct>;
  status: boolean;
  sumOrder: number;
}

export interface IOrderPaginationRequest extends Request {
  user: {
    id: string;
  };
  query: {
    limit: string;
    page: string;
  };
}

interface IAdditiveFromClient {
  additive: mongoose.Types.ObjectId;
}

export interface IProductsFromClient extends mongoose.Document {
  amount: number;
  product: mongoose.Types.ObjectId;
  quantity: number;
  additives: Array<IAdditiveFromClient>;
}
