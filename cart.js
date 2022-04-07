'use strict';

const itemsEl = document.querySelector('.featuredItems');

class Cart {
    static iconEl = document.querySelector('.cartIconWrap');
    static iconCounterEl = document.querySelector('.cartIconWrap span');
    static mainEl = document.querySelector('.basket');
    static totalEl = document.querySelector('.basketTotal');
    static totalValEl = document.querySelector('.basketTotalValue');

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
        Cart.totalEl.insertAdjacentHTML("beforebegin", newRow);
    }

    #renderProduct(id) {
        Cart.iconCounterEl.textContent = cart.totalCount.toString();
        Cart.totalValEl.textContent = this.totalPrice.toFixed(2);
        const cartRowEl = Cart.mainEl.querySelector(`.basketRow[data-id="${id}"]`);
        if (!cartRowEl) {
            this.#renderNewProduct(id);
            return;
        }
        cartRowEl.querySelector('.productCount').textContent =
            this.items[id].count;
        cartRowEl.querySelector('.productTotalRow').textContent =
            (this.items[id].price * this.items[id].count).toFixed(2);
    }

    toggleView() {
        Cart.mainEl.classList.toggle('hidden');
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

const cart = new Cart();

/*
Показать/скрыть корзину
*/
Cart.iconEl.addEventListener('click', () => {
    cart.toggleView();
});

/*
Добавить элемент в корзину
*/
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
