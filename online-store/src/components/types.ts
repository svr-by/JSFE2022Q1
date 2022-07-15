export interface Product {
  name: string;
  brand: string;
  materials: string[];
  price: number;
  url: string;
  urlToImage: string;
  type: string;
  isPopular: boolean;
  inCart: number;
  stock: number;
}

export type ActiveElements = {
  search: HTMLInputElement;
  sort: HTMLSelectElement;
  checkboxes: NodeListOf<HTMLInputElement>;
  priceSlider: HTMLElement;
  priceInputs: HTMLInputElement[];
  stockSlider: HTMLElement;
  stockInputs: HTMLInputElement[];
};

export type FilterParams = { popular?: boolean };
