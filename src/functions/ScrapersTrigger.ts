import { app, InvocationContext, Timer } from "@azure/functions";
import axios from "axios";

export async function ScrapersTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  try {
    context.log("Start scrapers");

    const eventsResponse = await axios.get(
      "http://localhost:3001/scrape/events"
    );
    const eventsData = eventsResponse.data;

    await postDataToEndpoint(
      eventsData,
      "http://localhost:5202/kiosk-api/events"
    );

    const mfiResponse = await axios.get(
      "http://localhost:3001/scrapers-kiosk-api/scrape/news/mfi"
    );
    const mfiData = mfiResponse.data;

    await postDataToEndpoint(mfiData, "http://localhost:5202/kiosk-api/news");

    const infResponse = await axios.get(
      "http://localhost:3001/scrapers-kiosk-api/scrape/news/inf"
    );
    const infData = infResponse.data;

    await postDataToEndpoint(infData, "http://localhost:5202/kiosk-api/news");

    context.log("Scraping successful");
  } catch (error) {
    context.log("Error during scraping:", error);
  }
}

async function postDataToEndpoint(
  data: any[],
  endpoint: string
): Promise<void> {
  try {
    for (const item of data) {
      let payload;
      if (endpoint.includes("events")) {
        payload = {
          eventDetails: {
            name: item.name,
            content: item.content,
          },
          url: item.url,
          date: new Date().toISOString(),
          language: "Pl",
        };
      } else if (endpoint.includes("news")) {
        payload = {
          leadingPhoto: item.leadingPhoto,
          photos: item.photos,
          link: item.link,
          datetime: new Date().toISOString(),
          newsDetails: {
            title: item.title,
            shortBody: item.shortBody,
            body: item.body,
          },
          source: endpoint.includes("mfi") ? "MFI" : "INF",
          category: "NEWS",
          sourceLanguage: "Pl",
        };
      }

      await axios.post(endpoint, payload);

      console.log(`Posted data to ${endpoint}.`);
    }
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
  }
}

app.timer("ScrapersTrigger", {
  schedule: "0 0 0 * * *",
  handler: ScrapersTrigger,
});
