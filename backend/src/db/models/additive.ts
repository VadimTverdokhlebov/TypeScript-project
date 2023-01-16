import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IAdditive extends mongoose.Document{
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const additiveSchema = new Schema<IAdditive>({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  category: {
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

});

export default mongoose.model<IAdditive>('Additive', additiveSchema);
