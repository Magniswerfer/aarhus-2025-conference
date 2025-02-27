// routes/api/nav.ts
import { HandlerContext } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

// Define the shape of a navigation item from Sanity
interface SanityPage {
  title: string;
  slug: { current: string };
  navigationOrder: number;
}

export const handler = {
  async GET(_req: Request, _ctx: HandlerContext): Promise<Response> {
    try {
      //console.log("Nav API: Request received");
      
      // Fetch pages marked for navigation from Sanity with navigationOrder
      //console.log("Nav API: Fetching from Sanity...");
      const data = await client.fetch<SanityPage[]>(`
        *[_type == "page" && showInNavigation == true] | order(navigationOrder asc) {
          title,
          slug,
          navigationOrder
        }
      `);
      
      //console.log("Nav API: Sanity data received:", data);

      // Format pages for navigation, including the navigationOrder
      const navigationItems = data.map(page => ({
        path: `/${page.slug.current}`,
        label: page.title,
        hasDropdown: false,
        navigationOrder: page.navigationOrder
      }));
      
      //console.log("Nav API: Returning", navigationItems.length, "navigation items");

      // Return the navigation data as JSON
      return new Response(JSON.stringify(navigationItems), {
        headers: { 
          "Content-Type": "application/json"
        },
      });
    } catch (error) {
      //console.error("Nav API: Error fetching data:", error);
      return new Response(JSON.stringify({ 
        error: "Failed to fetch navigation data",
        details: error instanceof Error ? error.message : String(error)
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};