import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  plugins: [tailwind()],
  build: {
    target: ["chrome99", "firefox99", "safari12"],
    static: {
      enabled: true,
      directory: "_fresh"  // The directory where static files will be generated
    }
  }
});

