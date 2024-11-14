// routes/call-for-contributions/doctoral-consortium.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function DoctoralConsortiumPage() {
  const content = [
    "More information will follow",
  ];

  return (
    <>
      <Head>
        <title>Doctoral Consortium | Aarhus 2025</title>
        <meta
          name="description"
          content="Information about the Doctoral Consortium at Aarhus 2025."
        />
      </Head>
      <Layout>
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Doctoral Consortium
            </h1>
          </div>
        </div>
        <div class="flex-1 flex min-h-[20vh]">
          <ContentSection
            content={content}
            imagePosition="right"
          />
        </div>
        <SubmissionDates
                  submissionType="Doctoral Consortium"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                />
      </Layout>
    </>
  );
}
