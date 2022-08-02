import { Track } from './track';
import { Pagination } from '../pagination/paginstion';
import { state } from '../../state/state';

export class Garage {
  elem = document.createElement('div');
  track = new Track();
  pagination = new Pagination();

  render = () => {
    this.elem.classList.add('garage');
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
