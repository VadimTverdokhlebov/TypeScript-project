import pubSub from '../pubSub/PubSub.js';

export default class MainMenu extends HTMLElement {

    #categoriesMenu = [
        {
            id: "pizza",
            name: "Пицца",
        },
        {
            id: "shaurma",
            name: "Шаурма",
        },
        {
            id: "sandwiches",
            name: "Сендвичи",
        },
        {
            id: "burgers",
            name: "Бургеры",
        },
        {
            id: "chicken",
            name: "Курица & Картофель",
        },
        {
            id: "salads",
            name: "Тортилья & Салаты",
        },
        {
            id: "drinks",
            name: "Напитки & Десерты",
        }
    ];

    #state = {
        selectedCategory: 'sandwiches',
    }

    constructor() {
        super();
        this.render();
    }

    render() {
        let html = '<ul class="mainMenu">';
        for (let key of this.#categoriesMenu) {
            if (this.#state.selectedCategory === key.id) {
                html += `<li class="categoryMenu activeElementMenu" id="${key.id}">${key.name}</li>`;
            } else {
                html += `<li class="categoryMenu" id="${key.id}">${key.name}</li>`;
            }
        }

        html += '</ul>';
        this.innerHTML = html;
        this.categoryAddEventListener();

    }

    categoryAddEventListener() {
        let categoriesMenu = document.querySelectorAll('.categoryMenu');
        for (let category of categoriesMenu) {
            category.addEventListener('click', () => {
                if(category.id != this.#state.selectedCategory){
                    this.setCategory(category.id);
                }
            })
        }
    }

    setCategory(categoryId) {
        this.state = {
            ...this.#state,
            selectedCategory: categoryId,
        };
    }

    set state(newState) {
        this.#state = newState;
        this.render();
        pubSub.publish("changeCategory", this.#state.selectedCategory);
    }
}

customElements.define("main-menu", MainMenu);
