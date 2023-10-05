import { Page } from "../types/Types";
import { habitsApiUrl } from "./utils";

export async function fetchPage(id: string): Promise<Page> {
  const response = await fetch(`${habitsApiUrl}/${id}`);
  if (!response.ok) {
    throw new Error(`Network response status was ${response.status}`);
  }
  return await response.json();
}