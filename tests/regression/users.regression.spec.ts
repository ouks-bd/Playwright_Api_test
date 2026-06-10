import { test, expect } from '@playwright/test';
import { ApiClient } from '../../pages/ApiClient';

test.describe('User Regression Tests', () => {

  test('GET users - validate response structure', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.getUsers(1);
    const body     = await response.json();
    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('per_page');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('total_pages');
    expect(Array.isArray(body.data)).toBeTruthy();
  });

  test('GET users - validate user object fields', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.getUsers(1);
    const body     = await response.json();
    const user     = body.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');
  });

  test('GET users - page 2 returns different data', async ({ request }) => {
    const client    = new ApiClient(request);
    const page1Res  = await client.users.getUsers(1);
    const page2Res  = await client.users.getUsers(2);
    const page1Body = await page1Res.json();
    const page2Body = await page2Res.json();
    expect(page1Body.data[0].id).not.toBe(page2Body.data[0].id);
  });

  test('POST create - response contains createdAt timestamp', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.createUser({ name: 'Test', job: 'Tester' });
    const body     = await response.json();
    expect(body.createdAt).toBeDefined();
    expect(new Date(body.createdAt).toString()).not.toBe('Invalid Date');
  });

  test('DELETE returns no body', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.deleteUser(2);
    expect(response.status()).toBe(204);
    const text = await response.text();
    expect(text).toBe('');
  });
});
