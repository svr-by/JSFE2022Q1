import { Button } from '../button/button';
import { state } from '../../state/state';
import { layoutService } from '../../services/layoutService';

export class Pagination {
  elem: HTMLDivElement;
  btnPrev: Button;
  btnNext: Button;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('pagination');
    this.btnPrev = new Button('Prev', undefined, ['button']);
    this.btnPrev.elem.disabled = true;
    this.elem.append(this.btnPrev.elem);
    this.btnNext = new Button('Next', undefined, ['button']);
    this.btnNext.elem.disabled = true;
    this.elem.append(this.btnNext.elem);
    this.addListeners();
  }

  private addListeners = () => {
    this.btnPrev.elem.addEventListener('click', async () => {
      await layoutService.renderPrevPage();
    });
    this.btnNext.elem.addEventListener('click', async () => {
      await layoutService.renderNextPage();
    });
  };

  updatePagination = () => {
    let currentPage: number;
    let totalCars: number;
    let pageLimit: number;

    if (state.view === 'garage') {
      currentPage = state.garagePage;
      totalCars = state.garageTotalCars;
      pageLimit = state.garagePageLimit;
    } else {
      currentPage = state.winnersPage;
      totalCars = state.winnersTotalCars;
      pageLimit = state.winnersPageLimit;
    }

    if (pageLimit >= totalCars) {
      this.elem.style.display = 'none';
    } else {
      this.elem.style.display = 'block';
    }
    if (currentPage * pageLimit < totalCars) {
      this.btnNext.elem.disabled = false;
    } else {
      this.btnNext.elem.disabled = true;
    }
    if (currentPage > 1) {
      this.btnPrev.elem.disabled = false;
    } else {
      this.btnPrev.elem.disabled = true;
    }
  };
}
