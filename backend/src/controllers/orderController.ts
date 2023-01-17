import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { getSelectedProducts, getSelectedAdditives } from '../db/requests/productRequests';
import { createOrder } from '../db/requests/orderRequests';
import Order from '../db/models/order';
import { getFilledOrder, getIdProductsAndAdditives } from '../bisness/services/orderService';
import ApiError from '../exception/apiError';
import { IProductsFromClient, ICustomRequest } from '../bisness/entities/interfaces';

export default class OrderController {
  static async addOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as unknown as ICustomRequest).user.id;
      const products: IProductsFromClient[]  = req.body;
      const [productsId, additivesId] = getIdProductsAndAdditives(products);

      const [productsOrder, additivesOrder] = await Promise.all([
        getSelectedProducts(productsId),
        getSelectedAdditives(additivesId)]);

      const order = getFilledOrder(products, userId, productsOrder, additivesOrder);
      const orderCreated = await createOrder(order);

      if (!orderCreated) {
        throw ApiError.badRequest('The order not added!');
      }

      return res.json({ order: orderCreated });
    } catch (e) {
      return next(e);
    }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as unknown as ICustomRequest).user.id;
      const limit = Number((req as unknown as ICustomRequest).query.limit || 1);
      const page = Number((req as unknown as ICustomRequest).query.page || 1);

      const query = { user: userId };

      const options: mongoose.PaginateOptions = {
        populate: 'products.product products.additives.additive',
        page,
        limit,
      };

      const orders = await Order.paginate(query, options);

      const sumAllOrders = orders.docs.reduce((sum: number, current) => sum + current.sumOrder, 0);

      if (!orders) {
        throw ApiError.badRequest('Failed to load order list!');
      }
      return res.json({ orders, sumAllOrders });
    } catch (e) {
      return next(e);
    }
  }
}
