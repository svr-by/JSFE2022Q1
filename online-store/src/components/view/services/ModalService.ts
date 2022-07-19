import { ProductInCart } from '../../types';

export class ModalService {
  private showModal(message: string) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
    <div class="modal__wrapper">
        <div class="modal__desc">
            ${message}
        </div>
        <button class='btn__remove'>✖</button>
    </div>
    `;

    document.body.append(modal);
    modal.addEventListener('click', this.removeModal);
    document.body.classList.add('noscroll');
  }

  private removeModal(event: Event) {
    if (
      (event.target as HTMLElement).classList.contains('btn__remove') ||
      (event.target as HTMLElement).classList.value === 'modal'
    ) {
      const modal = document.querySelector('.modal');
      if (modal !== null) {
        modal.remove();
        document.body.classList.remove('noscroll');
      }
    }
  }

  showCart() {
    let message;

    let cart: ProductInCart[] = [];
    const localCart = localStorage.getItem('cart');
    if (localCart !== null) {
      cart = JSON.parse(localCart);
    }

    const totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
    if (totalQty === 0) {
      message = `<h3 class="modal__title">Корзина пуста</h3>`;
    } else {
      message = `
        <h3 class="modal__title">Корзина</h3>
        <table class = "modal__table">
          <thead class="table__head">
            <tr>
              <th>Товар</th>
              <th>Цена</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody class = "table__body">
      `;
      let tableBody = '';
      let cartQty = 0;
      cart.forEach((product) => {
        const productRow = `
        <tr>
          <th class="prod__name">${product.name}</th>
          <th class="prod__price">${product.price}</th>
          <th class="prod__qty">${product.qty}</th>
        </tr>
        `;
        tableBody += productRow;
        cartQty += product.qty;
      });
      const cartTotalQty = `
        <tr>
          <th class="prod__name">ИТОГО:</th>
          <th class="prod__price"></th>
          <th class="prod__qty">${cartQty}</th>
        </tr>
        `;
      message = message + tableBody + cartTotalQty + '</tbody></table>';
    }
    this.showModal(message);
  }

  showWarning() {
    const message = `<h3 class="modal__title">Извините, максимум 10 товаров</h3>`;
    this.showModal(message);
  }
}
