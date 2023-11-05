import { Page } from "../types/Types";
import { HABITS_API_URL } from "./utils";

export async function fetchPage(id: string): Promise<Page> {
  const response = await fetch(`${HABITS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}

export async function sendHabitCompleted(pageId: string, habitId: string): Promise<Page> {
  const response = await fetchPost(`${HABITS_API_URL}/complete-habit`, { pageId, habitId });
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}

async function fetchPost(url: string, data?: any): Promise<any> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}