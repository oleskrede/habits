import { Page } from "../types/Types";
import { HABITS_API_URL } from "./utils";

export async function fetchPage(id: string): Promise<Page> {
  const response = await fetch(`${HABITS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}