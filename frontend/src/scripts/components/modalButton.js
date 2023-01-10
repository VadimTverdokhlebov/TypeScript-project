import { storageStateModal } from '../store/store.js';
import { changeCategoryModal } from '../store/actionCreators/changeCategoryModal.js';

export default class ModalButton extends HTMLElement{

    constructor() {
        super();
        this.stateModal = storageStateModal.getState();
        this.render();
        this.buttonsCategoryAddEventListener()
    }

    render() {
        let html = '';

        if (this.stateModal.selectCategory != 'sandwichDone') {
            html += '<button class="display: none" id="forwardButton">Вперед > > </button>';
        }

        if (this.stateModal.selectCategory  != 'size') {
            html += '<button id="backButton"> < < Назад</button>';
        }

        this.innerHTML = html;
    }

    buttonsCategoryAddEventListener() {

        if (this.stateModal.selectCategory != 'sandwichDone') {
            this.querySelector('#forwardButton')
                .addEventListener("click", () => this.setNavigateButton(1));
        }

        if (this.stateModal.selectCategory  != 'size') {
            this.querySelector('#backButton')
                .addEventListener("click", () => this.setNavigateButton(-1));
        }
    }

    setNavigateButton(step){
        const index = this.stateModal.categoriesMenu.findIndex(category => 
            category.id == this.stateModal.selectCategory);

        const category = this.stateModal.categoriesMenu[index + step];
        storageStateModal.dispatch(changeCategoryModal(category.id));
    }
}

customElements.define("modal-button", ModalButton );
