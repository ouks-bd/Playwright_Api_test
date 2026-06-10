import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { ENDPOINTS } from '../constants/endpoints';

export class AuthAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async register(payload: { email: string; password?: string }) {
    return await this.post(ENDPOINTS.REGISTER, payload);
  }

  async login(payload: { email: string; password?: string }) {
    return await this.post(ENDPOINTS.LOGIN, payload);
  }
}
