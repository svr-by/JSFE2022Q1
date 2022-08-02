import { extWinner } from '../../types/types';
import { Pagination } from '../pagination/paginstion';
import { Car } from '../garage/car';
import { state } from '../../state/state';

export class Winners {
  elem: HTMLElement;
  pagination: Pagination;
  car: Car;

  constructor() {
    this.car = new Car();
    this.elem = document.createElement('div');
    this.elem.classList.add('winners');
    this.elem.innerHTML = `
      <h2 class="page-title page-title--winners">Winners (${state.winnersTotalCars})</h2>
      <h3 class="page-num page-num--winners">Page #${state.winnersPage}</h3>
      <table class="winners__table">
        <thead class="winners__th">
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th class="winners__btn">Wins</th>
          <th class="winners__btn">Best time, s</th>
        </thead>
        <tbody>
          ${state.winnersCars.map((winner, ind) => this.renderWinner(winner, ind)).join('')}
        </tbody>
      </table>
    `;
    this.pagination = new Pagination();
    this.elem.append(this.pagination.elem);
  }

  render = () => {
    const winnersPage = document.querySelector('.winners-page');
    if (winnersPage) winnersPage.append(this.elem);
  };

  private renderWinner = (winner: extWinner, ind: number) => `
    <tr>
      <th>${ind + 1}</th>
      <th>${this.car.renderCarImg(winner.car.color)}</th>
      <th>${winner.car.name}</th>
      <th>${winner.wins}</th>
      <th>${winner.time}</th>
    </tr>
  `;
}
