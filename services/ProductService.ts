import { APIRequestContext, expect } from '@playwright/test';
import { ProductAPI } from '../pages/ProductAPI';

export class ProductService {
  private productAPI: ProductAPI;

  constructor(request: APIRequestContext) {
    this.productAPI = new ProductAPI(request);
  }

  async getProductsAndValidate(page = 1) {
    const response = await this.productAPI.getProducts(page);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    return body;
  }

  async getProductByIdAndValidate(id: number) {
    const response = await this.productAPI.getProductById(id);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe(id);
    return body;
  }
}
