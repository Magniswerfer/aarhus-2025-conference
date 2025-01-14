import { PageProps } from "$fresh/server.ts";
import Layout from "../layouts/layout.tsx";
import ConferenceTimeline from "../islands/ConferenceTimeline.tsx";
import { conferences } from "../data/previousConferences.ts";

export default function HistoryPage(props: PageProps) {
  return (
    <Layout title="Past Conferences - Aarhus 2025">
      <div class="bg-aarhus-red mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 class="text-6xl font-bold text-white mb-6">
            Past Conferences
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">
            The decennial has happened since 1975, and below you will (soon) find most of the previous proceedings/contributions. With output every ten years it is possible to follow also the ways that research writing and formats has changed: from self-published papers in Scandinavian languages (and detailed reports of the group work at the conference) in 1975, over published books after the conferences in 1985 and 1995, to online PDFs in 2005 and fully integrated into the online database ACM Digital Library in 2015. We will put the previous contributions online as we digitise them (and manage to get permission from authors to do so), so come back later too.
            Dig in! It's such a treasure trove of topics and ideas.
          </p>
        </div>
      </div>
      <div class="container mx-auto px-4 py-8">
        <ConferenceTimeline conferences={conferences} />
      </div>
    </Layout>
  );
}
