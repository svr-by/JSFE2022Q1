import { Track } from './track';
import { Pagination } from '../pagination/paginstion';
import { state } from '../../state/state';

export class Garage {
  elem: HTMLElement;
  track: Track;
  pagination: Pagination;

  constructor() {
    this.elem = document.createElement('div');
    this.track = new Track();
    this.pagination = new Pagination();
    this.elem.classList.add('garage');
  }

  render = () => {
    this.elem.innerHTML = `
      <h2 class="page-title">Garage (${state.garageTotalCars})</h2>
      <h3 class="page-num">Page #${state.garagePage}</h3>
      <div class="race-track">
        ${state.garageCars.map((car) => this.track.render(car)).join('')}
      </div>
    `;
    this.elem.append(this.pagination.elem);
    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
  };
}

export const garage = new Garage();
