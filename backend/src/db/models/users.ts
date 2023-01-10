import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IUser {
  _id: string;
  email: string;
  password: string;
}

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
