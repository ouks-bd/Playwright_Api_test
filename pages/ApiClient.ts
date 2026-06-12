import { APIRequestContext } from '@playwright/test';
import { UserAPI }    from './UserAPI';
import { AuthAPI }    from './AuthAPI';
import { ProductAPI } from './ProductAPI';

export class ApiClient {
  users:    UserAPI;
  auth:     AuthAPI;
  products: ProductAPI;

  
  
  constructor(request: APIRequestContext) {
    this.users    = new UserAPI(request);
    this.auth     = new AuthAPI(request);
    this.products = new ProductAPI(request);
  }
}
