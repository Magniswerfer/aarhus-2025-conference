// routes/call-for-contributions/papers.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function WorkshopsPage() {
  const content = [
    "Workshops are based on participants’ active engagement and contribution. Participants prepare in advance to share perspectives, knowledge, and interest in the workshop theme. The outcomes of workshops include heightened sensitivity to new issues, joint publications and research programs as well as critical yet friendly feedback on emerging ideas. Often, they establish or solidify research networks and contribute to community building.",
    "Successful workshops should make full use of the workshop format, avoiding conference-style paper presentations, and instead prioritise debate and joint action. Proposals that reach out to other disciplines and traditions, as well as to industry, art, activism, and other practices to advance constructive and critical discussions are welcomed. Successful proposals clearly explain the aim and relevance of the workshop, intended audience, planned activities, expected outcomes and impact for the intended community.",
    "The selection process is curated. Workshop selection will happen by the discretion of the Workshop Chairs. Acceptance of proposals will be informed by factors such as:",
    {
      type: "list",
      content: [
        "Clarity of intended outcomes, quality of the workshop programme, and value for the participants ",
        "Prospective participants: Who are they likely to be, and how many could join? Profiles and number of prospective participants",
        "Impact and relevance: How does it connect to the conference theme and how does it provide lasting impact to the communities it engages?",
      ],
    },
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
  ];

  return (
    <>
      <Head>
        <title>Workshops | Aarhus 2025</title>
        <meta
          name="description"
          content="Submit critiques that challenge the status quo of computing and spark thought-provoking discussions."
        />
      </Head>
      <Layout>
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Workshops
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              Workshops are spaces for debate and co-development of ideas and
              approaches related to the advancement of research and practice
              within the theme of 'Computing (X) Crisis'.
            </p>
          </div>
        </div>

        <ContentSection
          content={content}
          imageSrc="/images/ws.png"
          imageAlt="Workshop illustration"
          imagePosition="right"
        />
        <SubmissionDates
          submissionType="Workshops"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        />
      </Layout>
    </>
  );
}
