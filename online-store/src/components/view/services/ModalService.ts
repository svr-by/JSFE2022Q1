import { ProductInCart } from '../../types';

export class ModalService {
  showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    let cart: ProductInCart[] = [];
    const localCart = localStorage.getItem('cart');
    if (localCart !== null) {
      cart = JSON.parse(localCart);
    }

    const totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
    if (totalQty === 0) {
      modal.innerHTML = `
      <div class="modal__wrapper">
          <div class="modal__desc">
              <h3 class="modal__title">Корзина пуста</h3>
          </div>
          <button class='btn__remove'>✖</button>
      </div>
      `;
    } else {
      modal.innerHTML = `
      <div class="modal__wrapper">
          <div class="modal__desc">
              <h3 class="modal__title">Корзина</h3>
              <table class = "modal__table">
                <thead class="table__head">
                  <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Количество</th>
                  </tr>
                </thead>
                <tbody class = "table__body"></tbody>
              </table>
          </div>
          <button class='btn__remove'>✖</button>
      </div>
      `;
      const tableBody = modal.querySelector('.table__body');
      cart.forEach((product) => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
          <th class="prod__name">${product.name}</th>
          <th class="prod__price">${product.price}</th>
          <th class="prod__qty">${product.qty}</th>
        `;
        tableBody?.append(productRow);
      });
    }
    document.body.append(modal);
    modal.addEventListener('click', this.removeModal);
    document.body.classList.add('noscroll');
  }

  removeModal(event: Event) {
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
}
