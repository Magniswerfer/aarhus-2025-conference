// routes/call-for-contributions/papers.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function WorksInProgressPage() {
  const content = [
    "We put weight to contributions that:",
    {
      type: "list",
      content: [
        "engages with the conference theme",
        "has potential for long-lasting impact",
        "provides new perspectives",
      ],
    },
    "All submitted work-in-progress will be reviewed by one external reviewer (double-blind), which will be used by the work-in-progress chairs to curate the pool of accepted papers in relation to the conference theme.",
    {
      type: "list",
      content: [
        "Submissions must be no more than 2500 words (excluding images, figures and references).",
        <>
          Please ensure that you use the correct{" "}
          <a
            href="/call-for-contributions/author-guidelines#templates"
            className="text-aarhus-red hover:underline"
          >
            template
          </a>, the ACM Conference Proceedings Primary Article; a single-column
          format must be used for the reviewing phase.
        </>,
        "Your submission must be anonymized."
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
              Work-in-Progress
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              The Work-in-Progress category is an opportunity to present ideas
              in the making and tentative findings.
            </p>
          </div>
        </div>

        <ContentSection
          content={content}
          imagePosition="right"
        />
        <SubmissionDates
                          submissionType="Work in Progress"
                          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                        />
      </Layout>
    </>
  );
}
