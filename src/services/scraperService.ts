import axios from "axios";
import { getUrl } from "../apiUrls";
import { EventPayload, NewsPayload } from "../types/types";

export const scrapeEvents = async (): Promise<EventPayload[]> => {
  const response = await axios.get(getUrl("/scrape/events"));
  return response.data;
};

export const scrapeNews = async (source: string): Promise<NewsPayload[]> => {
  const response = await axios.get(getUrl(`/scrape/news/${source}`));
  return response.data;
};

export const saveData = async <T>(
  payload: T[],
  type: "Event" | "News"
): Promise<void> => {
  const endpoint = type === "Event" ? "/events" : "/news";
  await axios.post(getUrl(`/kiosk-api${endpoint}`), payload);
};
