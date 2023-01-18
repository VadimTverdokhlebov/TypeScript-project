import './style/main.css';
import './index.html';
import './components/modalWindow.js';
import './components/productBasket.js';
import './components/mainMenu.js';
import { productReceived } from './store/actionCreators/productReceived.js';
import ProductsSelectedCategory from './components/productsSelectedCategory.js';
import { storeDataProduct } from './store/store.js';
import { getDataProduct } from './api/getDataProduct.js';

main();

function main() {

    uploadDataProductToStore();

    showProductCards();

}

function showProductCards() {
    storeDataProduct.subscribe(() => {
        const defaultCategory = 'sandwiches';
        new ProductsSelectedCategory(defaultCategory);
    });
}

async function uploadDataProductToStore() {

    const dataProduct = await getDataProduct();

    storeDataProduct.dispatch(productReceived(dataProduct));
}