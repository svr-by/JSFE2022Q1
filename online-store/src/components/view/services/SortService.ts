import { Product, Sorting } from '../../types';

export class SortService {
  sort(data: Product[], sortSelect: HTMLSelectElement | undefined) {
    const sortOption = sortSelect?.value;
    if (sortOption !== undefined) {
      localStorage.setItem('sortOption', sortOption);
    }
    switch (sortOption) {
      case Sorting.increasingPrice:
        data.sort((a, b) => a.price - b.price);
        break;
      case Sorting.decreasingPrice:
        data.sort((a, b) => b.price - a.price);
        break;
      case Sorting.increasingStock:
        data.sort((a, b) => a.stock - b.stock);
        break;
      case Sorting.decreasingStock:
        data.sort((a, b) => b.stock - a.stock);
        break;
      case Sorting.increasingName:
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case Sorting.decreasingName:
        data.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
    }
    return data;
  }
}
