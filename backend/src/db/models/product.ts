import mongoose from 'mongoose';
import { IProduct } from '../../bisness/entities/product';

const { Schema } = mongoose;

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
