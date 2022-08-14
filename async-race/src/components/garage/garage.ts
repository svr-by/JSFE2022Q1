import { Track } from './track';
import { Pagination } from '../pagination/pagination';
import { layoutService } from '../../services/layoutService';
import { state } from '../../state/state';
import { Racer } from '../../types/types';

class Garage {
  elem: HTMLElement;
  winnerMessage: HTMLElement;
  pagination: Pagination;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('garage');
    this.winnerMessage = document.createElement('h2');
    this.winnerMessage.classList.add('winner-message');
    this.pagination = new Pagination();
  }

  render() {
    this.elem.innerHTML = '';
    const pageTitle = layoutService.createElement({
      tag: 'h2',
      text: `Garage (${state.garageTotalCars})`,
      classes: ['page-title'],
    });
    const pageNum = layoutService.createElement({
      tag: 'h3',
      text: `Page #${state.garagePage}`,
      classes: ['page-num'],
    });
    const raceTrack = layoutService.createElement({
      tag: 'div',
      classes: ['race-track'],
    });
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
    this.elem.append(this.winnerMessage);

    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
  }

  showWinner(winner: Racer) {
    this.winnerMessage.classList.add('visible');
    const time = (winner.time / 1000).toFixed(2);
    this.winnerMessage.innerText = `Racer ${winner.id} went first in ${time}s!`;
    setTimeout(() => {
      this.winnerMessage.innerText = '';
      this.winnerMessage.classList.remove('visible');
    }, 5000);
  }

  blockPage() {
    this.winnerMessage.classList.add('warning');
    this.winnerMessage.innerText = `Sorry, server not found! `;
    this.elem.append(this.winnerMessage);
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');
    [...buttons, ...inputs].forEach((elem) => (elem.disabled = true));
    const gargePage = document.querySelector('.garage-page');
    if (gargePage) gargePage.append(this.elem);
  }
}

export const garage = new Garage();
