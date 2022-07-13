import { Product, ActiveElements } from "../types";
import { Layouts } from "./layouts/layouts";
import { SortService } from "./services/SortService";
import { SearchService } from "./services/SearchService";
import { FilterService } from "./services/FilterService";

export class AppView {
  elements: Partial<ActiveElements> = {};
  layouts = new Layouts();
  sortService = new SortService();
  searchService = new SearchService();
  filterService = new FilterService();

  createCatalog(data: Product[]) {
    this.layouts.renderCatalog(data);
    this.init(data);
    this.updateProducts(data);
  }

  init(data: Product[]) {
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
    const searchedProducts = this.searchService.search(
      products,
      this.elements.search?.value || ""
    );

    const filteredProducts = this.filterService.filter(
      searchedProducts,
      this.elements.checkboxes as NodeListOf<HTMLInputElement>
    );

    const sortedProducts = this.sortService.sort(
      filteredProducts,
      this.elements.sort?.value || "default"
    );

    this.layouts.renderProducts(sortedProducts);
  }
}
