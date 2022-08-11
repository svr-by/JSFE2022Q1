export type Car = {
  name: string;
  color: string;
  id: number;
};

export type GetCarsData = {
  items: Car[] | [];
  count: string | null;
};

export type CreateCarBody = Pick<Car, 'name' | 'color'>;

export type RaceParams = {
  velocity: number;
  distance: number;
};

export type RaceStatus = {
  success: boolean;
};

export enum EngineStatus {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export type Winner = {
  wins: number;
  time: number;
  id: number;
};

export type ExtWinner = {
  wins: number;
  time: number;
  id: number;
  car: Car;
};

export type GetWinnersData = {
  items: ExtWinner[];
  count: string | null;
};

export type UpdateWinnerBody = Pick<Winner, 'wins' | 'time'>;

export type AnimationState = {
  [index: string]: { driveId: number };
};

export type AlarmId = {
  id: string;
  alarmId: NodeJS.Timer;
};

export type Racer = {
  success: boolean;
  id: string;
  time: number;
};
