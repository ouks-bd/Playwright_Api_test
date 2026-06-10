import { APIResponse } from '@playwright/test';

export async function parseResponse(response: APIResponse) {
  const status = response.status();
  const body   = await response.json().catch(() => null);
  return { status, body };
}

export function assertStatus(response: APIResponse, expectedStatus: number) {
  if (response.status() !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus} but got ${response.status()}`);
  }
}
