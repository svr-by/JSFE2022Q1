import { car, extWinner, animationState, alarmId } from '../types/types';
import { Track } from '../components/garage/track';

class State {
  garagePageLimit = 7;
  garagePage = 1;
  garageTotalCars = 0;
  garageCars: car[] = [];
  garageTracks: Track[] = [];

  winnersPageLimit = 10;
  winnersPage = 1;
  winnersTotalCars = 1;
  winnersCars: extWinner[] = [];
  winnersSort: 'id' | 'wins' | 'time' = 'wins';
  winnersSortOrder: 'ASC' | 'DESC' = 'DESC';

  selectedCar: car | null = null;

  view: 'garage' | 'winners' = 'garage';

  animation: animationState = {};
  animationAlarm: alarmId[] = [];
}

export const state = new State();
