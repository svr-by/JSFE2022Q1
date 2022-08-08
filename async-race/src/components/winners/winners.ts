import { extWinner } from '../../types/types';
import { services } from '../../services/services';
import { Pagination } from '../pagination/paginstion';
import { Car } from '../garage/car';
import { state } from '../../state/state';

class Winners {
  elem: HTMLElement;
  pagination: Pagination;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('winners');
    this.pagination = new Pagination();
  }

  render = () => {
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
        </tbody>
      </table>
    `;
    const winnersTbody = this.elem.querySelector('tbody') as HTMLElement;
    state.winnersCars.map((winner) => {
      const winnerRow = this.renderWinnerRow(winner);
      winnersTbody.append(winnerRow);
    });
    this.elem.append(this.pagination.elem);
    const winnersPage = document.querySelector('.winners-page');
    if (winnersPage) winnersPage.append(this.elem);
  };

  private renderWinnerRow = (winner: extWinner) => {
    const tableRow = services.createElement('tr', '');
    tableRow.append(services.createElement('th', `${winner.car.id}`));
    const car = new Car();
    car.bodyColor = winner.car.color;
    car.width = 100;
    car.renderCarImg();
    tableRow.append(car.elem);
    tableRow.append(services.createElement('th', `${winner.car.name}`));
    tableRow.append(services.createElement('th', `${winner.wins}`));
    tableRow.append(services.createElement('th', `${winner.time}`));
    return tableRow;
  };
}

export const winners = new Winners();
