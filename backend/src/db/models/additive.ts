import mongoose from 'mongoose';
import { IAdditive } from '../../bisness/entities/modelsInterfaces';

const { Schema } = mongoose;

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
