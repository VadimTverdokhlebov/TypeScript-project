import { CHANGE_CATEGORY_MODAL } from '../constants/actionTypes.js';
import { storageStateModal } from '../store.js';

export function changeCategoryModal(categoryId) {

    const categoriesMenu = storageStateModal.getState().categoriesMenu;
    const category = categoriesMenu.find(category => categoryId == category.id);
    const selectCategory = category.id;
    const description = category.description;

    return {
        type: CHANGE_CATEGORY_MODAL,
        selectCategory,
        description,
    };
}