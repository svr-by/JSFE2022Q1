import { garage } from '../components/garage/garage';
import { API } from '../api/api';
import { state } from '../state/state';

class Services {
  updateGarage = async () => {
    const { items, count } = await API.getCars(state.garagePage);
    state.garageCars = items;
    if (count) state.garageTotalCars = +count;

    garage.render();
    this.updatePagination();
  };

  updatePagination = () => {
    if (state.garagePage * state.garagePageLimit < state.garageTotalCars) {
      garage.pagination.btnNext.elem.disabled = false;
    } else {
      garage.pagination.btnNext.elem.disabled = true;
    }
    if (state.garagePage > 1) {
      garage.pagination.btnPrev.elem.disabled = false;
    } else {
      garage.pagination.btnPrev.elem.disabled = true;
    }
  };
}

export const services = new Services();
