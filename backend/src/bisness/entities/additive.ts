import mongoose from 'mongoose';

export interface IAdditive extends mongoose.Document {
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}
