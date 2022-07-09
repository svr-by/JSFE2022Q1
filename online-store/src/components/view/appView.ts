import { Product } from "../types";

export class AppView {
  drawProducts(data: Product[]) {
    const productList = document.querySelector(".product-list") as HTMLElement;
    productList.innerHTML = "";

    data.forEach((productObj) => {
      const productElement = document.createElement("div") as HTMLElement;
      productElement.className = "product";

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
      productPrice.innerHTML = `${this.buildPrice(productObj.price, "₽")}`;
      productLink.append(productPrice);

      productElement.append(productLink);

      productList.append(productElement);
    });
  }

  buildPrice(price: number, cur: string) {
    return String(price)
      .split("")
      .reverse()
      .map((char, ind) => (ind % 3 === 0 ? char + " " : char))
      .reverse()
      .join("")
      .concat(cur);
  }

  sortProducts(data: Product[], sortParams: string) {
    const newData = [...data];
    switch (sortParams) {
      case "increasingPrice":
        newData.sort((a, b) => a.price - b.price);
        break;
      case "decreasingPrice":
        newData.sort((a, b) => b.price - a.price);
        break;
      case "increasingName":
        newData.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "decreasingName":
        newData.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
    }

    this.drawProducts(newData);
  }
}
