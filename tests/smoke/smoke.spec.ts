import { test, expect } from '@playwright/test';
import { ApiClient } from '../../pages/ApiClient';

test.describe('Smoke Tests', () => {
  test('GET /users returns 200', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.users.getUsers();
    expect(response.status()).toBe(200);
  });

  

  test('GET /users/2 returns valid user', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.users.getUserById(2);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe(2);
  });                              
  
  

  test('POST /login returns token', async ({ request }) => {
  const client = new ApiClient(request);
  const response = await client.auth.login({
    email:    'eve.holt@reqres.in',
    password: 'cityslicka',        // ✅ correct for login
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toBeDefined();
  
});
});
