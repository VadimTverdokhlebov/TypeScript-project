import productsRouter from './productsRouter';
import orderRouter from './orderRouter';
import authRouter from './authRouter';

export default function indexRouter() {
    return [ productsRouter, orderRouter, authRouter ];
}