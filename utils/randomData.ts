export function randomName(): string {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
  return names[Math.floor(Math.random() * names.length)];
}

export function randomJob(): string {
  const jobs = ['Engineer', 'Designer', 'Manager', 'Analyst', 'Developer'];
  return jobs[Math.floor(Math.random() * jobs.length)];
}

export function randomEmail(): string {
  return `test_${Date.now()}@example.com`;
}
