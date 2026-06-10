import { APIRequestContext } from '@playwright/test';
import { HEADERS } from '../constants/headers';
import { logger } from '../utils/logger';

export class BaseAPI {
  protected request: APIRequestContext;
  protected baseURL: string;

  constructor(request: APIRequestContext) {
  this.request = request;
  this.baseURL = `${process.env.BASE_URL ?? 'https://reqres.in'}${process.env.API_VERSION ?? '/api'}`;
}
  protected async get(endpoint: string) {
    logger.info(`GET ${this.baseURL}${endpoint}`);
    return await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: HEADERS.JSON,
    });
  }

  protected async post(endpoint: string, body: object) {
    logger.info(`POST ${this.baseURL}${endpoint}`);
    return await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: HEADERS.JSON,
      data: body,
    });
  }

  protected async put(endpoint: string, body: object) {
    logger.info(`PUT ${this.baseURL}${endpoint}`);
    return await this.request.put(`${this.baseURL}${endpoint}`, {
      headers: HEADERS.JSON,
      data: body,
    });
  }

  protected async patch(endpoint: string, body: object) {
    logger.info(`PATCH ${this.baseURL}${endpoint}`);
    return await this.request.patch(`${this.baseURL}${endpoint}`, {
      headers: HEADERS.JSON,
      data: body,
    });
  }

  protected async delete(endpoint: string) {
    logger.info(`DELETE ${this.baseURL}${endpoint}`);
    return await this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: HEADERS.JSON,
    });
  }
}
