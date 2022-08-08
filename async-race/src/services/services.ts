import { garage } from '../components/garage/garage';
import { winners } from '../components/winners/winners';
import { control } from '../components/control/control';
import { API } from '../api/api';
import { state } from '../state/state';
import { createCarBody, racer } from '../types/types';
import { Car } from '../components/garage/car';

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
    this.updateControl();
    await this.updateGarage();
    await API.deleteWinner(id);
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

  requestDrive = async (car: Car, actualDist: number) => {
    const id = car.elem.dataset.carId as string;
    const { velocity, distance } = await API.startEngine(+id);
    const time = Math.round(distance / velocity);
    state.animation[id] = car.animationRace(actualDist, time);
    return time;
  };

  requestDriveStatus = async (car: Car) => {
    const id = car.elem.dataset.carId as string;
    const { success } = await API.driveEngine(+id);
    if (!success) {
      window.cancelAnimationFrame(state.animation[id].driveId);
      const alarmId = car.animationAlarm();
      state.animationAlarm.push({ id, alarmId });
    }
    return { success, id };
  };

  requestStopDrive = async (car: Car) => {
    const id = car.elem.dataset.carId as string;
    if (state.animation[id]) {
      window.cancelAnimationFrame(state.animation[id].driveId);
    }
    this.clearAlarms(id);
    await API.stopEngine(+id);
    car.returnToStart();
  };

  clearAlarms = (id: string) => {
    for (let i = 0; i < state.animationAlarm.length; i++) {
      const alarm = state.animationAlarm[i];
      if (alarm.id === id) {
        clearInterval(alarm.alarmId);
        state.animationAlarm.splice(i, 1);
        i--;
      }
    }
  };

  startDriveAll = async () => {
    await this.stopDriveAll();
    const promises = state.garageTracks.map((track) => track.startDrive());
    const trackId = state.garageTracks.map((track) => track.carId) as number[];
    const winner = await this.findWinner(promises, trackId);
    console.log('winner', winner);
    await this.saveWinner(winner.id, winner.time);
  };

  findWinner = async (promises: Promise<racer>[], ids: number[]): Promise<racer> => {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = state.garageTracks.findIndex((track) => track.carId === +id);
      const succesRacers = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const succesInds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return this.findWinner(succesRacers, succesInds);
    }
    return { success, id, time };
  };

  stopDriveAll = async () => {
    await Promise.all(state.garageTracks.map((track) => track.stopDrive()));
  };

  saveWinner = async (id: string, time: number) => {
    const winner = await API.getWinner(+id);
    const winnerTime = +(time / 1000).toFixed(2);
    console.log('saveWinner:', winner, 'winnerTime:', winnerTime);
    if (winner.id) {
      await API.updateWinner(+id, {
        wins: ++winner.wins,
        time: time < winnerTime ? time : winnerTime,
      });
    } else {
      await API.createWinner({
        id: winner.id,
        wins: 1,
        time: winnerTime,
      });
    }
    // await this.updateWinners();
  };
}

export const services = new Services();
