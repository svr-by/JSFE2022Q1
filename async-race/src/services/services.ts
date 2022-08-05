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
    await this.updateGarage();
  };

  removeCar = async (id: number) => {
    await API.deleteCar(id);
    //delete car from winners
    this.updateControl();
    await this.updateGarage();
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
    await this.updateGarage();
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
    //update for winners
  };

  renderNextPage = async () => {
    state.garagePage += 1;
    await this.updateGarage();
    //update for winners
  };

  renderPrevPage = async () => {
    state.garagePage -= 1;
    await this.updateGarage();
    //update for winners
  };

  private getRandomName = () => {
    const brands = [
      'Ascari',
      'McLaren',
      'Bentley',
      'Bugatti',
      'Porsche',
      'Ferrari',
      'Lotus',
      'Maserati',
      'Jaguar',
      'Zenvo',
      'Venturi',
      'Laraki',
      'Lamborghini',
    ];
    const models = [
      'Viper',
      'Stylus',
      'Cayman',
      'Sarthe',
      'Cerbera',
      'Costin',
      'Alpine',
      'Spyder',
      'Zonda',
      'Calibra',
      'Senna',
      'Urraco',
      'Sky',
      'CLK',
      'GTX',
      'GTR',
    ];
    const brand = brands[Math.floor(brands.length * Math.random())];
    const model = models[Math.floor(models.length * Math.random())];
    return `${brand} ${model}`;
  };

  private getRandomColor = () => {
    return `#${Math.random().toString(16).slice(2, 8)}`;
  };

  private getRandomCars = (qty = 100) => {
    return new Array(qty).fill(0).map(() => ({
      name: this.getRandomName(),
      color: this.getRandomColor(),
    }));
  };

  generateCars = async () => {
    const cars = this.getRandomCars();
    await Promise.all(cars.map((car) => API.createCar(car)));
    await this.updateGarage();
  };
}

export const services = new Services();
