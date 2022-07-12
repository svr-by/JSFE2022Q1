import { Product } from "../../../types";

export class FilterLayouts {
  renderFilters(data: Product[]) {
    const result: Array<HTMLElement> = [];
    const brands: Set<string> = new Set();
    const types: Set<string> = new Set();
    const materials: Set<string> = new Set();

    data.forEach((productObj) => {
      brands.add(productObj.brand);
      types.add(productObj.type);
      productObj.materials.forEach((material) =>
        materials.add(material.toLowerCase())
      );
    });

    const filterTitle = document.createElement("h3") as HTMLElement;
    filterTitle.className = "filter__title";
    filterTitle.innerHTML = "Фильтр";
    result.push(filterTitle);

    const searchs = this.renderSearch();
    result.push(searchs);

    const priceBox = this.renderFilter("Цена");
    result.push(priceBox);

    const brandsBox = this.renderFilter("Бренд", brands, "brands");
    result.push(brandsBox);

    const typesBox = this.renderFilter("Тип украшения", types, "types");
    result.push(typesBox);

    const materialsBox = this.renderFilter("Материал", materials, "materials");
    result.push(materialsBox);

    const labels: Set<string> = new Set();
    labels.add("Популярные товары");
    const labelsBox = this.renderFilter("Особые категории", labels, "poular");
    result.push(labelsBox);

    const resetBtn = document.createElement("button") as HTMLButtonElement;
    resetBtn.className = "f-box__btn";
    resetBtn.innerHTML = "Сброс фильтров";
    result.push(resetBtn);

    return result;
  }
  private renderSearch() {
    const searchsBox = this.renderFilter("Поиск");
    const searchInput = document.createElement("input") as HTMLInputElement;
    searchInput.type = "search";
    searchInput.placeholder = "Введите текст";
    searchInput.autocomplete = "off";
    searchInput.className = "f-box__search";
    searchsBox.append(searchInput);
    return searchsBox;
  }

  private renderFilter(
    title: string,
    data: Set<string> = new Set(),
    filterName = ""
  ) {
    const filterBox = document.createElement("div") as HTMLElement;
    filterBox.className = "f-box";
    const filterBoxName = document.createElement("h4") as HTMLElement;
    filterBoxName.className = "f-box__name";
    filterBoxName.innerHTML = title;
    filterBox.append(filterBoxName);
    data.forEach((option) => {
      const label = document.createElement("label") as HTMLLabelElement;
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "checkbox";
      input.className =
        "f-box__checkbox" + (filterName ? ` ${filterName}` : "");
      input.name = "";
      input.dataset.op = option.toLowerCase();
      label.append(input);
      const filterBoxOption = document.createElement("span") as HTMLSpanElement;
      filterBoxOption.className = "f-box__option";
      const capOption = option[0].toUpperCase() + option.slice(1).toLowerCase();
      filterBoxOption.innerHTML = capOption;
      label.append(filterBoxOption);
      filterBox.append(label);
    });
    return filterBox;
  }
}
