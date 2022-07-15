import { Product, ActiveElements } from "../../types";

export class FilterService {
  filter(products: Product[], elements: Partial<ActiveElements>) {
    const priceInputs = elements.priceInputs;
    const productsByPrice = this.filterRange(products, priceInputs, "price");
    const stockInputs = elements.stockInputs;
    const productsByStock = this.filterRange(
      productsByPrice,
      stockInputs,
      "stock"
    );
    const checkboxes = elements.checkboxes;
    if (checkboxes?.length !== 0 && checkboxes !== undefined) {
      const arrayNodes = Array.from(checkboxes);
      const brands = this.filterGroup(productsByStock, arrayNodes, "brand");
      const types = this.filterGroup(brands, arrayNodes, "type");
      const material = this.filterGroup(types, arrayNodes, "materials");
      const result = this.filterPopular(material, arrayNodes);
      return result;
    } else {
      return products;
    }
  }

  filterGroup(
    data: Product[],
    inputs: Array<HTMLInputElement>,
    prop: keyof Product
  ) {
    const group = inputs.filter((node) => node.classList.contains(prop));
    const targetOptions = group
      .filter((input) => input.checked === true)
      .map((input) => input.dataset.op);

    if (targetOptions.length !== 0) {
      return data.filter((product) => {
        const description =
          typeof product[prop] === "string"
            ? [product[prop]]
            : [...(product[prop] as Array<string>)];
        return description.some((word) =>
          targetOptions.includes((word as string).toLowerCase())
        );
      });
    } else {
      return data;
    }
  }

  filterRange(
    data: Product[],
    inputs: Array<HTMLInputElement> | undefined,
    prop: keyof Product
  ) {
    if (inputs) {
      const [minInput, maxInput] = inputs;
      return data.filter(
        (product) =>
          product[prop] >= parseInt(minInput.value) &&
          product[prop] <= parseInt(maxInput.value)
      );
    } else {
      return data;
    }
  }

  filterPopular(data: Product[], inputs: Array<HTMLInputElement>) {
    const [checkbox] = inputs.filter((node) =>
      node.classList.contains("poular")
    );
    if (checkbox.checked) {
      return data.filter((product) => product.isPopular === true);
    } else {
      return data;
    }
  }
}
