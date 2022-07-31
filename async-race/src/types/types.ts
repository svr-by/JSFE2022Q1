export type car = {
  name: string;
  color: string;
  id: number;
};

export type getCarsData = {
  items: car[];
  count: string | null;
};

export type createCarBody = Pick<car, 'name' | 'color'>;

export type raceParams = {
  velocity: number;
  distance: number;
};

export type raceStatus = {
  success: boolean;
};

export enum engineStatus {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export type winner = {
  wins: number;
  time: number;
  id: number;
};

export type getWinnersData = {
  items: winner[];
  count: string | null;
};

export type updateWinnerBody = Pick<winner, 'wins' | 'time'>;
