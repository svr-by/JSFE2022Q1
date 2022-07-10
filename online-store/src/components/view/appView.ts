import { Product } from "../types";
import { Renderer } from "./renderer";

export class AppView {
  renderer: Renderer = new Renderer();

  drawPage(data: Product[]) {
    this.renderer.drawLayout();
    this.renderer.drawFilters(data);
    this.renderer.drawProducts(data);
    this.addFilterListeners(data);
  }

  addFilterListeners(data: Product[]) {
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
    const searchInputValue = (
      document.querySelector(".f-box__search") as HTMLInputElement
    ).value;
    let filteredProducts = [...products];
    if (searchInputValue) {
      const targetWords = searchInputValue.trim().toLowerCase().split(/\s+/);
      filteredProducts = products.filter((product) => {
        const description = product.name
          .concat(product.brand)
          .toLowerCase()
          .split(/\s+/);
        return targetWords.every((targetWord) => {
          return description.some((word) => {
            return word.includes(targetWord);
          });
        });
      });
    }

    const popularCheckbox = document.querySelector(
      ".poular"
    ) as HTMLInputElement;
    if (popularCheckbox.checked) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isPopular === true
      );
    }

    const sortParams = (
      document.querySelector(".sorting__select") as HTMLSelectElement
    ).value;

    switch (sortParams) {
      case "increasingPrice":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "decreasingPrice":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "increasingStock":
        filteredProducts.sort((a, b) => a.stock - b.stock);
        break;
      case "decreasingStock":
        filteredProducts.sort((a, b) => b.stock - a.stock);
        break;
      case "increasingName":
        filteredProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "decreasingName":
        filteredProducts.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
    }

    this.renderer.drawProducts(filteredProducts);
  }
}
