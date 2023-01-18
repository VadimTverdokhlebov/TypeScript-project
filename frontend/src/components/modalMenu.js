import { storageStateModal } from '../store/store.js';
import { changeCategoryModal } from '../store/actionCreators/changeCategoryModal.js';

export default class ModalMenu extends HTMLElement {


    constructor() {
        super();
        this.stateModal = storageStateModal.getState();
        this.render();
        this.categoryAddEventListener();
    }

    render() {

        let html = '';

        for (let category of this.stateModal.categoriesMenu) {
            if (this.stateModal.selectCategory === category.id) {
                html += `<li  class="categoryMenuModal selectedCategoryMenuModal" id="${category.id}">
                            <p class="textMenuModal">${category.name}</p>
                        </li>`;
            } else {
                html += `<li  class="categoryMenuModal" id="${category.id}">
                            <p class="textMenuModal">${category.name}</p>
                        </li>`;
            }
        }

        this.innerHTML = html;
    }

    categoryAddEventListener() {
        let categoriesMenu = this.querySelectorAll('.categoryMenuModal');
        for (let category of categoriesMenu) {
            category.addEventListener('click', () => {

                if (category.id != this.stateModal.selectCategory) {

                    for (let key of this.stateModal.categoriesMenu) {
                        if (key.id == category.id) {
                            storageStateModal.dispatch(changeCategoryModal(category.id));
                        }
                    }
                }
            })
        }
    }
}

customElements.define("modal-menu", ModalMenu);
