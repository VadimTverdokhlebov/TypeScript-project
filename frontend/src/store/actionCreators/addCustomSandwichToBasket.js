import { ADD_CUSTOM_SANDWICH_TO_BASKET } from '../constants/actionTypes.js';
import { storageCustomSandwich } from '../store.js';

export function addCustomSandwichToBasket() {

    const customSandwich = storageCustomSandwich.getState();
    const sum = getSumAdditivesSandwich(customSandwich.additives) + customSandwich.price;
   
    const product = {
        id: new Date().getTime(), 
        price: sum, 
        name: customSandwich.name + ' custom',
        quantity: customSandwich.quantity
    };

    return {
        type: ADD_CUSTOM_SANDWICH_TO_BASKET,
        product
    };
}

function getSumAdditivesSandwich(additives) {
    let result = 0;
    for (let additive of additives) {
        result += additive.price;
    }

    return result;
}

