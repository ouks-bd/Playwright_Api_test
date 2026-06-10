import { test, expect } from '@playwright/test';
import { ApiClient } from '../../pages/ApiClient';
import users from '../../fixtures/users.json';
import { randomName, randomJob } from '../../utils/randomData';

test.describe('User CRUD Operations', () => {

  test('GET all users - page 1', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.users.getUsers(1);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.page).toBe(1);
  });

  test('GET user by ID', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.users.getUserById(2);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
  });

  test('GET user not found - 404', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.users.getUserById(9999);
    expect(response.status()).toBe(404);
  });

  test('POST create user', async ({ request }) => {
    const client   = new ApiClient(request);
    const payload  = { name: randomName(), job: randomJob() };
    const response = await client.users.createUser(payload);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.createdAt).toBeDefined();
  });

  test('PUT update user', async ({ request }) => {
    const client   = new ApiClient(request);
    const payload  = { name: 'Updated Name', job: 'Updated Job' };
    const response = await client.users.updateUser(2, payload);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.updatedAt).toBeDefined();
  });

  test('PATCH partial update user', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.patchUser(2, { name: 'Patched Name' });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Patched Name');
  });

  test('DELETE user - 204', async ({ request }) => {
    const client   = new ApiClient(request);
    const response = await client.users.deleteUser(2);
    expect(response.status()).toBe(204);
  });
});
