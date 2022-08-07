export type car = {
  name: string;
  color: string;
  id: number;
};

export type getCarsData = {
  items: car[] | [];
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

export type extWinner = {
  wins: number;
  time: number;
  id: number;
  car: car;
};

export type getWinnersData = {
  items: extWinner[];
  count: string | null;
};

export type updateWinnerBody = Pick<winner, 'wins' | 'time'>;

export type animationState = {
  [index: string]: { driveId: number };
};

export type alarmId = {
  id: string;
  alarmId: NodeJS.Timer;
};
