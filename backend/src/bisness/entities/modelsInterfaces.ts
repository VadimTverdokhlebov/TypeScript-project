import mongoose from 'mongoose';

export interface IOrderAdditive {
    additive: mongoose.Types.ObjectId;
}

export interface IOrderProduct {
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

export interface IAdditive extends mongoose.Document {
    name: string;
    image: string;
    description: string;
    price: number;
    category: string;
}

export interface IProduct extends mongoose.Document {
    name: string;
    image: string;
    description: string;
    price: number;
    category: string;
    market: string;
}

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
}