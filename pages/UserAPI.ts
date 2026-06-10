import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { ENDPOINTS } from '../constants/endpoints';

export class UserAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getUsers(page = 1) {
    return await this.get(`${ENDPOINTS.USERS}?page=${page}`);
  }

  async getUserById(id: number) {
    return await this.get(ENDPOINTS.USER(id));
  }

  async createUser(payload: { name: string; job: string }) {
    return await this.post(ENDPOINTS.USERS, payload);
  }

  async updateUser(id: number, payload: { name: string; job: string }) {
    return await this.put(ENDPOINTS.USER(id), payload);
  }

  async patchUser(id: number, payload: Partial<{ name: string; job: string }>) {
    return await this.patch(ENDPOINTS.USER(id), payload);
  }

  async deleteUser(id: number) {
    return await this.delete(ENDPOINTS.USER(id));
  }
}
