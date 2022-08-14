export type Car = {
  name: string;
  color: string;
  id: number;
};

export type CarsData = {
  items: Car[] | [];
  count: string | null;
};

export type CarParams = Pick<Car, 'name' | 'color'>;

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

export type WinnersData = {
  items: ExtWinner[];
  count: string | null;
};

export type WinnerParams = Pick<Winner, 'wins' | 'time'>;

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

export type NewElement = {
  tag: string;
  text?: string;
  classes?: string[];
  id?: string;
};
