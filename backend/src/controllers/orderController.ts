import mongoose from 'mongoose';
import { getProducts, getAdditives } from '../db/requests/productRequests';
import { createOrder } from '../db/requests/orderRequests';
import Order from '../db/models/order';
import { IProduct } from '../db/models/products';
import { IAdditive } from '../db/models/additive';
import { IOrder } from '../db/models/order'

export default class OrderController {
  static async addOrder(req: any, res: any) {
    try {
      const userId = req.user.id;
      const { products } = req.body;
      const menu = await getProducts();
      const allAdditives = await getAdditives();
      let indexProductOrder = 0;

      const order: IOrder = {
        user: new mongoose.Types.ObjectId(userId),
        products: [],
        status: true,
        sumOrder: 0,
      };

      for (const product of products) {
        const currentProduct = menu.find((elem) => elem.id === product.id) as IProduct;

        order.sumOrder += Number(product.amount) * Number(currentProduct.price);

        const insertProduct = {
          product: new mongoose.Types.ObjectId(product.id),
          quantity: product.amount,
          sum: currentProduct.price,
          additives: [],
        };

        order.products.push(insertProduct);

        for (const additiveId of product.additives) {
          const currentAdditive = allAdditives.find((elem) => elem.id === additiveId) as IAdditive;

          order.sumOrder += Number(product.amount) * Number(currentAdditive.price);
          order.products[indexProductOrder].sum += Number(currentAdditive.price);

          order.products[indexProductOrder].additives.push({
            additive: new mongoose.Types.ObjectId(additiveId),
          });
        }

        indexProductOrder += 1;
      }

      await createOrder(order);

      return res.json({ message: 'The order added', order });
    } catch (e) {
      console.log(e);
      return res.json({ message: 'The order not added' });
    }
  }

  static async getOrders(req: any, res: any) {
    try {
      const userId = req.user.id;
      const limit = req.query.limit || 1;
      const page = req.query.page || 1;

      const query = { user: userId };

      const options: mongoose.PaginateOptions = {
        populate: 'products.product products.additives.additive',
        page,
        limit,
      };

      const orders = await Order.paginate(query, options);

      const sumAllOrders = orders.docs.reduce((sum: any, current: any) => sum + current.sumOrder, 0);

      return res.json({ orders, sumAllOrders });
    } catch (e) {
      return res.json({ message: 'Failed to load order list' });
    }
  }
}
