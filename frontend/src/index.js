import './style/main.css';
import './index.html';
import './scripts/components/modalWindow.js';
import './scripts/components/productBasket.js';
import './scripts/components/mainMenu.js';
import { productReceived } from './scripts/store/actionCreators/productReceived.js';
import ProductsSelectedCategory from './scripts/components/productsSelectedCategory.js';
import { storeDataProduct } from './scripts/store/store.js';
import { getDataProduct } from './scripts/api/getDataProduct.js';

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