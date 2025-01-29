// routes/call-for-contributions/doctoral-consortium.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function DoctoralConsortiumPage() {
  const content = [
    "The Aarhus 2025 Doctoral Consortium is a place for mentoring and sharing research relevant to the conference theme among Ph.D. students and established researchers. This event is a forum for in-depth research discussions and sharing of experiences, problems, success stories, and tradeoffs between different research directions in a stimulating, open, and safe environment. We expect that participants will come from a variety of disciplines to create a lively interdisciplinary environment.",
    "As part of submissions to the Doctoral Consortium, we invite you to consider the conference title, “computing (x) crisis”, and how this relates your research to alternatives to current directions in computing, for instance via methodological or theoretical developments, or present new forms of critical or societal engagements and action. With the (X) we invite authors to speculate on potential replacements of the universal X – with, after, in, etc – and on what it means to combine the two words.",
    "The doctoral consortium will take place on-site at Aarhus University, Denmark.",
    "Doctoral consortium contributions will not be added to ACM Digital Library.",
    <h2 class=" text-3xl font-bold text-aarhus-red mb-8">
      Who can participate?
    </h2>,
    "You must be enrolled in a conference-relevant discipline as a doctoral candidate at the time of submitting your application and at the time of the conference. You will get the most value from attending if you have a clear direction for your thesis but have not yet finished your research. However, people at other stages may be considered. We are expecting to accept 10-12 candidates. ",
    <h2 class="text-3xl font-bold text-aarhus-red mb-8">
      Preparing and Submitting
    </h2>,
    <>
    Submissions should be single-authored by the PhD student and NOT anonymous. You will submit the following 2 PDFs in the{" "}
    <a
      href="/author-guidelines"
      className="text-aarhus-red hover:underline"
    >
      ACM master article template (single column)
    </a>, format through the{" "}
    <a
      href="https://new.precisionconference.com/submissions"
      className="text-aarhus-red hover:underline"
      >
        Precision Conference submission system (PCS)
      </a>.
    </>,
    <h3 class="text-2xl font-bold text-aarhus-red">PDF 1: PhD Abstract</h3>,
    "Submit a description of your PhD project, max of 4 pages excluding references.",
    <h3 class="text-2xl font-bold text-aarhus-red">
      PDF 2: Supporting Materials
    </h3>,
    "The supporting document should include the following:",
    {
      type: "list",
      content: [
        "What new perspectives does your research provide? (max 200 words)",
        "A list of three key readings, with a brief description of how they have influenced your PhD (max 1 page).",
        "A brief statement of where you are in your PhD process (max 200 words).",
      ],
    },
    "After acceptance, we will also ask you to submit:",    {
      type: "list",
      content: [
        "A brief response to the material of 1-2 other participants. This could be in the form of three comments and two questions.",
      ],
    },
    <h2 class=" text-3xl font-bold text-aarhus-red mb-8">Review Process</h2>,
    "Submissions will be reviewed by the Doctoral Consortium Chairs. Participation in the Doctoral Consortium will be limited to candidates who have been accepted into the Consortium.",
    <h2 class="text-3xl font-bold text-aarhus-red mb-8">Registration</h2>,
    "If you are accepted to the Doctoral Consortium, we will send you registration instructions. Participation in the Doctoral Consortium is free of charge to the invited participants. Please note, that if you are presenting and/or participating in any other part of the conference, you will need to pay the student conference registration fee.",
    <h2 class="text-3xl font-bold text-aarhus-red mb-8">At the Doctoral Consortium</h2>,
    "Specific instructions about the presentation format and practicalities will be delivered before the Doctoral Consortium for the accepted participants. As the aim of the Doctoral Consortium is to learn from one another, we expect active participation in discussions and giving constructive feedback on each other’s ideas and materials. We hope that the participants will help each other gain new ideas and perspectives on their research directions and form new friendships with the other attendees.",
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
            <p class="text-xl text-white/90 max-w-3xl">
              The Aarhus 2025 Doctoral Consortium provides current doctoral
              candidates with unique opportunities to engage in exchanges about
              doctoral research relevant to the conference with researchers and
              peers in a stimulating, open, and safe environment. We expect that
              participants will come from a variety of disciplines and thus that
              this will be an interdisciplinary environment as well.
            </p>
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
