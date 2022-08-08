import { car } from '../../types/types';
import { layoutService } from '../../services/layoutService';
import { carService } from '../../services/carService';
import { racingService } from '../../services/racingService';
import { Button } from '../button/button';
import { Car } from './car';

export class Track {
  elem: HTMLElement;
  finish: HTMLElement;
  car: Car;
  btnSelect: Button;
  btnRemove: Button;
  btnStart: Button;
  btnStop: Button;
  carId: number | null;

  constructor() {
    this.elem = layoutService.createElement('div', '', ['track']);
    this.finish = layoutService.createElement('div', '', ['finish']);
    this.car = new Car();
    this.btnSelect = new Button('Select', undefined, ['button']);
    this.btnRemove = new Button('Remove', undefined, ['button']);
    this.btnStart = new Button('A', undefined, ['track__btn']);
    this.btnStop = new Button('B', undefined, ['track__btn']);
    this.carId = null;
  }

  render = ({ id, name, color }: car) => {
    this.carId = id;
    const trackControl = layoutService.createElement('div', '', ['track__control']);
    this.btnSelect.elem.dataset.carId = `${id}`;
    this.btnRemove.elem.dataset.carId = `${id}`;
    trackControl.append(this.btnSelect.elem);
    trackControl.append(this.btnRemove.elem);
    this.elem.append(trackControl);

    const trackRoad = layoutService.createElement('div', '', ['track__road']);
    const launcher = layoutService.createElement('div', '', ['launcher']);
    this.btnStart.elem.dataset.carId = `${id}`;
    this.btnStop.elem.dataset.carId = `${id}`;
    this.btnStop.elem.disabled = true;
    launcher.append(this.btnStart.elem);
    launcher.append(this.btnStop.elem);
    this.car.bodyColor = color;
    this.car.renderCarImg();
    this.car.elem.dataset.carId = `${id}`;
    const trackName = layoutService.createElement('h4', `${name}`, ['track__name']);
    this.finish.dataset.carId = `${id}`;
    trackRoad.append(launcher);
    trackRoad.append(this.car.elem);
    trackRoad.append(trackName);
    trackRoad.append(this.finish);
    this.elem.append(trackRoad);

    this.addListeners();

    return this.elem;
  };

  private addListeners = () => {
    this.btnRemove.elem.addEventListener('click', async () => await this.removeCar());

    this.btnSelect.elem.addEventListener('click', async () => await this.selectCar());

    this.btnStart.elem.addEventListener('click', async () => await this.startDrive());

    this.btnStop.elem.addEventListener('click', async () => await this.stopDrive());
  };

  removeCar = async () => {
    const id = this.btnRemove.elem.dataset.carId;
    if (id) await carService.removeCar(+id);
  };

  selectCar = async () => {
    let id = this.btnSelect.elem.dataset.carId;
    if (id) {
      document.querySelectorAll('.select').forEach((btn) => {
        if ((btn as HTMLElement).dataset.carId !== id) btn.classList.remove('select');
      });
      this.btnSelect.elem.classList.toggle('select');

      id = this.btnSelect.elem.classList.contains('select') ? id : undefined;
      await carService.selectCar(id);
    }
  };

  startDrive = async () => {
    this.btnStart.elem.disabled = true;
    const distance = layoutService.getDistance(this.car.elem, this.finish) + this.car.width * 0.75;
    const time = await racingService.requestDrive(this.car, distance);
    this.btnStop.elem.disabled = false;
    const { success, id } = await racingService.requestDriveStatus(this.car);
    return { success, id, time };
  };

  stopDrive = async () => {
    this.btnStop.elem.disabled = true;
    await racingService.requestStopDrive(this.car);
    this.btnStart.elem.disabled = false;
  };
}
