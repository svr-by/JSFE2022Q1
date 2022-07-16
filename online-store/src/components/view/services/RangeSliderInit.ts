import { Product } from '../../types';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export class RangeSliderInit {
  init(data: Product[], prop: keyof Product, range: noUiSlider.target, inputs: HTMLInputElement[]) {
    // Get values from inputs
    const [inputMin, inputMax] = inputs;
    if (!range || !inputMin || !inputMax) return;
    // Determine the maximum and minimum values
    const props = data.map((product) => product[prop] as number).sort((a, b) => a - b);
    const [minProp, maxProp] = [props[0], props[props.length - 1]];
    // Create slider
    noUiSlider.create(range, {
      start: [minProp, maxProp],
      connect: true,
      range: {
        min: minProp,
        max: maxProp,
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(String(value));
        },
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
