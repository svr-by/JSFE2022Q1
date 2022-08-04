import { car } from '../../types/types';
import { services } from '../../services/services';
import { Button } from '../button/button';
import { Car } from './car';

export class Track {
  elem: HTMLElement;
  car: Car;
  btnSelect: Button;
  btnRemove: Button;
  btnStart: Button;
  btnStop: Button;

  constructor() {
    this.elem = document.createElement('div');
    this.car = new Car();
    this.btnSelect = new Button('Select', undefined, ['button']);
    this.btnRemove = new Button('Remove', undefined, ['button']);
    this.btnStart = new Button('A', undefined, ['track__btn']);
    this.btnStop = new Button('B', undefined, ['track__btn']);
  }

  render = ({ id, name, color }: car) => {
    this.elem.classList.add('track');
    const trackControl = services.createElement('div', '', ['track__control']);
    this.btnSelect.elem.dataset.carId = `${id}`;
    this.btnRemove.elem.dataset.carId = `${id}`;
    const trackName = services.createElement('h4', `${name}`, ['track__name']);
    trackControl.append(this.btnSelect.elem);
    trackControl.append(this.btnRemove.elem);
    trackControl.append(trackName);
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
    const finish = services.createElement('div', '', ['finish']);
    trackRoad.append(launcher);
    trackRoad.append(this.car.elem);
    trackRoad.append(finish);
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
  };
}
