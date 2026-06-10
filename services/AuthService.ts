import { APIRequestContext, expect } from '@playwright/test';
import { AuthAPI } from '../pages/AuthAPI';

export class AuthService {
  private authAPI: AuthAPI;

  constructor(request: APIRequestContext) {
    this.authAPI = new AuthAPI(request);
  }

  async registerAndValidate(payload: { email: string; password: string }) {
    const response = await this.authAPI.register(payload);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
    return body;
  }

  async loginAndValidate(payload: { email: string; password: string }) {
    const response = await this.authAPI.login(payload);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
    return body;
  }

  async registerFailAndValidate(payload: { email: string }) {
    const response = await this.authAPI.register(payload);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
    return body;
  }
}
