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

class APIservices {
  base: string;
  garage: string;
  engine: string;
  winners: string;

  constructor() {
    this.base = 'http://127.0.0.1:3000';
    this.garage = `${this.base}/garage`;
    this.engine = `${this.base}/engine`;
    this.winners = `${this.base}/winners`;
  }

  getCars = async (page: number, limit = 7): Promise<getCarsData | undefined> => {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`).catch((err: Error) =>
      console.log(err.message)
    );
    if (response && response.ok) {
      return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
      };
    }
  };

  getCar = async (id: number): Promise<car> => {
    const response = await fetch(`${this.garage}/${id}`);
    return await response.json();
  };

  createCar = async (body: createCarBody): Promise<car> => {
    const response = await fetch(`${this.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  };

  deleteCar = async (id: number): Promise<Record<string, never>> => {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  };

  updateCar = async (id: number, body: createCarBody): Promise<car> => {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  };

  private updateEngine = async (id: number, status: string): Promise<raceParams> => {
    const response = await fetch(`${this.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    }).catch();
    return !response.ok ? { success: false } : await response.json();
  };

  startEngine = async (id: number): Promise<raceParams> => {
    return await this.updateEngine(id, engineStatus.started);
  };

  stopEngine = async (id: number): Promise<raceParams> => {
    return await this.updateEngine(id, engineStatus.stopped);
  };

  driveEngine = async (id: number): Promise<raceStatus> => {
    const response = await fetch(`${this.engine}?id=${id}&status=${engineStatus.drive}`, {
      method: 'PATCH',
    }).catch();
    return !response.ok ? { success: false } : await response.json();
  };

  getSortOrder = (sort?: string, order?: string) => {
    return sort && order ? `&_sort=${sort}&_order=${order}` : '';
  };

  getWinners = async (page: number, sort?: string, order?: string, limit = 10): Promise<getWinnersData | undefined> => {
    const response = await fetch(
      `${this.winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`
    ).catch((err: Error) => console.log(err.message));
    if (response && response.ok) {
      const winnersArr: winner[] = await response.json();
      return {
        items: await Promise.all(winnersArr.map(async (winner) => ({ ...winner, car: await this.getCar(winner.id) }))),
        count: response.headers.get('X-Total-Count'),
      };
    }
  };

  getWinner = async (id: number): Promise<winner> => {
    const response = await fetch(`${this.winners}/${id}`);
    return await response.json();
  };

  createWinner = async (body: winner): Promise<winner> => {
    const response = await fetch(`${this.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  };

  deleteWinner = async (id: number): Promise<Record<string, never>> => {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  };

  updateWinner = async (id: number, body: updateWinnerBody): Promise<winner> => {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  };
}

export const API = new APIservices();
