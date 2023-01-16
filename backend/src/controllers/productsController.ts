import { getAdditives, getProducts, getSearchProducts } from '../db/requests/productRequests';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../excaptions/apiError';

interface ICustomRequest extends Request {
  query: {
    searchValue: string;
    category: string;
  };
}

export async function getProduct(req: Request, res: Response) {

  const [menu, additives] = await Promise.all([getProducts(), getAdditives()]);
  const products = { menu, additives };

  return res.json(products);
}

export async function getResultSearch(req: Request, res: Response, next: NextFunction) {
  try {
    const { searchValue, category } = (req as ICustomRequest).query;
    const foundProducts = await getSearchProducts(searchValue, category);

    if (foundProducts.length === 0) {
      throw ApiError.badRequest('The product not found');
    }

    return res.json(foundProducts);
  } catch (e) {
    return next(e)
  }
}
