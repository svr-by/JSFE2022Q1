import { garage } from '../components/garage/garage';
import { winners } from '../components/winners/winners';
import { control } from '../components/control/control';
import { API } from '../api/api';
import { state } from '../state/state';

class LayoutService {
  createElement = (tag: string, text?: string, classes?: string[], id?: string) => {
    const elem = document.createElement(`${tag}`);
    elem.innerText = `${text}`;
    if (classes) elem.classList.add(...classes);
    if (id) elem.id = id;
    return elem;
  };

  updateControl = () => {
    control.inpTextCreate.elem.value = '';
    control.inpColorCreate.elem.value = '#000000';
    control.btnCreate.elem.disabled = true;
    control.inpTextUpdate.elem.value = '';
    control.inpColorUpdate.elem.value = '#000000';
    control.inpTextUpdate.elem.disabled = true;
    control.inpColorUpdate.elem.disabled = true;
    control.btnUpdate.elem.disabled = true;
  };

  updateGarage = async () => {
    const { items, count } = await API.getCars(state.garagePage);
    state.garageCars = items;
    if (count) state.garageTotalCars = +count;
    garage.render();
    garage.pagination.updatePagination();
  };

  updateWinners = async () => {
    const { items, count } = await API.getWinners(state.winnersPage, state.winnersSort, state.winnersSortOrder);
    state.winnersCars = items;
    if (count) state.winnersTotalCars = +count;
    winners.render();
    winners.pagination.updatePagination();
  };

  renderNextPage = async () => {
    if (state.view === 'garage') {
      state.garagePage += 1;
      await this.updateGarage();
    }
    if (state.view === 'winners') {
      state.winnersPage += 1;
      await this.updateWinners();
    }
  };

  renderPrevPage = async () => {
    if (state.view === 'garage') {
      state.garagePage -= 1;
      await this.updateGarage();
    }
    if (state.view === 'winners') {
      state.winnersPage -= 1;
      await this.updateWinners();
    }
  };

  setSortOrder = async (sortParam: 'id' | 'wins' | 'time') => {
    state.winnersSortOrder = state.winnersSortOrder === 'ASC' ? 'DESC' : 'ASC';
    state.winnersSort = sortParam;
    await this.updateWinners();
  };

  private getCoordinates = (element: HTMLElement) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  getDistance = (elem1: HTMLElement, elem2: HTMLElement) => {
    const coords1 = this.getCoordinates(elem1);
    const coords2 = this.getCoordinates(elem2);
    return Math.hypot(coords2.x - coords1.x, coords2.y - coords1.y);
  };
}

export const layoutService = new LayoutService();
