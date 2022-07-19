import { Product, ActiveElements, FilterOptions } from '../../types';

export class FilterService {
  private filterOptions: Partial<FilterOptions> = {};

  filter(products: Product[], elements: Partial<ActiveElements>) {
    const priceInputs = elements.priceInputs;
    const productsByPrice = this.filterRange(products, priceInputs, 'price');
    const stockInputs = elements.stockInputs;
    const productsByStock = this.filterRange(productsByPrice, stockInputs, 'stock');
    let result = productsByStock;
    const checkboxes = elements.checkboxes;
    if (checkboxes?.length !== 0 && checkboxes !== undefined) {
      const arrayNodes = Array.from(checkboxes);
      const brands = this.filterGroup(productsByStock, arrayNodes, 'brand');
      const types = this.filterGroup(brands, arrayNodes, 'type');
      const material = this.filterGroup(types, arrayNodes, 'materials');
      result = this.filterPopular(material, arrayNodes);
    }
    localStorage.setItem('filterOptions', JSON.stringify(this.filterOptions));
    return result;
  }

  filterGroup(data: Product[], inputs: Array<HTMLInputElement>, prop: keyof Product) {
    const group = inputs.filter((node) => node.classList.contains(prop));
    const targetOptions = group.filter((input) => input.checked === true).map((input) => input.dataset.op);
    if (targetOptions.length !== 0) {
      this.filterOptions[prop] = [...(targetOptions as string[])];
      return data.filter((product) => {
        const description = typeof product[prop] === 'string' ? [product[prop]] : [...(product[prop] as Array<string>)];
        return description.some((word) => targetOptions.includes((word as string).toLowerCase()));
      });
    } else {
      this.filterOptions[prop] = [];
      return data;
    }
  }

  filterRange(data: Product[], inputs: Array<HTMLInputElement> | undefined, prop: keyof Product) {
    if (inputs) {
      const [minInput, maxInput] = inputs;
      (this.filterOptions[prop] as string[]) = [minInput.value, maxInput.value];
      return data.filter(
        (product) =>
          (product[prop] as number) >= parseInt(minInput.value) && (product[prop] as number) <= parseInt(maxInput.value)
      );
    } else {
      return data;
    }
  }

  filterPopular(data: Product[], inputs: Array<HTMLInputElement>) {
    const [checkbox] = inputs.filter((node) => node.classList.contains('poular'));
    this.filterOptions.isPopular = checkbox.checked;
    if (checkbox.checked) {
      return data.filter((product) => product.isPopular === true);
    } else {
      return data;
    }
  }
}
