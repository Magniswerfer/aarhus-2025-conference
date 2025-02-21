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
        "wip",
      ];

      const results = await Promise.all(
        types.map(async (type) => {
          const data = await client.fetch(submissionPageQuery(type));
          return data?.submissionDates
            ? {
                type,
                names: [data.title || type],
                dates: data.submissionDates,
              }
            : null;
        })
      );

      // Filter out null values
      const validResults = results.filter((item) => item !== null);

      return new Response(JSON.stringify(validResults), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching submission dates:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch submission dates" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
