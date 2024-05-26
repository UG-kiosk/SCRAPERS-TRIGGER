import { app, InvocationContext, Timer } from "@azure/functions";
import { scrapeEvents, scrapeNews, saveData } from "../services/scraperService";
import { ScraperSource } from "../types/enums";
import { EventPayload, NewsPayload } from "../types/types";

export async function ScrapersTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  try {
    context.log("Starting scraping process...");

    await Promise.allSettled([
      scrapeAndSaveEvents(),
      scrapeAndSaveNews(ScraperSource.MFI),
      scrapeAndSaveNews(ScraperSource.INF),
    ]);

    context.log("Scraping process completed successfully.");
  } catch (error) {
    context.log("Error occurred during scraping:", error);
  }
}

async function scrapeAndSaveEvents(): Promise<void> {
  const eventsData: EventPayload[] = await scrapeEvents();
  await saveData<EventPayload>(eventsData, "Event");
}

async function scrapeAndSaveNews(source: string): Promise<void> {
  const newsData: NewsPayload[] = await scrapeNews(source);
  await saveData<NewsPayload>(newsData, "News");
}
