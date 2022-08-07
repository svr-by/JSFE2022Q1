import { car } from '../../types/types';
import { services } from '../../services/services';
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

  constructor() {
    this.elem = services.createElement('div', '', ['track']);
    this.finish = services.createElement('div', '', ['finish']);
    this.car = new Car();
    this.btnSelect = new Button('Select', undefined, ['button']);
    this.btnRemove = new Button('Remove', undefined, ['button']);
    this.btnStart = new Button('A', undefined, ['track__btn']);
    this.btnStop = new Button('B', undefined, ['track__btn']);
  }

  render = ({ id, name, color }: car) => {
    const trackControl = services.createElement('div', '', ['track__control']);
    this.btnSelect.elem.dataset.carId = `${id}`;
    this.btnRemove.elem.dataset.carId = `${id}`;
    trackControl.append(this.btnSelect.elem);
    trackControl.append(this.btnRemove.elem);
    this.elem.append(trackControl);

    const trackRoad = services.createElement('div', '', ['track__road']);
    const launcher = services.createElement('div', '', ['launcher']);
    this.btnStart.elem.dataset.carId = `${id}`;
    this.btnStop.elem.dataset.carId = `${id}`;
    this.btnStop.elem.disabled = true;
    launcher.append(this.btnStart.elem);
    launcher.append(this.btnStop.elem);
    this.car.bodyColor = color;
    this.car.renderCarImg();
    this.car.elem.dataset.carId = `${id}`;
    const trackName = services.createElement('h4', `${name}`, ['track__name']);
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
    this.btnRemove.elem.addEventListener('click', async (event) => {
      const id = (event.target as HTMLElement).dataset.carId;
      if (id) await services.removeCar(+id);
    });

    this.btnSelect.elem.addEventListener('click', async (event) => {
      let id = (event.target as HTMLElement).dataset.carId;
      if (id) {
        document.querySelectorAll('.select').forEach((btn) => {
          if ((btn as HTMLElement).dataset.carId !== id) btn.classList.remove('select');
        });
        this.btnSelect.elem.classList.toggle('select');

        id = this.btnSelect.elem.classList.contains('select') ? id : undefined;
        await services.selectCar(id);
      }
    });

    this.btnStart.elem.addEventListener('click', this.startDrive);

    this.btnStop.elem.addEventListener('click', this.stopDrive);
  };

  private getCoordinates = (element: HTMLElement) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  private getDistance = (elem1: HTMLElement, elem2: HTMLElement) => {
    const coords1 = this.getCoordinates(elem1);
    const coords2 = this.getCoordinates(elem2);
    return Math.hypot(coords2.x - coords1.x, coords2.y - coords1.y);
  };

  stopDrive = async () => {
    this.btnStop.elem.disabled = true;
    await services.requestStopDrive(this.car);
    this.btnStart.elem.disabled = false;
  };

  startDrive = async () => {
    this.btnStart.elem.disabled = true;
    const distance = this.getDistance(this.car.elem, this.finish) + this.car.width * 0.75;
    await services.requestDrive(this.car, distance);
    this.btnStop.elem.disabled = false;
    await services.requestDriveStatus(this.car);
  };
}
