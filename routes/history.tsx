import { PageProps } from "$fresh/server.ts";
import Layout from "../layouts/layout.tsx";
import ConferenceTimeline from "../islands/ConferenceTimeline.tsx";

export default function HistoryPage(props: PageProps) {
  return (
    <Layout title="Conference History - Aarhus 2025">
      <div class="bg-aarhus-red mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 class="text-6xl font-bold text-white mb-6">
            Conference History
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ante
            mauris. Curabitur pharetra blandit augue et iaculis. Sed eget varius
            nisi. Vestibulum magna magna, vehicula sed lacinia at, fringilla id
            sapien. Cras vulputate ex metus, sit amet egestas nisl pretium ac.
            Nunc ornare felis ex, sed iaculis est tempus eget.
          </p>
        </div>
      </div>
      <div class="container mx-auto px-4 py-8">
        <ConferenceTimeline />
      </div>
    </Layout>
  );
}
