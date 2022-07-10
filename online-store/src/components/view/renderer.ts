import { Product } from "../types";

export class Renderer {
  drawLayout() {
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
  }

  drawFilters(data: Product[]) {
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

    const filterContainer = document.querySelector(".filter") as HTMLElement;
    filterContainer.innerHTML = "";

    const filterTitle = document.createElement("h3") as HTMLElement;
    filterTitle.className = "filter__title";
    filterTitle.innerHTML = "Фильтр";
    filterContainer.append(filterTitle);

    const searchsBox = this.drawFilterBox("Поиск");
    const searchInput = document.createElement("input") as HTMLInputElement;
    searchInput.type = "search";
    searchInput.placeholder = "Введите текст";
    searchInput.autocomplete = "off";
    searchInput.className = "f-box__search";
    searchInput.name = "";
    searchsBox.append(searchInput);
    filterContainer.append(searchsBox);
    // searchInput.addEventListener("input", () => this.searchFilter(data));

    const priceBox = this.drawFilterBox("Цена");
    filterContainer.append(priceBox);

    const brandsBox = this.drawFilterBox("Бренд", brands);
    filterContainer.append(brandsBox);

    const typesBox = this.drawFilterBox("Тип украшения", types);
    filterContainer.append(typesBox);

    const materialsBox = this.drawFilterBox("Материал", materials);
    filterContainer.append(materialsBox);

    const labels: Set<string> = new Set();
    labels.add("Популярные товары");
    const labelsBox = this.drawFilterBox("Особые категории", labels);
    filterContainer.append(labelsBox);

    const resetBtn = document.createElement("button") as HTMLButtonElement;
    resetBtn.className = "f-box__btn";
    resetBtn.innerHTML = "Сброс фильтров";
    filterContainer.append(resetBtn);
  }

  private drawFilterBox(title: string, data: Set<string> = new Set()) {
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
      input.name = "";
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

  drawProducts(data: Product[]) {
    const productList = document.querySelector(".product-list") as HTMLElement;
    productList.innerHTML = "";

    data.forEach((productObj) => {
      const productElement = this.drawProduct(productObj);
      productList.append(productElement);
    });
  }

  private drawProduct(productObj: Product) {
    const productElement = document.createElement("div") as HTMLElement;
    productElement.className = "product";

    const productLabel = document.createElement("div") as HTMLElement;
    productLabel.className = "product__labels";
    if (productObj.isPopular) {
      const labelPopular = document.createElement("div") as HTMLElement;
      labelPopular.className = "label--popular";
      productLabel.append(labelPopular);
    }
    productElement.append(productLabel);

    const productStock = document.createElement("div") as HTMLElement;
    productStock.className = "product__stock";
    productStock.innerHTML = `Остаток: ${productObj.stock} шт`;
    productElement.append(productStock);

    const imgWrapper = document.createElement("a") as HTMLAnchorElement;
    imgWrapper.className = "product__img-wrapper";
    imgWrapper.href = `${productObj.url}`;
    const productImg = document.createElement("img") as HTMLElement;
    productImg.className = "product__img";
    productImg.setAttribute("src", `${productObj.urlToImage}`);
    productImg.setAttribute("alt", `${productObj.type}`);
    imgWrapper.append(productImg);
    productElement.append(imgWrapper);

    const productLink = document.createElement("a") as HTMLAnchorElement;
    productLink.className = "product__link";
    productLink.href = `${productObj.url}`;
    const productTitle = document.createElement("h4") as HTMLElement;
    productTitle.className = "product__title";
    productTitle.innerHTML = `${productObj.name}, ${productObj.brand}`;
    productLink.append(productTitle);

    const productDesc = document.createElement("p") as HTMLElement;
    productDesc.className = "product__desc";
    productDesc.innerHTML = `${productObj.materials.join(", ")}`;
    productLink.append(productDesc);

    const productPrice = document.createElement("p") as HTMLElement;
    productPrice.className = "product__price";
    productPrice.innerHTML = `${this.buildPriceString(productObj.price, "₽")}`;
    productLink.append(productPrice);

    productElement.append(productLink);

    return productElement;
  }

  private buildPriceString(price: number, cur: string) {
    return String(price)
      .split("")
      .reverse()
      .map((char, ind) => (ind % 3 === 0 ? char + " " : char))
      .reverse()
      .join("")
      .concat(cur);
  }
}
