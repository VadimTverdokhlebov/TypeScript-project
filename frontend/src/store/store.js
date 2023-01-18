import { createStore } from 'redux';
import { changingProductsToBasket } from './reducers/changingProductsToBasket.js';
import { receivedDataProduct } from './reducers/receivedDataProduct.js';
import { manageModalWindow } from './reducers/manageModalWindow.js';
import { createCustomSandwich } from './reducers/createCustomSandwich.js';

const storageBasket = createStore(changingProductsToBasket);
const storeDataProduct = createStore(receivedDataProduct);
const storageStateModal = createStore(manageModalWindow);
const storageCustomSandwich = createStore(createCustomSandwich);


export { storageBasket, storeDataProduct, storageStateModal, storageCustomSandwich };
