import { APIRequestContext, expect } from '@playwright/test';
import { UserAPI } from '../pages/UserAPI';

export class UserService {
  private userAPI: UserAPI;

  constructor(request: APIRequestContext) {
    this.userAPI = new UserAPI(request);
  }

  async getUsersAndValidate(page = 1) {
    const response = await this.userAPI.getUsers(page);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    return body;
  }

  async createUserAndValidate(payload: { name: string; job: string }) {
    const response = await this.userAPI.createUser(payload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBe(payload.name);
    return body;
  }

  async updateUserAndValidate(id: number, payload: { name: string; job: string }) {
    const response = await this.userAPI.updateUser(id, payload);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    return body;
  }

  async deleteUserAndValidate(id: number) {
    const response = await this.userAPI.deleteUser(id);
    expect(response.status()).toBe(204);
  }
}
