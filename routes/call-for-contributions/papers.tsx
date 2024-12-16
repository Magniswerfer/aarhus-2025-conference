// routes/call-for-contributions/papers.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import XBreaker from "../../islands/XBreaker.tsx";
import PapersCommittee from "../../components/Committees/PapersCommittee.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function PapersPage() {
  const content = [
    "Papers should make a lasting and significant contribution to our knowledge and understanding of improving computing for the human condition in a world of multiple crises.",
    "In summary, submitted papers will be evaluated based on the extent the submission:",
    {
      type: "list",
      content: [
        "offers a strong contribution to theory and practice as regards Computing (X) Crisis",
        "has potential for long-lasting impact",
        "provides new perspectives",
      ],
    },
    "We accept short and long papers. Submissions below 5,000 words are considered short and is allowed and encouraged for to-the-point arguments. Submissions between 5,000 and 12,000 words are considered standard long papers, while submissions exceeding 12,000 words should only be made with very good reasons. The wordcount does not include references, images, or tables.",
    {
      type: "list",
      content: [
        <>
          Please ensure that you use the correct{" "}
          <a
            href="/author-guidelines"
            className="text-aarhus-red hover:underline"
          >
            template
          </a>, the ACM Conference Proceedings Primary Article; a single-column
          format must be used for the reviewing phase.
        </>,
        "Your submission must be anonymized.",
      ],
    },
    "The Aarhus2025 conference follows a double-blind review process (performed by invited reviewers from the program committee) that is complemented by a meta-review (done by a primary reviewer/PC member).",
  ];

  return (
    <>
      <Head>
        <title>Papers | Aarhus 2025</title>
        <meta
          name="description"
          content="Submit papers that propose new agendas and address fundamental issues in computing for the human condition in a world of multiple crises."
        />
      </Head>
      <Layout>
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Papers
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              Papers are expected to be influential throughout the next
              decennium by addressing fundamental issues and proposing new
              agendas or in other ways offering research contributions with the
              potential for long-lasting impact.
            </p>
          </div>
        </div>

        <ContentSection
          content={content}
          imageSrc="/images/papersVinclusive.png"
          imageAlt="Papers illustration"
          imagePosition="right"
        />
        <SubmissionDates
          submissionType="Papers"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        />
        <XBreaker />
        <PapersCommittee />
      </Layout>
    </>
  );
}
