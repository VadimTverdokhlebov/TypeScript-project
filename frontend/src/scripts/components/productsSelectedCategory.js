import pubSub from '../PubSub.js';
import ProductCard from './productCard.js';
import { storeDataProduct } from '../store/store.js';

export default class ProductsSelectedCategory {

    categoryMenu;
    
    constructor(categoryMenu) {
        this.menu = storeDataProduct.getState().menu;
        this.categoryMenu = categoryMenu;
        this.subscribeToCategoryChanges();
        this.render();
    }

    render() {

        content.remove();

        const innerDiv = document.createElement('div');
        
        innerDiv.id = "content";
        
        sidebar.after(innerDiv);
        
        const root = content;

        for (let elementMenu of this.menu) {
            if (elementMenu.category === this.categoryMenu) {
               new ProductCard(root, elementMenu);
            }
        }
    }

    subscribeToCategoryChanges() {
        pubSub.subscribe("changeCategory", category => {
            this.categoryMenu = category;
            this.render();
        });
    }
}
