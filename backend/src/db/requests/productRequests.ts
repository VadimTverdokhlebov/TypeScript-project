import Product from '../models/product';
import Additive from '../models/additive';

export function getProducts() {
  return Product.find().all('products', []);
}

export function getAdditives() {
  return Additive.find().all('additives', []);
}

export function getSelectedAdditives(additivesId: string[]) {
  return Additive.find({ _id: { $in: additivesId } });
}

export function getSelectedProducts(productsId: string[]) {
  return Product.find({ _id: { $in: productsId } });
}

export function getSearchProducts(searchValue: string, category: string) {
  const regexp = new RegExp(searchValue, 'i');

  return Product.find({ name: regexp, category });
}
