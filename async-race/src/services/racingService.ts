import { API } from '../api/api';
import { state } from '../state/state';
import { racer } from '../types/types';
import { Car } from '../components/garage/car';
import { garage } from '../components/garage/garage';

class RacingService {
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
      // const alarmId = car.animationAlarm();
      // state.animationAlarm.push({ id, alarmId });
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
    garage.showWinner(winner);
    await this.saveWinner(winner.id, winner.time);
  };

  findWinner = async (promises: Promise<racer>[], ids: number[]): Promise<racer> => {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = state.garageTracks.findIndex((track) => track.carId === +id);
      const succesRacers = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const succesInds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return await this.findWinner(succesRacers, succesInds);
    }
    return { success, id, time };
  };

  stopDriveAll = async () => {
    await Promise.all(state.garageTracks.map((track) => track.stopDrive()));
  };

  saveWinner = async (id: string, time: number) => {
    const winner = await API.getWinner(+id);
    const winnerTime = +(time / 1000).toFixed(2);
    if (winner.id) {
      await API.updateWinner(+id, {
        wins: ++winner.wins,
        time: time < winnerTime ? time : winnerTime,
      });
    } else {
      await API.createWinner({
        id: +id,
        wins: 1,
        time: winnerTime,
      });
    }
  };
}

export const racingService = new RacingService();
