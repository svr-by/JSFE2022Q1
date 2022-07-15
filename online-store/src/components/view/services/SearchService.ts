import { Product } from '../../types';

export class SearchService {
  search(data: Product[], searching: string) {
    if (searching) {
      const targetWords = searching.trim().toLowerCase().split(/\s+/);
      return data.filter((product) => {
        const description = product.name.concat(product.brand).toLowerCase().split(/\s+/);
        return targetWords.every((targetWord) => description.some((word) => word.includes(targetWord)));
      });
    } else {
      return data;
    }
  }
}
