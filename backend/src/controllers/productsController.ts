import { getAdditives, getProducts } from '../db/requests/productRequests';

export default async function getProduct(req: any, res: any) {
  const menu = await getProducts();
  const additives = await getAdditives();

  const products = {
    menu,
    additives,
  };

  return res.json(products);
}
