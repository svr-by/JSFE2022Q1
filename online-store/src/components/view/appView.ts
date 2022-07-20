import { Product, ActiveElements, FilterOptions } from '../types';
import { Layouts } from './layouts/layouts';
import { Services } from './services/Services';
import * as noUiSlider from 'nouislider';

export class AppView {
  elements: Partial<ActiveElements> = {};
  layouts = new Layouts();
  services = new Services();

  createCatalog(data: Product[]) {
    this.layouts.renderCatalog(data);
    this.init(data);
    this.getLocalParams();
    this.addHandlers(data);
    this.updateProducts(data);
  }

  private init(data: Product[]) {
    this.elements.priceSlider = document.getElementById('priceRange') as HTMLElement;
    const priceMin = document.getElementById('priceMin') as HTMLInputElement;
    const priceMax = document.getElementById('priceMax') as HTMLInputElement;
    this.elements.priceInputs = [priceMin, priceMax];
    this.elements.stockSlider = document.getElementById('stockRange') as HTMLElement;
    const stockMin = document.getElementById('stockMin') as HTMLInputElement;
    const stockMax = document.getElementById('stockMax') as HTMLInputElement;
    this.elements.stockInputs = [stockMin, stockMax];
    this.services.rangeSliderInit.init(data, 'price', this.elements.priceSlider, this.elements.priceInputs);
    this.services.rangeSliderInit.init(data, 'stock', this.elements.stockSlider, this.elements.stockInputs);
    this.elements.search = document.querySelector('.f-box__search') as HTMLInputElement;
    this.elements.search.focus();
    this.elements.sort = document.querySelector('.sorting__select') as HTMLSelectElement;
    this.elements.checkboxes = document.querySelectorAll('.f-box__checkbox');
  }

  private addHandlers(data: Product[]) {
    (this.elements.priceSlider as noUiSlider.target).noUiSlider?.on('change', () => this.updateProducts(data));
    (this.elements.stockSlider as noUiSlider.target).noUiSlider?.on('change', () => this.updateProducts(data));
    (this.elements.search as HTMLInputElement).addEventListener('input', () => this.updateProducts(data));
    (this.elements.sort as HTMLSelectElement).addEventListener('change', () => this.updateProducts(data));
    const filter = document.querySelector('.filter') as HTMLSelectElement;
    const inputs = filter.querySelectorAll('input:not(.f-box__search)');
    inputs.forEach((input) => input.addEventListener('change', () => this.updateProducts(data)));
    const resetFiltersBtn = document.getElementById('resetFilters') as HTMLInputElement;
    resetFiltersBtn.addEventListener('click', () => this.resetFilters(data));
    const resetParamsBtn = document.getElementById('resetParams') as HTMLInputElement;
    resetParamsBtn.addEventListener('click', () => this.resetParams(data));
    const cartBtn = document.querySelector('.cart') as HTMLElement;
    cartBtn.addEventListener('click', () => this.services.modalService.showCart());
  }

  private updateProducts(products: Product[]) {
    const searchedProducts = this.services.searchService.search(products, this.elements.search);
    const filteredProducts = this.services.filterService.filter(searchedProducts, this.elements);
    const sortedProducts = this.services.sortService.sort(filteredProducts, this.elements.sort);
    this.layouts.renderProducts(sortedProducts);
  }

  private getLocalParams() {
    if (this.elements.search) this.elements.search.value = localStorage.getItem('searchValue') || '';
    if (this.elements.sort) this.elements.sort.value = localStorage.getItem('sortOption') || 'default';

    const storageOptions = localStorage.getItem('filterOptions');
    const filterOptions: FilterOptions = storageOptions ? JSON.parse(storageOptions) : null;
    if (filterOptions) {
      const props = Object.keys(filterOptions);
      if (this.elements.priceInputs && this.elements.priceSlider) {
        const minValue = (filterOptions.price as string[])[0];
        const maxValue = (filterOptions.price as string[])[1];
        (this.elements.priceSlider as noUiSlider.target).noUiSlider?.set([minValue, maxValue]);
      }
      if (this.elements.stockInputs && this.elements.stockSlider) {
        const minValue = (filterOptions.stock as string[])[0];
        const maxValue = (filterOptions.stock as string[])[1];
        (this.elements.stockSlider as noUiSlider.target).noUiSlider?.set([minValue, maxValue]);
      }
      this.elements.checkboxes?.forEach((checkbox) => {
        const checkboxProp = props.find((prop) => checkbox.classList.contains(prop)) as keyof Product;
        if (checkboxProp) {
          const checkboxOption = checkbox.dataset.op as string;
          if ((filterOptions[checkboxProp] as string[]).includes(checkboxOption)) checkbox.checked = true;
        } else if (checkbox.classList.contains('poular')) {
          checkbox.checked = filterOptions.isPopular as boolean;
        }
      });
    }
  }

  private resetFilters(products: Product[]) {
    this.services.resetService.clearFilters(this.elements);
    this.updateProducts(products);
  }

  private resetParams(products: Product[]) {
    this.services.resetService.clearFilters(this.elements);
    this.services.resetService.resetSort(this.elements);
    localStorage.clear();
    this.services.cartService.updateTotalQty();
    this.updateProducts(products);
  }
}
