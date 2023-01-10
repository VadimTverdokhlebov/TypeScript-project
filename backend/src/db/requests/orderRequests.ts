import Order from '../models/order';

export async function createOrder(dataOrder: any) {
  const order = new Order(dataOrder);

  await order.save();
}

export async function getUserOrders(userId: string) {
  const orders = await Order.find({ user: userId })
    .populate('products.product').populate('products.additives.additive');

  return orders;
}
