import { Track } from './track';
import { Pagination } from '../pagination/paginstion';
import { layoutService } from '../../services/layoutService';
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
    const pageTitle = layoutService.createElement('h2', `Garage (${state.garageTotalCars})`, ['page-title']);
    const pageNum = layoutService.createElement('h3', `Page #${state.garagePage}`, ['page-num']);
    const raceTrack = layoutService.createElement('div', '', ['race-track']);
    state.garageTracks = [];
    state.garageCars.forEach((car) => {
      const track = new Track();
      state.garageTracks.push(track);
      const trackElem = track.render(car);
      raceTrack.append(trackElem);
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
