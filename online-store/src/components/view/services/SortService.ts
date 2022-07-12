import { Product } from "../../types";

export class SortService {
  sort(data: Product[], param: string) {
    switch (param) {
      case "increasingPrice":
        data.sort((a, b) => a.price - b.price);
        break;
      case "decreasingPrice":
        data.sort((a, b) => b.price - a.price);
        break;
      case "increasingStock":
        data.sort((a, b) => a.stock - b.stock);
        break;
      case "decreasingStock":
        data.sort((a, b) => b.stock - a.stock);
        break;
      case "increasingName":
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "decreasingName":
        data.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
    }

    return data;
  }
}
