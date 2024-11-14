// routes/call-for-contributions/papers.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function CritiquesPage() {
  const content = [
    "The Critiques track will spark thought-provoking discussions across subject areas, research traditions and generations. Critiques submission formats include but are not limited to: Essay, creative writing e.g manifestos, stories, fictions, pictorial, artwork e.g software, video games, audio-visual art, theoretical or analytical article, provotype, artifact with networked, generative, and/or programmed elements.",
    "Submitted critiques will be evaluated based on:",
    {
      type: "list",
      content: [
        "Their ability to critically examine a topic, inspire, and/or spark debate and reflection",
        "How well they are made relevant to the conference theme: Computing (X) Crisis",
      ],
    },
    "All submitted critiques will undergo double-blind peer reviews, which will be used by the Critiques chairs to make the final decision.",
    {
      type: "list",
      content: [
        "Your submission must be anonymized.",
        "If you submit a non-written artifact, you must submit a PDF with a description of the submission and the artifact as supplementary material in the submission system.Your submission must be anonymized.",
        "Upon acceptance, we will work with you to produce a description of the contribution in the ACM extended abstract format for archival in the ACM digital library.",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Papers | Aarhus 2025</title>
        <meta
          name="description"
          content="Submit critiques that challenge the status quo of computing and spark thought-provoking discussions."
        />
      </Head>
      <Layout>
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Critiques
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              The Critique submission category will establish a forum for
              critical and insightful perspectives that challenge the status quo
              of computing. Submissions must address the conference theme and
              will be assessed based on their ability to critically dissect,
              provoke or inspire.
            </p>
          </div>
        </div>

        <ContentSection
          content={content}
          imageSrc="/images/critiqueVinclusive.png"
          imageAlt="Critiques illustration"
          imagePosition="right"
        />
        <SubmissionDates
                  submissionType="Critiques"
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                />
      </Layout>
    </>
  );
}
