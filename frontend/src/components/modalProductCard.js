import { storageStateModal, storageCustomSandwich } from '../store/store.js';
import { addAdditives } from '../store/actionCreators/addAdditivesSandwich.js';

export default class ModalProductCard {

    #additive;
    #root;

    constructor(additive, root) {
        this.#additive = additive;
        this.#root = root;

        this.innerDiv = document.createElement('div');
        this.innerDiv.id = `#innerDiv${this.#additive._id}`;

        this.#root.prepend(this.innerDiv);

        this.stateModal = storageStateModal.getState();
        this.render();

    }

    render() {

        let selectedAditive = '';

        if (this.checkAdditivesSandwich()) {
            selectedAditive = 'style="background-color: rgb(46 155 19 / 85%);"';
        }

        let html = /*html*/`
            <div class="modalProductCard" ${selectedAditive}>
                <div class="modalProductImage">
                    <img src="http://localhost:3000/${this.#additive.image}">
                </div>               
                <p>${this.#additive.name}</p>
                <p>Цена: ${this.#additive.price} руб.</p>
            </div>`;

        this.innerDiv.innerHTML = html;

        this.checkAdditivesSandwich();

        this.innerDiv.addEventListener('click', () => {
            storageCustomSandwich.dispatch(addAdditives(this.#additive._id, this.#additive.category));
        })
    }

    checkAdditivesSandwich() {
        const additivesCustomSandwich = storageCustomSandwich.getState().additives;
        for (let additive of additivesCustomSandwich) {
            if (additive._id == this.#additive._id) {
                return true;
            }
        }
        return false;
    }
}

