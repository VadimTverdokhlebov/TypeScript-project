import {
    ADD_ADDITIVES_TO_CUSTOM_SANDWICH,
    SET_QUANTITY_CUSTOM_SANDWICH,
    ADD_SELECTED_SANDWICH,
    REMOVE_CUSTOM_SANDWICH
} from '../constants/actionTypes.js';

const initialState = {
    id: '',
    name: '',
    price: '',
    image: '',
    quantity: 1,
    additives: [
        {
            _id: "639c7d92bc461129b75fa53e",
            category: "sizes",
            name: "15 См",
            price: 0,
        },
        {
            _id: "639c7d92bc461129b75fa542",
            category: "breads",
            name: "Белый итальянский",
            price: 0,
        }]
}

export function createCustomSandwich(state = initialState, action) {
    switch (action.type) {
        case ADD_SELECTED_SANDWICH:

            return {
                ...state,
                id: action.product.id,
                name: action.product.name,
                price: action.product.price,
                image: action.product.image,
                quantity: action.product.quantity
            };

        case ADD_ADDITIVES_TO_CUSTOM_SANDWICH:

            return {
                ...state,
                additives: action.additives
            };

        case SET_QUANTITY_CUSTOM_SANDWICH:

            return {
                ...state,
                quantity: action.quantity
            };

        case REMOVE_CUSTOM_SANDWICH:

            return initialState;

        default: return state;
    }
}