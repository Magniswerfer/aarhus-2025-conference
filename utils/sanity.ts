// utils/sanity.ts
import { createClient } from "@sanity/client";

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
}

const config: SanityConfig = {
  projectId: Deno.env.get("SANITY_PROJECT_ID") || "7lk3t6n2",
  dataset: Deno.env.get("SANITY_DATASET") || "production",
  apiVersion: "2024-02-21",
  useCdn: true,
};

export const client = createClient(config);