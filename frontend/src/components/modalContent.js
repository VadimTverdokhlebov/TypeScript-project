import { storageStateModal, storeDataProduct, storageCustomSandwich } from '../store/store.js';
import ModalProductCard from './modalProductCard.js';
import './modalOrder.js';


export default class ModalContent extends HTMLElement {

    constructor() {
        super();
        this.stateModal = storageStateModal.getState();
        this.additives = storeDataProduct.getState().additives;
        this.render();

        storageCustomSandwich.subscribe(() => {
            this.activity = storageStateModal.getState().activity;
            if (this.activity) {
                this.render();
            }
        })
    }

    render() {

        if (this.stateModal.selectCategory != 'sandwichDone') {

            this.innerHTML = /*html*/`<div id="productContainer"></div>`;
            
            const root = productContainer;

            for (let additive of this.additives) {
                if (this.stateModal.selectCategory == additive.category && productContainer) {
                    new ModalProductCard(additive, root);
                }
            }
        } else {

            this.innerHTML = /*html*/`
                <div id="productContainer">
                    <modal-order></modal-order>
                </div>`;
        }
    }
}

customElements.define("modal-content", ModalContent);
