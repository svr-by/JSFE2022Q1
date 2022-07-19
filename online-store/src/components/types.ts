export interface Product {
  name: string;
  brand: string;
  materials: string[];
  price: number;
  url?: string;
  fileName: string;
  type: string;
  isPopular: boolean;
  id: string;
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
export type ProductInCart = {
  name: string;
  price: string;
  qty: number;
};
export enum Sorting {
  increasingPrice = 'increasingPrice',
  decreasingPrice = 'decreasingPrice',
  increasingStock = 'increasingStock',
  decreasingStock = 'decreasingStock',
  increasingName = 'increasingName',
  decreasingName = 'decreasingName',
}
export type FilterOptions = Record<keyof Product, string[] | boolean>;
