import { ProductInCart } from '../../types';
import { ModalService } from './ModalService';

export class CartService {
  addInCart(event: Event) {
    const modalService = new ModalService();
    const product = (event?.target as HTMLElement).closest('.product');
    const productTitle = product?.querySelector('.product__title') as HTMLElement;
    const productPrice = product?.querySelector('.price') as HTMLElement;
    const productBtn = (event?.target as HTMLElement).closest('.product__btn');

    if (product && productBtn) {
      let cart: ProductInCart[] = [];
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        cart = JSON.parse(localCart);
      }

      let totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);

      if (totalQty >= 10 && !productBtn.classList.contains('active')) {
        modalService.showWarning();
      } else {
        productBtn.classList.toggle('active');
        if (productBtn.classList.contains('active')) {
          productBtn.innerHTML = `В корзине`;
          cart.push({
            name: productTitle.innerText,
            price: productPrice.innerText,
            qty: 1,
          });
        } else {
          productBtn.innerHTML = `В корзину`;
          const ind = cart.findIndex((prod) => prod.name === productTitle.innerText);
          if (ind !== -1) cart.splice(ind, 1);
        }

        totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
        const cartNumber = document.getElementById('cartNumber') as HTMLElement;
        if (cartNumber) {
          cartNumber.innerHTML = totalQty ? String(totalQty) : '';
        }

        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }

  updateTotalQty() {
    let cart: ProductInCart[] = [];
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      cart = JSON.parse(localCart);
    }
    const cartNumber = document.getElementById('cartNumber') as HTMLElement;
    if (cartNumber) {
      const totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
      cartNumber.innerHTML = totalQty ? String(totalQty) : '';
    }
  }
}
