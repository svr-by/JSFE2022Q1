import { car, extWinner } from '../types/types';

class State {
  garagePage = 1;
  garageTotalCars = 4;
  garageCars: car[] = [
    {
      name: 'Tesla',
      color: '#e6e6fa',
      id: 1,
    },
    {
      name: 'BMW',
      color: '#fede00',
      id: 2,
    },
    {
      name: 'Mersedes',
      color: '#6c779f',
      id: 3,
    },
    {
      name: 'Ford',
      color: '#ef3c40',
      id: 4,
    },
  ];

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

  view: 'garage' | 'winners' = 'garage';
  sort: 'id' | 'wins' | 'time' = 'wins';
  sortOrder: 'ASC' | 'DESC' = 'DESC';

  animation = {};
}

export const state = new State();
