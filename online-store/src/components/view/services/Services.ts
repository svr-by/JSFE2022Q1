// import { Product } from "../../types";
import { SortService } from './SortService';
import { SearchService } from './SearchService';
import { FilterService } from './FilterService';
import { RangeSliderInit } from './RangeSliderInit';
import { ResetService } from './ResetService';
import { CartService } from './CartService';

export class Services {
  sortService = new SortService();
  searchService = new SearchService();
  filterService = new FilterService();
  rangeSliderInit = new RangeSliderInit();
  resetService = new ResetService();
  cartService = new CartService();
}
