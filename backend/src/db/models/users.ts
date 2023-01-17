import mongoose from 'mongoose';
import { IUser } from '../../bisness/entities/user';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IUser>('User', userSchema);
