import { PRODUCT_RECEIVED } from '../constants/actionTypes.js';

export function productReceived(productData) {
    return {
        type: PRODUCT_RECEIVED,
        productData
    }
}