// routes/_middleware.ts
import { FreshContext } from "$fresh/server.ts";
import { getNavigationItems } from "../utils/navigationHandler.ts";

// Global navigation state cache
let cachedNavigation: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export async function handler(req: Request, ctx: FreshContext) {
  // Check if we need to fetch new navigation data
  const now = Date.now();
  if (!cachedNavigation || now - lastFetchTime > CACHE_TTL) {
    try {
      // Fetch navigation data
      cachedNavigation = await getNavigationItems();
      lastFetchTime = now;
      //console.log("Navigation data refreshed");
    } catch (error) {
      console.error("Error fetching navigation:", error);
      // If there's an error and we don't have cached data, use an empty array
      if (!cachedNavigation) {
        cachedNavigation = [];
      }
    }
  }

  // Add navigation data to the context state
  ctx.state.navigationItems = cachedNavigation;
  
  // Continue to the route handler
  return await ctx.next();
}