import { Product } from "../../types";
import { ProductLayouts } from "./ProductLayouts/ProductLayouts";
import { FilterLayouts } from "./FilterLayouts/FilterLayouts";

export class Layouts {
  productLayouts: ProductLayouts = new ProductLayouts();
  filterLayouts: FilterLayouts = new FilterLayouts();

  renderCatalog(data: Product[]) {
    const page = document.querySelector(".catalog") as HTMLElement;
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

    const filter = document.querySelector(".filter") as HTMLElement;
    filter.append(...this.filterLayouts.renderFilters(data));
  }

  updateProducts(data: Product[]) {
    const productList = document.querySelector(".product-list") as HTMLElement;
    productList.innerHTML = "";

    if (data.length === 0) {
      productList.innerHTML = "Извините, совпадений не обнаружено";
      return;
    }
    productList.append(...this.productLayouts.renderProducts(data));
  }
}
