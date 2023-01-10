import {
    PRODUCT_ADD,
    PRODUCT_SET_QUANTITY,
    DELETE_PRODUCT,
    ADD_CUSTOM_SANDWICH_TO_BASKET
} from '../constants/actionTypes.js';

const initialState = [];

export function changingProductsToBasket(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_ADD:

            return [
                ...state,
                action.product
            ];

        case PRODUCT_SET_QUANTITY:
            let cloneState = [];

            for (let elem of state) {
                if (elem.id != action.product.id) {
                    cloneState.push(elem);
                } else {
                    cloneState.push(action.product);
                }
            }
            return cloneState;

        case DELETE_PRODUCT:

            return action.product;

        case ADD_CUSTOM_SANDWICH_TO_BASKET:

            return [
                ...state,
                action.product
            ];

        default: return state;
    }
}
