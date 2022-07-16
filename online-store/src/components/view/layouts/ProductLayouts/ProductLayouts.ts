import { Product } from '../../../types';

export class ProductLayouts {
  renderProduct(productObj: Product) {
    const productElement = document.createElement('div') as HTMLElement;
    productElement.className = 'product';

    const productLabel = document.createElement('div') as HTMLElement;
    productLabel.className = 'product__labels';
    if (productObj.isPopular) {
      const labelPopular = document.createElement('div') as HTMLElement;
      labelPopular.className = 'label--popular';
      labelPopular.title = 'Популярный товар';
      productLabel.append(labelPopular);
    }
    productElement.append(productLabel);

    const productStock = document.createElement('div') as HTMLElement;
    productStock.className = 'product__stock';
    productStock.innerHTML = `Остаток: ${productObj.stock} шт`;
    productElement.append(productStock);

    const imgWrapper = document.createElement('a') as HTMLAnchorElement;
    imgWrapper.className = 'product__img-wrapper';
    imgWrapper.href = `javascript:void(0)`;
    const productImg = document.createElement('img') as HTMLElement;
    productImg.className = 'product__img';
    productImg.setAttribute('src', `assets/img/${productObj.fileName}`);
    productImg.setAttribute('alt', `${productObj.type}`);
    imgWrapper.append(productImg);
    productElement.append(imgWrapper);

    const productLink = document.createElement('a') as HTMLAnchorElement;
    productLink.className = 'product__link';
    productLink.href = `javascript:void(0)`;
    const productTitle = document.createElement('h4') as HTMLElement;
    productTitle.className = 'product__title';
    productTitle.innerHTML = `${productObj.name}, ${productObj.brand}`;
    productLink.append(productTitle);

    const productDesc = document.createElement('p') as HTMLElement;
    productDesc.className = 'product__desc';
    productDesc.innerHTML = `${productObj.materials.join(', ')}`;
    productLink.append(productDesc);

    const productPrice = document.createElement('p') as HTMLElement;
    productPrice.className = 'product__price';
    productPrice.innerHTML = `${this.formatPrice(productObj.price, 'руб.')}`;
    productLink.append(productPrice);

    productElement.append(productLink);

    return productElement;
  }

  private formatPrice(price: number, cur: string) {
    return String(price)
      .split('')
      .reverse()
      .map((char, ind) => (ind % 3 === 0 ? char + ' ' : char))
      .reverse()
      .join('')
      .concat(cur);
  }
}
