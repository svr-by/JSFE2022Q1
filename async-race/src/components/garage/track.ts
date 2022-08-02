import { car } from '../../types/types';
import { Car } from './car';

export class Track {
  car = new Car();

  render = ({ id, name, color }: car) => `
    <div class="track">
      <div class="track__control">
        <button class="button" id="select-car-${id}">Select</button>
        <button class="button" id="remove-car-${id}">Remove</button>
        <h4 class="track__name">${name}</h4>
      </div>
      <div class="track__road">
        <div class="launcher">
          <button class="track__btn start-btn" id="start-car-${id}">A</button>
          <button class="track__btn stop-btn" id="stop-car-${id}" disabled>B</button>
        </div>
        <div class="car" id="car-${id}">${this.car.renderCarImg(color)}</div>
        <div class="finish"></div>
      </div>
    </div>
  `;
}
