import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

const isProduction = Deno.env.get("ENVIRONMENT") === "production";
const basePath = isProduction ? "/aarhus2025-static" : "";

export default defineConfig({
  plugins: [tailwind()],
  build: {
    target: ["chrome99", "firefox99", "safari12"],
    static: {
      enabled: true
    }
  },
  basePath
});

