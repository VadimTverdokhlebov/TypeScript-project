import Product from '../models/products';
import Additive from '../models/additive';

export function getProducts() {
  return Product.find().all('products', []);
}

export function getAdditives() {
  return Additive.find().all('additives', []);
}

export function getFoundProducts(regexp: RegExp, category: string) {
  return Product.find({ name: regexp, category });
}
