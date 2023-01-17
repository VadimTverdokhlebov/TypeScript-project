import { IOrder } from '../../bisness/entities/modelsInterfaces';
import Order from '../models/order';

export function createOrder(dataOrder: IOrder) {
  return Order.create(dataOrder);
}

export function getUserOrders(userId: string) {
  return Order.find({ user: userId })
    .populate('products.product').populate('products.additives.additive');;
}
