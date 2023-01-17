import mongoose from 'mongoose';

interface IAdditive {
    additive: mongoose.Types.ObjectId;
}

export interface IProductsFromClient extends mongoose.Document {
    amount: number;
    product: mongoose.Types.ObjectId;
    quantity: number;
    additives: Array<IAdditive>;
}

export interface ICustomRequest extends Request {
    user: {
        id: string;
    };
    query: {
        searchValue: string;
        category: string;
        limit: string;
        page: string;
    };
}

