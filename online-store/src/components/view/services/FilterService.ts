import { Product } from "../../types";

export class FilterService {
  choosePopular(data: Product[], status: boolean) {
    if (status) {
      return data.filter((product) => product.isPopular === true);
    } else {
      return data;
    }
  }
}
