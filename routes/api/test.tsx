// routes/api/test.ts
import { FreshContext } from "$fresh/server.ts";

export const handler = {
  GET(_req: Request, _ctx: FreshContext): Response {
    console.log("Test API endpoint called");
    return new Response(JSON.stringify({ 
      status: "success", 
      message: "API is working!" 
    }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};