import mongoose from 'mongoose';

export interface ISearchProductsRequest extends Request {
  user: {
    id: string;
  };
  query: {
    searchValue: string;
    category: string;
  };
}

export interface IProduct extends mongoose.Document {
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  market: string;
}
