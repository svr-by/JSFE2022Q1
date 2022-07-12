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

export type FilterParams = { popular?: boolean };
