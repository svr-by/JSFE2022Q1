import { garage } from '../components/garage/garage';
import { API } from '../api/api';
import { state } from '../state/state';
import { createCarBody } from '../types/types';

class Services {
  createElement = (tag: string, text?: string, classes?: string[], id?: string) => {
    const elem = document.createElement(`${tag}`);
    elem.innerText = `${text}`;
    if (classes) elem.classList.add(...classes);
    if (id) elem.id = id;
    return elem;
  };

  createCar = async (car: createCarBody) => {
    await API.createCar(car);
    this.updateGarage();
  };

  removeCar = async (id: number) => {
    await API.deleteCar(id);
    //delete car from winners
    this.updateGarage();
  };

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
