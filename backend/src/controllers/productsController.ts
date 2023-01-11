import { getAdditives, getProducts, getSearchProducts } from '../db/requests/productRequests';
import { Request, Response } from 'express';

interface IRequest extends Request {
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

export async function getResultSearch(req: IRequest, res: Response) {

  const { searchValue, category } = req.query;
  const foundProducts = await getSearchProducts(searchValue, category);

  if (foundProducts.length === 0) {
    return res.json({ message: 'The product not found' });
  }

  return res.json(foundProducts);
}
