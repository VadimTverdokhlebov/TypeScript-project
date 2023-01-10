import { DELETE_PRODUCT } from '../constants/actionTypes.js';
import { storageBasket } from '../store.js';

export function deleteProduct(productId) {

    const basket = storageBasket.getState();
    const product = Object.assign([], basket);
    
    const index = product.findIndex(product => product.id == productId);

    product.splice(index, 1);

    return {
        type: DELETE_PRODUCT,
        product
    };
}