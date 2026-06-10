import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './BaseAPI';
import { ENDPOINTS } from '../constants/endpoints';

export class ProductAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getProducts(page = 1) {
    return await this.get(`${ENDPOINTS.UNKNOWN}?page=${page}`);
  }

  async getProductById(id: number) {
    return await this.get(`${ENDPOINTS.UNKNOWN}/${id}`);
  }
}
