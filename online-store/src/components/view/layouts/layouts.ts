import { Product, ProductInCart } from '../../types';
import { ProductLayouts } from './ProductLayouts/ProductLayouts';
import { FilterLayouts } from './FilterLayouts/FilterLayouts';
import { CartService } from '../services/CartService';

export class Layouts {
  productLayouts = new ProductLayouts();
  filterLayouts = new FilterLayouts();
  cartService = new CartService();

  renderCatalog(data: Product[]) {
    const page = document.querySelector('.catalog') as HTMLElement;
    page.innerHTML = `
    <div class="wrapper catalog__wrapper">
      <div class="filter"></div>
      <div class="sorting">
      <div class="sorting__name">Сортировка:</div>
        <select id="sortParams" class="sorting__select">
          <option value="default">По умолчанию</option>
          <option value="increasingPrice">Цена, по возрастанию</option>
          <option value="decreasingPrice">Цена, по убыванию</option>
          <option value="increasingStock">Количество, по возрастанию</option>
          <option value="decreasingStock">Количество, по убыванию</option>
          <option value="increasingName">Название, от А до Я</option>
          <option value="decreasingName">Название, от Я до А</option>
        </select>
      </div>
      <div class="product-list"></div>
    </div>
    `;
    this.cartService.updateTotalQty();
    const filter = page.querySelector('.filter') as HTMLElement;
    filter.append(...this.filterLayouts.renderFilters(data));
  }

  renderProducts(data: Product[]) {
    const productList = document.querySelector('.product-list') as HTMLElement;
    productList.innerHTML = '';
    if (data.length === 0) {
      productList.innerHTML = 'Извините, совпадений не обнаружено';
      return;
    }

    let cart: ProductInCart[] = [];
    const localCart = localStorage.getItem('cart');
    if (localCart !== null) {
      cart = JSON.parse(localCart);
    }
    const cartNames = cart.map((prod) => prod.name.toLowerCase());

    data.forEach((productObj) => {
      const cartFlag = cartNames.includes(`${productObj.name}, ${productObj.brand}`.toLowerCase());
      const productElement = this.productLayouts.renderProduct(productObj, cartFlag, this.cartService.addInCart);
      productList.append(productElement);
    });
  }
}
