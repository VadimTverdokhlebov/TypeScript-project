import { storageBasket } from '../store/store.js';
import { deleteProduct } from '../store/actionCreators/deleteProduct.js';

export default class ProductBasket extends HTMLElement {
    constructor() {
        super();
        this.basket = storageBasket.getState();
        this.render();

        storageBasket.subscribe(() => {
            this.basket = storageBasket.getState();
            this.render();
        });

    }

    render() {

        let sumOrder = 0;

        let html = /*html*/`
            <div id="basket">
            <div id="basketHead">
                <img id="basketIcon" src="http://localhost:3000/templates/basket.png">
                <p id="basketName">Корзина</p>
            </div>
            <div id="basketTitle">
                <p>Названиe</p>
                <p>Количество</p>
            </div>
            <div id="basketContainer">`

        for (let product of this.basket) {

            sumOrder += product.price * product.quantity;

            html += /*html*/`
                <div class="basketProduct" id="positionProductInBasket${product.id}">

                <button type="button"  class="buttonRemove" id="idProductInBasket${product.id}">
                    <img src="http://localhost:3000/templates/closeButton.png" class="buttonDelete"/>
                </button>
                
                <p>${product.name}</p>
                
                <p>${product.quantity}</p>

            </div>`;
        }

        html += /*html*/`
            </div>
                <div id="basketOrder">
                    <div id="basketTotal">
                        <p>СУММА: ${sumOrder} РУБ.</p>
                    </div>

                    <form>
                        <input class="basketBottonOrder" type="submit" value="ОФОРМИТЬ ЗАКАЗ">
                    </form>

                </div>
            </div>`;

        this.innerHTML = html;

        this.buttonDeleteProductAddEventListener();
    }

    buttonDeleteProductAddEventListener() {

        let buttons = this.querySelectorAll(`.buttonRemove`);

        for (let button of buttons) {

            button.addEventListener('click', () => {

                const productId = parseInt(button.id.match(/\d+/));
                storageBasket.dispatch(deleteProduct(productId));
            })
        }
    }
}

customElements.define("product-basket", ProductBasket);
