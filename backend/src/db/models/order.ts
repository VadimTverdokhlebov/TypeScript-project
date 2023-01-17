import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IOrder } from '../../bisness/entities/order';

const { Schema } = mongoose;

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
