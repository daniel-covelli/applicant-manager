import { env } from "@/env";

const BASE_URL = 'https://harvest.greenhouse.io/v1';
const AUTH_TOKEN = env.GREEN_HOUSE_API_KEY

const headers = {
  'Authorization': `Basic ${btoa(AUTH_TOKEN + ":")}`,
  'Content-Type': 'application/json',
};

async function fetchWrapper(route: string, options: RequestInit = {}): Promise<unknown> {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { ...options, headers: { ...headers, ...options.headers } });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as unknown
  } catch (error) {
    console.error(`Error fetching from ${BASE_URL}${route}:`, error);
    throw error;
  }
}

export const getApplications = () =>
  fetchWrapper("/applications");
