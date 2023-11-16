import { HabitsData } from "../types/Types";
import { HABITS_API_URL } from "./utils";

export async function fetchPage(id: string): Promise<HabitsData> {
  const response = await fetch(`${HABITS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}

export async function sendHabitCompleted(pageId: string, habitId: string): Promise<HabitsData> {
  const response = await fetchPost(`${HABITS_API_URL}/complete-habit`, { pageId, habitId });
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}

export async function sendCreateHabit(pageId: string, habitName: string): Promise<HabitsData> {
  const response = await fetchPost(`${HABITS_API_URL}`, { pageId, habitName });
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}

export async function sendDeleteHabit(pageId: string, habitId: string): Promise<HabitsData> {
  const response = await fetchPost(`${HABITS_API_URL}/delete-habit`, { pageId, habitId });
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