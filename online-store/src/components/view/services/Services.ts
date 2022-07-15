// import { Product } from "../../types";
import { SortService } from './SortService';
import { SearchService } from './SearchService';
import { FilterService } from './FilterService';
import { RangeSliderInit } from './RangeSliderInit';

export class Services {
  sortService = new SortService();
  searchService = new SearchService();
  filterService = new FilterService();
  rangeSliderInit = new RangeSliderInit();
}
