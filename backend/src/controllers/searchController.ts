import { getFoundProducts } from '../db/requests/productRequests';

export default async function getResultSearch(req: any, res: any) {
  const { searchValue, category } = req.query;
  const regexp = new RegExp(searchValue, 'i');
  const foundProducts = await getFoundProducts(regexp, category);
  if (foundProducts.length === 0) {
    return res.json({ message: 'The product not found' });
  }
  return res.json({ message: 'The list of search is loaded', foundProducts });
}
