import { car, extWinner } from '../types/types';

class State {
  garagePageLimit = 7;
  garagePage = 1;
  garageTotalCars = 0;
  garageCars: car[] = [];

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

  animation = {};
}

export const state = new State();
