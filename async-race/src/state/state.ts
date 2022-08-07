import { car, extWinner, animationState, alarmId } from '../types/types';
import { Track } from '../components/garage/track';

class State {
  garagePageLimit = 7;
  garagePage = 1;
  garageTotalCars = 0;
  garageCars: car[] = [];
  garageTracks: Track[] = [];

  winnersPageLimit = 7;
  winnersPage = 1;
  winnersTotalCars = 1;
  winnersCars: extWinner[] = [
    {
      wins: 1,
      time: 10,
      id: 1,
      car: {
        name: 'Tesla',
        color: '#e6e6fa',
        id: 1,
      },
    },
  ];

  selectedCar: car | null = null;

  view: 'garage' | 'winners' = 'garage';
  sort: 'id' | 'wins' | 'time' = 'wins';
  sortOrder: 'ASC' | 'DESC' = 'DESC';

  animation: animationState = {};
  animationAlarm: alarmId[] = [];
}

export const state = new State();
