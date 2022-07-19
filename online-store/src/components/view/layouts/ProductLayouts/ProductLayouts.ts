import { Product } from '../../../types';

export class ProductLayouts {
  renderProduct(productObj: Product, flag: boolean, handler: (event: Event) => void) {
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
    productLink.href = productObj?.url ? `${productObj?.url}` : `javascript:void(0)`;
    const productTitle = document.createElement('h4') as HTMLElement;
    productTitle.className = 'product__title';
    productTitle.innerHTML = `${productObj.name}, ${productObj.brand}`;
    productLink.append(productTitle);
    const productDesc = document.createElement('p') as HTMLElement;
    productDesc.className = 'product__desc';
    productDesc.innerHTML = `${productObj.materials.join(', ').toLowerCase()}`;
    productLink.append(productDesc);
    productElement.append(productLink);

    const productPrice = document.createElement('div') as HTMLElement;
    productPrice.className = 'product__price';
    const price = document.createElement('span') as HTMLElement;
    price.className = 'price';
    price.innerHTML = `${this.formatPrice(productObj.price, 'руб.')}`;
    productPrice.append(price);
    const cartBtn = document.createElement('button') as HTMLElement;
    cartBtn.className = flag ? 'product__btn active' : 'product__btn';
    cartBtn.innerHTML = flag ? 'В корзине' : 'В корзину';
    cartBtn.addEventListener('click', handler);
    productPrice.append(cartBtn);

    productElement.append(productPrice);
    return productElement;
  }

  private formatPrice(price: number, cur: string) {
    return String(price)
      .split('')
      .reverse()
      .map((char, ind) => (ind % 3 === 0 ? char + ' ' : char))
      .reverse()
      .join('')
      .trim()
      .concat(',00 ', cur);
  }
}
