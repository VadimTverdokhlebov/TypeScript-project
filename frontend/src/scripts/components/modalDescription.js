import { storageStateModal } from '../store/store.js';

export default class ModalDescription extends HTMLElement{

    constructor() {
        super();
        this.stateModal = storageStateModal.getState();
        this.render();
    }

    render() {

        let html = `<p class="descriptionCategoryMenuModal">${this.stateModal.description}</p>`;
        this.innerHTML = html;
    }
}

customElements.define("modal-description", ModalDescription );
