import { Product } from "../types";
import { Layouts } from "./layouts/layouts";
import { SortService } from "./services/SortService";
import { SearchService } from "./services/SearchService";
import { FilterService } from "./services/FilterService";

export class AppView {
  layouts = new Layouts();
  sortService = new SortService();
  searchService = new SearchService();
  filterService = new FilterService();

  createCatalog(data: Product[]) {
    this.layouts.renderCatalog(data);
    this.filterProducts(data);
    this.addListeners(data);
  }

  addListeners(data: Product[]) {
    const searchInput = document.querySelector(
      ".f-box__search"
    ) as HTMLInputElement;
    searchInput.addEventListener("input", () => this.filterProducts(data));

    const sortSelect = document.querySelector(
      ".sorting__select"
    ) as HTMLSelectElement;
    sortSelect.addEventListener("change", () => this.filterProducts(data));

    const checkboxes = document.querySelectorAll(".f-box__checkbox");
    checkboxes.forEach((checkboxElement) =>
      checkboxElement.addEventListener("change", () =>
        this.filterProducts(data)
      )
    );
  }

  filterProducts(products: Product[]) {
    // let filteredProducts = [...products];

    const searchedValue = (
      document.querySelector(".f-box__search") as HTMLInputElement
    ).value;
    let filteredProducts = this.searchService.search(products, searchedValue);

    // localStorage.setItem("searchInputValue", searchInputValue);
    // if (searchInputValue) {
    //   const targetWords = searchInputValue.trim().toLowerCase().split(/\s+/);
    //   filteredProducts = products.filter((product) => {
    //     const description = product.name
    //       .concat(product.brand)
    //       .toLowerCase()
    //       .split(/\s+/);
    //     return targetWords.every((targetWord) => {
    //       return description.some((word) => {
    //         return word.includes(targetWord);
    //       });
    //     });
    //   });
    // }

    // const filterParams: FilterParams = {};

    const popularStatus = (
      document.querySelector(".poular") as HTMLInputElement
    ).checked;
    filteredProducts = this.filterService.choosePopular(
      filteredProducts,
      popularStatus
    );

    // filterParams.popular = popularCheckbox.checked;

    // localStorage.setItem(
    // "filterParams",
    // JSON.stringify({ popular: filterParams.popular })
    // );

    // if (popularStatus) {
    //   filteredProducts = filteredProducts.filter(
    //     (product) => product.isPopular === true
    //   );
    // }

    const sortParams = (
      document.querySelector(".sorting__select") as HTMLSelectElement
    ).value;
    filteredProducts = this.sortService.sort(filteredProducts, sortParams);

    // localStorage.setItem("sortParams", sortParams);
    // switch (sortParams) {
    //   case "increasingPrice":
    //     filteredProducts.sort((a, b) => a.price - b.price);
    //     break;
    //   case "decreasingPrice":
    //     filteredProducts.sort((a, b) => b.price - a.price);
    //     break;
    //   case "increasingStock":
    //     filteredProducts.sort((a, b) => a.stock - b.stock);
    //     break;
    //   case "decreasingStock":
    //     filteredProducts.sort((a, b) => b.stock - a.stock);
    //     break;
    //   case "increasingName":
    //     filteredProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
    //     break;
    //   case "decreasingName":
    //     filteredProducts.sort((a, b) => (a.name > b.name ? -1 : 1));
    //     break;
    // }

    this.layouts.updateProducts(filteredProducts);
  }
}
