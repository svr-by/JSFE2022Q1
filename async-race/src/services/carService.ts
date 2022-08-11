import { control } from '../components/control/control';
import { API } from '../api/api';
import { state } from '../state/state';
import { layoutService } from './layoutService';
import { CreateCarBody } from '../types/types';

class CarService {
  async createCar(car: CreateCarBody) {
    await API.createCar(car);
    layoutService.updateControl();
    layoutService.updateGarage();
  }

  async removeCar(id: number) {
    await API.deleteCar(id);
    layoutService.updateControl();
    await layoutService.updateGarage();
    await API.deleteWinner(id);
    layoutService.updateGarage();
  }

  async selectCar(id: string | undefined) {
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
  }

  async updateCar(carProps: CreateCarBody) {
    if (state.selectedCar) {
      await API.updateCar(state.selectedCar.id, carProps);
    }
    layoutService.updateControl();
    await layoutService.updateGarage();
    state.selectedCar = null;
  }

  async generateCars() {
    const cars = this.getRandomCars();
    await Promise.all(cars.map((car) => API.createCar(car)));
    layoutService.updateGarage();
  }

  private getRandomName() {
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
  }

  private getRandomColor() {
    return `#${Math.random().toString(16).slice(2, 8)}`;
  }

  private getRandomCars(qty = 100) {
    return new Array(qty).fill(0).map(() => ({
      name: this.getRandomName(),
      color: this.getRandomColor(),
    }));
  }
}

export const carService = new CarService();
