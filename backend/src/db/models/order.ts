import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

export interface IOrderAdditive  {
  additive: mongoose.Types.ObjectId;
} 

export interface IOrderProduct  {
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

interface IOrderDocument extends mongoose.Document, IOrder {}

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    new Schema({
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      additives: [
        new Schema({
          additive: {
            type: Schema.Types.ObjectId,
            ref: 'Additive',
          },
        })],
      quantity: {
        type: Number,
        require: true,
      },
      sum: {
        type: Number,
        require: true,
      },
    })],
  status: {
    type: Boolean,
    require: true,
  },
  sumOrder: {
    type: Number,
    require: true,
  },

}, { timestamps: true });

orderSchema.plugin(paginate);

export default mongoose.model<IOrderDocument, mongoose.PaginateModel<IOrderDocument>>('Order', orderSchema);
