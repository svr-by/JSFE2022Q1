import { ProductInCart } from '../../types';

export class CartService {
  addInCart(event: Event) {
    const product = (event?.target as HTMLElement).closest('.product');
    const productTitle = product?.querySelector('.product__title') as HTMLElement;
    const productPrice = product?.querySelector('.price') as HTMLElement;
    const productBtn = (event?.target as HTMLElement).closest('.product__btn');

    if (product !== null && productBtn !== null) {
      productBtn.classList.toggle('active');
      let cart: ProductInCart[] = [];
      const localCart = localStorage.getItem('cart');
      if (localCart !== null) {
        cart = JSON.parse(localCart);
      }
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

      const cartNumber = document.getElementById('cartNumber') as HTMLElement;
      if (cartNumber !== null) {
        const totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
        cartNumber.innerHTML = totalQty ? String(totalQty) : '';
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  updateTotalQty() {
    let cart: ProductInCart[] = [];
    const localCart = localStorage.getItem('cart');
    if (localCart !== null) {
      cart = JSON.parse(localCart);
    }
    const cartNumber = document.getElementById('cartNumber') as HTMLElement;
    if (cartNumber !== null) {
      const totalQty = cart.reduce((sum, prod) => sum + prod.qty, 0);
      cartNumber.innerHTML = totalQty ? String(totalQty) : '';
    }
  }
}
