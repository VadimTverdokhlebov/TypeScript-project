import { SET_QUANTITY_CUSTOM_SANDWICH } from '../constants/actionTypes.js';
import { storageCustomSandwich } from '../store.js';

export function setQuantityCustomSandwich(step) {

    let quantity = storageCustomSandwich.getState().quantity + step;

    if (quantity => 1 && quantity <= 10) {
        return {
            type: SET_QUANTITY_CUSTOM_SANDWICH,
            quantity
        };
    } 
    
    else {

        quantity = storageCustomSandwich.getState().quantity;

        return {
            type: SET_QUANTITY_CUSTOM_SANDWICH,
            quantity
        };
    }
}
