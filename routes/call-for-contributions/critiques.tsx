// routes/call-for-contributions/papers.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";
import CritiquesCommittee from "../../components/Committees/CritiquesCommitee.tsx";
import XBreaker from "../../islands/XBreaker.tsx";

export default function CritiquesPage() {
  const content = [
    "The Critiques track will spark thought-provoking discussions across subject areas, research traditions, and generations. Critiques submission formats include but are not limited to: Essay, creative writing e.g manifestos, stories, fictions, pictorial, artwork e.g software, video games, audio-visual art, theoretical or analytical article, provotype, artifact with networked, generative, and/or programmed elements.",
    "Submitted critiques will be evaluated based on:",
    {
      type: "list",
      content: [
        "Their ability to critically examine a topic, inspire, and/or spark debate and reflection.",
        "How well they are made relevant to the conference theme: Computing (X) Crisis and to the decennial perspective.",
      ],
    },
    "All submitted critiques will undergo double-blind peer reviews performed by invited reviewers from the program committee. This is complemented by a meta-review, which will be used by the Critiques chairs to make the final decision, in dialogue with the program committee where necessary.",
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Submission Instructions
    </h2>,
    <>
      All materials must be submitted electronically via{"  "}
      <a
        href="https://new.precisionconference.com/submissions"
        className="text-aarhus-red hover:underline"
      >
        PCS
      </a>, by the deadline.
    </>,
    {
      type: "list",
      content: [
        "Your submission must be anonymized.",
        "If you submit a non-written artifact, you must submit a PDF abstract with a description of the submission. You may submit the artifact as supplementary material in the submission system.",
        "If your primary contribution is a piece of writing, we encourage submissions that are no longer than 8000 words (excluding any references).",
        "Upon acceptance, we will work with you to produce a description of the contribution in the ACM extended abstract format for archival in the ACM digital library.",
      ],
    },
    <>
    Accepted critiques will be published in the ACM Digital Library. This will require use of the ACM single-column template (described in the {" "}
    <a
      href="/author-guidelines"
      class="text-aarhus-red hover:text-aarhus-red/80"
    >
      Author Guidelines
    </a>
    ) or the ACM extended abstracts template, either for the critique itself or for an abstract about the critique (the latter in case it not be feasible or desirable to format the critique using the template - such as with an interactive artifact, or a piece of writing that has particular formatting as part of its contribution)."
    </>,
    "Accepted critiques must be presented at the conference. We encourage alternative formats of presentation where appropriate.",
    <>
      Questions can be directed to{"  "}
      <a
        href="mailto:ilarsen-ledet@ucc.ie"
        className="text-aarhus-red hover:underline"
      >
        Ida Larsen-Ledet
      </a>, or{"  "}
      <a
        href="mailto:parikka@cc.au.dk"
        className="text-aarhus-red hover:underline"
      >
        Jussi Parikka
      </a>
    </>,
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      The decennial perspective
    </h2>,
    "The decennial nature of the conference (i.e., that it only happens every ten years) is an opportunity to zoom out and reflect on your contribution and on HCI, computing, and other related areas of research at a bigger timescale, and to look forward with a longer-term perspective than we often do at other conferences. Submissions should embrace this perspective in the thinking they present and the questions they ask.",
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
        <XBreaker />
        <CritiquesCommittee />
      </Layout>
    </>
  );
}
