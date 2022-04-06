'use strict';

const cartIconEl = document.querySelector('.cartIconWrap');
const cartIconCounterEl = document.querySelector('.cartIconWrap span');
const cartEl = document.querySelector('.basket');
const itemsEl = document.querySelector('.featuredItems');
const cartTotalEl = document.querySelector('.basketTotal');
const cartTotalValEl = document.querySelector('.basketTotalValue');

/*
Показать/скрыть корзину
*/
cartIconEl.addEventListener('click', () => {
    cartEl.classList.toggle('hidden');
});

class Cart {
    constructor() {
        this.items = {};
        this.totalCount = 0;
        this.totalPrice = 0;
    }

    #renderNewProduct(id) {
        const newRow = `
            <div class="basketRow" data-id="${id}">
                <div>${this.items[id].name}</div>
                <div>
                    <span class="productCount">${this.items[id].count}</span> шт.
                </div>
                <div>${this.items[id].price}</div>
                <div>
                    <span class="productTotalRow">
                        $${(this.items[id].price * this.items[id].count).toFixed(2)}
                    </span>
                </div>
            </div>
        `;
        cartTotalEl.insertAdjacentHTML("beforebegin", newRow);
    }

    #renderProduct(id) {
        cartIconCounterEl.textContent = cart.totalCount.toString();
        cartTotalValEl.textContent = this.totalPrice.toFixed(2);
        const cartRowEl = cartEl.querySelector(`.basketRow[data-id="${id}"]`);
        if (!cartRowEl) {
            this.#renderNewProduct(id);
            return;
        }
        cartRowEl.querySelector('.productCount').textContent =
            this.items[id].count;
        cartRowEl.querySelector('.productTotalRow').textContent =
            (this.items[id].price * this.items[id].count).toFixed(2);
    }


    add(id, name, price) {
        if (!(id in this.items)) {
            this.items[id] = { id: id, name: name, price: price, count: 0 };
        }
        this.items[id].count++;
        this.totalCount++;
        this.totalPrice += price;
        this.#renderProduct(id);
    }
}


const cart = new Cart;

itemsEl.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    const itemEl = event.target.closest('.featuredItem');
    const id = +itemEl.dataset.id;
    const name = itemEl.dataset.name;
    const price = +itemEl.dataset.price;
    cart.add(id, name, price);
});