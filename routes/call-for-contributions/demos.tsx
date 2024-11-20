// routes/call-for-contributions/demos.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function DemosPage() {
  const content = [
    "More information will follow",
  ];

  return (
    <Layout>
      <div class="flex flex-col flex-1">
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Demos
            </h1>
          </div>
        </div>
        <div class="flex-1 min-h-[20vh]">
          <ContentSection
            content={content}
            imagePosition="right"
          />
          <SubmissionDates
            submissionType="Demos"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          />
        </div>
      </div>
    </Layout>
  );
}
