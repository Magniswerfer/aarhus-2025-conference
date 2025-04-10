import { Handlers } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";
import { submissionPageQuery } from "../../utils/sanityParser.tsx";

export const handler: Handlers = {
  async GET(_req) {
    try {
      const types = [
        "workshops",
        "critiques",
        "demos",
        "doctoral-consortium",
        "papers",
        "work-in-progress",
      ];

      const results = await Promise.all(
        types.map(async (type) => {
          try {
            const data = await client.fetch(submissionPageQuery(type));

            if (!data) {
              return null;
            }

            const result = {
              type,
              names: [data.title || type],
              dates: data.submissionDates || null,
              conferenceDates: data.conferenceDates || null,
            };

            return result;
          } catch (err) {
            console.error(`Error fetching ${type}:`, err);
            return null;
          }
        }),
      );

      // Filter out null values
      const validResults = results.filter((item) => item !== null);

      // Find the first result that has conferenceDates
      const conferenceDates = validResults.find((result) =>
        result?.conferenceDates
      )?.conferenceDates || null;

      return new Response(
        JSON.stringify({
          submissions: validResults,
          conferenceDates,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error: unknown) {
      console.error("Error in submission-dates API:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Unknown error";
      return new Response(
        JSON.stringify({
          error: "Failed to fetch submission dates",
          details: errorMessage,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
