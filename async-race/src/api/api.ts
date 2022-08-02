import {
  car,
  getCarsData,
  createCarBody,
  raceParams,
  raceStatus,
  engineStatus,
  winner,
  getWinnersData,
  updateWinnerBody,
} from '../types/types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 10): Promise<getCarsData> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<car> => {
  const response = await fetch(`${garage}/${id}`);
  return await response.json();
};

export const createCar = async (body: createCarBody): Promise<car> => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const deleteCar = async (id: number): Promise<Record<string, never>> => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};

export const updateCar = async (id: number, body: createCarBody): Promise<car> => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

const updateEngine = async (id: number, status: string): Promise<raceParams | raceStatus> => {
  const response = await fetch(`${engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  }).catch();
  return !response.ok ? { success: false } : await response.json();
};

export const startEngine = async (id: number): Promise<raceParams | raceStatus> => {
  return await updateEngine(id, engineStatus.started);
};

export const stopEngine = async (id: number): Promise<raceParams | raceStatus> => {
  return await updateEngine(id, engineStatus.stopped);
};

export const driveEngine = async (id: number): Promise<raceParams | raceStatus> => {
  return await updateEngine(id, engineStatus.drive);
};

const getSortOrder = (sort?: string, order?: string) => {
  return sort && order ? `&_limit=${sort}&_limit=${order}` : '';
};

export const getWinners = async (page: number, limit = 10, sort?: string, order?: string): Promise<getWinnersData> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const winnersArr: winner[] = await response.json();
  return {
    items: await Promise.all(winnersArr.map(async (winner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<winner> => {
  const response = await fetch(`${winners}/${id}`);
  return await response.json();
};

export const createWinner = async (body: winner): Promise<winner> => {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const deleteWinner = async (id: number): Promise<Record<string, never>> => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
};

export const updateWinner = async (id: number, body: updateWinnerBody): Promise<winner> => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
