import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IProduct {
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  market: string;
}
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  market: {
    type: String,
    require: true,
  },

});

export default mongoose.model<IProduct>('Product', productSchema);
