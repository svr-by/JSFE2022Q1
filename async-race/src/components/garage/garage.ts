import { Track } from './track';
import { services } from '../../services/services';
import { Pagination } from '../pagination/paginstion';
import { state } from '../../state/state';

class Garage {
  elem: HTMLElement;
  pagination: Pagination;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('garage');
    this.pagination = new Pagination();
  }

  render = () => {
    this.elem.innerHTML = '';
    const pageTitle = services.createElement('h2', `Garage (${state.garageTotalCars})`, ['page-title']);
    const pageNum = services.createElement('h3', `Page #${state.garagePage}`, ['page-num']);
    const raceTrack = services.createElement('div', '', ['race-track']);
    state.garageCars.forEach((car) => {
      const track = new Track().render(car);
      raceTrack.append(track);
    });
    this.elem.append(pageTitle);
    this.elem.append(pageNum);
    this.elem.append(raceTrack);
    this.elem.append(this.pagination.elem);

    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
  };
}

export const garage = new Garage();
