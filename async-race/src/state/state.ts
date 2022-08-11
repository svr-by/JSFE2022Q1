import { Car, ExtWinner, AnimationState, AlarmId } from '../types/types';
import { Track } from '../components/garage/track';

class State {
  garagePageLimit = 7;
  garagePage = 1;
  garageTotalCars = 0;
  garageCars: Car[] = [];
  garageTracks: Track[] = [];

  winnersPageLimit = 10;
  winnersPage = 1;
  winnersTotalCars = 1;
  winnersCars: ExtWinner[] = [];
  winnersSort: 'id' | 'wins' | 'time' = 'wins';
  winnersSortOrder: 'ASC' | 'DESC' = 'DESC';

  selectedCar: Car | null = null;

  view: 'garage' | 'winners' = 'garage';

  animation: AnimationState = {};
  animationAlarm: AlarmId[] = [];
}

export const state = new State();
