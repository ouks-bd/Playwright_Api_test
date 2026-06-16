import { test, expect } from '@playwright/test';
import { ApiClient } from '../../pages/ApiClient';
import { randomName, randomJob } from '../../utils/randomData';

test.describe('User CRUD Operations', () => {
  let client: ApiClient;

  test.beforeEach(({ request }) => {
    client = new ApiClient(request);
  });

  test('GET all users - page 1', async () => {
    const response = await client.users.getUsers(1);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.page).toBe(1);
  });

  test('GET user by ID', async () => {
    const response = await client.users.getUserById(2);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
  });

  test('GET user not found - 404', async () => {
    const response = await client.users.getUserById(9999);

    expect(response.status()).toBe(404);
  });

  test('POST create user', async () => {
    const payload = { name: randomName(), job: randomJob() };
    const response = await client.users.createUser(payload);
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.createdAt).toBeDefined();
  });

  test('PUT update user', async () => {
    const payload = { name: 'Updated Name', job: 'Updated Job' };
    const response = await client.users.updateUser(2, payload);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.name).toBe(payload.name);
    expect(body.updatedAt).toBeDefined();
  });

  test('PATCH partial update user', async () => {
    const response = await client.users.patchUser(2, { name: 'Patched Name' });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.name).toBe('Patched Name');
  });

  test('DELETE user - 204', async () => {
    const response = await client.users.deleteUser(2);

    expect(response.status()).toBe(204);
  });
});
