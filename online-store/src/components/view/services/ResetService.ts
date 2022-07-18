import { ActiveElements } from '../../types';
import * as noUiSlider from 'nouislider';

export class ResetService {
  clearFilters(elements: Partial<ActiveElements>) {
    if (elements.search) elements.search.value = '';

    if (elements.priceSlider) {
      (elements.priceSlider as noUiSlider.target).noUiSlider?.reset();
    }
    if (elements.stockSlider) {
      (elements.stockSlider as noUiSlider.target).noUiSlider?.reset();
    }
    const checkboxes = elements.checkboxes;
    if (checkboxes?.length !== 0 && checkboxes !== undefined) {
      checkboxes.forEach((checkbox) => (checkbox.checked = false));
    }
  }
}
