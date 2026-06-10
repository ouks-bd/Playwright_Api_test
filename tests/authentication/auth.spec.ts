import { test, expect } from '@playwright/test';
import { ApiClient } from '../../pages/ApiClient';
import auth from '../../fixtures/auth.json';

test.describe('Authentication Tests', () => {

  test('POST /register - success', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.auth.register(auth.registerSuccess);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
  });

  test('POST /register - missing password returns 400', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.auth.register(auth.registerFail);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('POST /login - success returns token', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.auth.login(auth.loginSuccess);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  test('POST /login - missing password returns 400', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.auth.login(auth.loginFail);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });
});
