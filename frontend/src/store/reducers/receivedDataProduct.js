import { PRODUCT_RECEIVED } from '../constants/actionTypes.js';

const initialState = {};

export function receivedDataProduct(state = initialState.productData, action) {
    switch (action.type) {
        case PRODUCT_RECEIVED:

            return action.productData;

        default: return state;
    }
}