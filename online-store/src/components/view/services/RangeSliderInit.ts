import { Product } from '../../types';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class RangeSliderInit {
  init(data: Product[], prop: keyof Product, range: noUiSlider.target, inputs: HTMLInputElement[]) {
    // Get values from inputs
    const [inputMin, inputMax] = inputs;
    if (!range || !inputMin || !inputMax) return;
    // Determine the maximum and minimum values
    const props = data.map((product) => product[prop] as number).sort();
    const [minProp, maxProp] = [props[0], props[props.length - 1]];
    // Create slider
    const startMin = inputMin.value === '' ? minProp : parseInt(inputMin.value);
    const startMax = inputMin.value === '' ? maxProp : parseInt(inputMax.value);
    noUiSlider.create(range, {
      start: [startMin, startMax],
      connect: true,
      range: {
        min: minProp,
        max: maxProp,
      },
      step: 1,
    });
    // Add event handlers
    range.noUiSlider?.on('update', (values, handle) => {
      inputs[handle].value = values[handle] as string;
    });
    inputMin.addEventListener('change', function () {
      range.noUiSlider?.set([this.value]);
    });
    inputMax.addEventListener('change', function () {
      range.noUiSlider?.set(['', this.value]);
    });
  }
}
