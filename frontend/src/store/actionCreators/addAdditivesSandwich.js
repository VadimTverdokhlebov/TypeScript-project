import { ADD_ADDITIVES_TO_CUSTOM_SANDWICH } from '../constants/actionTypes.js';
import { storageCustomSandwich, storeDataProduct } from '../store.js';

export function addAdditives(additiveId, categoryId) {
    const allAdditives = Object.assign([], storeDataProduct.getState().additives);
    const sandwichAdditives = Object.assign([], storageCustomSandwich.getState().additives);

    const additive = getAdditiveSandwich(additiveId, categoryId, allAdditives);

    let indexAdditive = sandwichAdditives.findIndex(additive => additive._id == additiveId);
    const quantityAdditives = sandwichAdditives.filter(additive => additive.category == categoryId).length;
    
    if (indexAdditive == -1) {
        if (quantityAdditives < 3) {
            if (categoryId === 'breads' || categoryId === 'sizes') {

                indexAdditive = sandwichAdditives.findIndex(additive => additive.category == categoryId);

                sandwichAdditives.splice(indexAdditive, 1);
                sandwichAdditives.push(additive);

            } else {
                sandwichAdditives.push(additive);
            }
        }

    } else {
        if (categoryId !== 'breads' && categoryId !== 'sizes') {
            sandwichAdditives.splice(indexAdditive, 1);
        }
    }

    return {
        type: ADD_ADDITIVES_TO_CUSTOM_SANDWICH,
        additives: sandwichAdditives
    };
}

function getAdditiveSandwich(additiveId, categoryId, additives) {
    for (let additive of additives) {
        if (categoryId == additive.category && additive._id == additiveId) {
            return additive;
        }
    }

    return false;
}
