import { Product, ActiveElements } from "../types";
import { Layouts } from "./layouts/layouts";
import { Services } from "./services/services";

export class AppView {
  elements: Partial<ActiveElements> = {};
  layouts = new Layouts();
  services = new Services();

  createCatalog(data: Product[]) {
    this.layouts.renderCatalog(data);
    this.init(data);
    this.updateProducts(data);
  }

  init(data: Product[]) {
    this.elements.priceSlider = document.getElementById(
      "priceRange"
    ) as HTMLElement;
    const priceMin = document.getElementById("priceMin") as HTMLInputElement;
    const priceMax = document.getElementById("priceMax") as HTMLInputElement;
    this.elements.priceInputs = [priceMin, priceMax];
    this.services.rangeSliderInit.init(
      data,
      "price",
      this.elements.priceSlider,
      this.elements.priceInputs
    );

    this.elements.stockSlider = document.getElementById(
      "stockRange"
    ) as HTMLElement;
    const stockMin = document.getElementById("stockMin") as HTMLInputElement;
    const stockMax = document.getElementById("stockMax") as HTMLInputElement;
    this.elements.stockInputs = [stockMin, stockMax];
    this.services.rangeSliderInit.init(
      data,
      "stock",
      this.elements.stockSlider,
      this.elements.stockInputs
    );

    this.elements.search = document.querySelector(
      ".f-box__search"
    ) as HTMLInputElement;

    this.elements.search.addEventListener("input", () =>
      this.updateProducts(data)
    );

    this.elements.sort = document.querySelector(
      ".sorting__select"
    ) as HTMLSelectElement;
    this.elements.sort.addEventListener("change", () =>
      this.updateProducts(data)
    );

    this.elements.checkboxes = document.querySelectorAll(".f-box__checkbox");
    this.elements.checkboxes.forEach((checkboxElement) =>
      checkboxElement.addEventListener("change", () =>
        this.updateProducts(data)
      )
    );
  }

  updateProducts(products: Product[]) {
    const searchedProducts = this.services.searchService.search(
      products,
      this.elements.search?.value || ""
    );

    const filteredProducts = this.services.filterService.filter(
      searchedProducts,
      this.elements.checkboxes as NodeListOf<HTMLInputElement>
    );

    const sortedProducts = this.services.sortService.sort(
      filteredProducts,
      this.elements.sort?.value || "default"
    );

    this.layouts.renderProducts(sortedProducts);
  }
}
