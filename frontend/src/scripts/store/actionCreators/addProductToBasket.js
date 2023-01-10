import { PRODUCT_ADD, PRODUCT_SET_QUANTITY } from '../constants/actionTypes.js';
import { storageBasket, storeDataProduct } from '../store.js';

export function addProduct(productId, quantity) {

    const basket = storageBasket.getState();
    const menu = storeDataProduct.getState().menu;

    const productBase = menu.find(product => product._id == productId)
    const currentQuantity = getCurrentQuantityProduct(productId, basket);
    
    const product = {
        id: productBase._id, 
        price: productBase.price, 
        name: productBase.name
    };

    product.quantity = (currentQuantity != false) ? quantity + currentQuantity : quantity;

    if (currentQuantity != false) {

        return {
            type: PRODUCT_SET_QUANTITY,
            product
        };
    }

    return {
        type: PRODUCT_ADD,
        product
    };
}

function getCurrentQuantityProduct(productId, basket) {
    for (let product of basket) {
        if (productId == product.id) {
            return product.quantity;
        }
    }
    return false;
}
