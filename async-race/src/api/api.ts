import {
  Car,
  CarsData,
  CarParams,
  RaceParams,
  RaceStatus,
  EngineStatus,
  Winner,
  WinnersData,
  WinnerParams,
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

  async getCars(page: number, limit = 7): Promise<CarsData | undefined> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    if (response && response.ok) {
      return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
      };
    }
  }

  async getCar(id: number): Promise<Car> {
    const response = await fetch(`${this.garage}/${id}`);
    return await response.json();
  }

  async createCar(body: CarParams): Promise<Car> {
    const response = await fetch(`${this.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async deleteCar(id: number): Promise<Record<string, never>> {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async updateCar(id: number, body: CarParams): Promise<Car> {
    const response = await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  private async updateEngine(id: number, status: string): Promise<RaceParams> {
    const response = await fetch(`${this.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    return await response.json();
  }

  startEngine(id: number): Promise<RaceParams> {
    return this.updateEngine(id, EngineStatus.started);
  }

  stopEngine(id: number): Promise<RaceParams> {
    return this.updateEngine(id, EngineStatus.stopped);
  }

  async driveEngine(id: number): Promise<RaceStatus> {
    const response = await fetch(`${this.engine}?id=${id}&status=${EngineStatus.drive}`, {
      method: 'PATCH',
    });
    return !response.ok ? { success: false } : await response.json();
  }

  getSortOrder(sort?: string, order?: string) {
    return sort && order ? `&_sort=${sort}&_order=${order}` : '';
  }

  async getWinners(page: number, sort?: string, order?: string, limit = 10): Promise<WinnersData | undefined> {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`);
    if (response && response.ok) {
      const winnersArr: Winner[] = await response.json();
      return {
        items: await Promise.all(winnersArr.map(async (winner) => ({ ...winner, car: await this.getCar(winner.id) }))),
        count: response.headers.get('X-Total-Count'),
      };
    }
  }

  async getWinner(id: number): Promise<Winner> {
    const response = await fetch(`${this.winners}/${id}`);
    return await response.json();
  }

  async createWinner(body: Winner): Promise<Winner> {
    const response = await fetch(`${this.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async deleteWinner(id: number): Promise<Record<string, never>> {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async updateWinner(id: number, body: WinnerParams): Promise<Winner> {
    const response = await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}

export const API = new APIservices();
