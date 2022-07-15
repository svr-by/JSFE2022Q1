import { Product } from "../../types";
import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export class RangeSliderInit {
  init(
    data: Product[],
    prop: keyof Product,
    range: noUiSlider.target,
    inputs: HTMLInputElement[]
  ) {
    const [inputMin, inputMax] = inputs;
    if (!range || !inputMin || !inputMax) return;

    const props = data.map((product) => product[prop] as number).sort();
    const [minProp, maxProp] = [props[0], props[props.length - 1]];

    noUiSlider.create(range, {
      start: [minProp, maxProp],
      connect: true,
      range: {
        min: minProp,
        max: maxProp,
      },
      step: 1,
    });

    range.noUiSlider?.on("update", (values, handle) => {
      inputs[handle].value = values[handle] as string;
    });
    inputMin.addEventListener("change", function () {
      range.noUiSlider?.set([this.value]);
    });
    inputMax.addEventListener("change", function () {
      range.noUiSlider?.set(["", this.value]);
    });
  }
}
