import { garage } from '../components/garage/garage';
import { control } from '../components/control/control';
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
    this.updateControl();
    this.updateGarage();
  };

  removeCar = async (id: number) => {
    await API.deleteCar(id);
    //delete car from winners
    this.updateControl();
    this.updateGarage();
  };

  selectCar = async (id: string | undefined) => {
    let disabled = true;
    let name = '';
    let color = '#000000';
    if (id) {
      disabled = false;
      state.selectedCar = await API.getCar(+id);
      name = state.selectedCar.name;
      color = state.selectedCar.color;
    } else {
      state.selectedCar = null;
    }
    control.inpTextUpdate.elem.value = name;
    control.inpColorUpdate.elem.value = color;
    control.inpTextUpdate.elem.disabled = disabled;
    control.inpColorUpdate.elem.disabled = disabled;
    control.btnUpdate.elem.disabled = disabled;
  };

  updateCar = async (carProps: createCarBody) => {
    if (state.selectedCar) {
      await API.updateCar(state.selectedCar.id, carProps);
    }
    this.updateControl();
    this.updateGarage();
    state.selectedCar = null;
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
