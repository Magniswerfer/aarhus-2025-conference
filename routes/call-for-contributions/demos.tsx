// routes/call-for-contributions/demos.tsx
import { Head } from "$fresh/runtime.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";

export default function DemosPage() {
  const content = [
    <>We particularly encourage submissions that critically or creatively explore the conference theme of <span className="font-bold">'Computing (X) Crisis'</span> with novel and compelling interaction concepts, techniques, devices and experiences around topics of sustainability, democracy, accessibility, justice, and inclusiveness in arts, design, architecture, engineering, human-computer interaction, computer science, and in society at large.</>,
    "All demos and experiences submissions go through a curation process. Upon acceptance, the demos and experiences chairs will announce recommendations for presentation formats and logistics, and provide early access for technical setup before the conference.",
    "We look forward to receiving your submissions!",
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Submission Instructions
    </h2>,
    {
          type: "list",
          content: [
            "All materials must be submitted electronically before the submission deadline.",
            <>
              Submit via {" "}
              <a
                href="https://new.precisionconference.com/submissions"
                className="text-aarhus-red hover:underline"
              >
                PCS
              </a>. First click “Submissions” at the top of the page, from the dropdown menus for society, conference, and track select “Aarhus”, “Aarhus 2025” and “Aarhus 2025 Demos”, respectively, and press “Go.”
            </>,
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
              Submission Format
    </h2>,
    {
          type: "list",
          content: [
            <>
              The manuscript can be submitted either in single-column or double-column format. The submission has to be in PDF format. The template files are linked in the {" "}
              <a
                href="/author-guidelines"
                className="text-aarhus-red hover:underline"
              >
                author guidelines
              </a>.
            </>,
            "We do not have a strong page limit for the submission, but we recommend that authors prepare a manuscript of ~1,500-2,000 words (excluding references).",
            "A supplementary file with a setup description, e.g., a textual description and/or a (mock-up) photo of the project demo showing the envisioned setup (demo hardware components, tables, chairs, lights, and other equipment). Label and annotate the image(s) so organisers get a good understanding of your setup.",
            "An accompanying demo video (max. 5 mins) showing the working demo and/or experience in appropriate detail is strongly recommended.",
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Upon acceptance
    </h2>,
    {
          type: "list",
          content: [
            <>Upon acceptance, the TAPS process requires that the manuscript to be submitted in the single-column format using the tag <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">{`\\documentclass[sigconf]{acmart}`}</code>. The entry in the digital library will be in the double-column format.</>,
            "A video is optional but strongly recommended. Length of max 5 mins. Resolution of 1080p (1920 x 1080) or 4k (3840 x 2160 px), encoded as MP4 using the H.264 codec. Subtitles are required and should be added using a separate .srt or .sbv file",
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Anonymity
    </h2>,
    {
          type: "list",
          content: [
            <>Submissions should <span className="font-bold">NOT</span> be anonymised. Author names and institutions will be visible to the reviewing committee throughout the submission process.</>
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Selection Process
    </h2>,
    {
          type: "list",
          content: [
            "Demos and experiences is juried by the Aarhus 2025 Demo and Experiences chairs",
            "Due to the nature of the juried process, authors will not receive review feedback and will simply be informed about the decision."
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Publication
    </h2>,
    {
          type: "list",
            content: [
            "Demos and Experiences abstracts will be included in the ACM digital library as adjunct proceedings and distributed in digital form to conference attendees.",
            "Publications are non-archival; ideas presented as a Aarhus 2025 Demos and Experiences track can thus be resubmitted to other venues in subsequent years. "
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Presentation Format
    </h2>,
    {
          type: "list",
            content: [
            "At least one author is required to be physically present at the conference and present their project during demo sessions.",
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Concurrent Aarhus 2025 Poster Submission
    </h2>,
    {
          type: "list",
            content: [
            "The same work cannot be submitted to both the demos and experiences and poster tracks. Double submissions will only be considered as a demos and experiences submission and will be rejected from the poster track.",
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Novelty
    </h2>,
    {
          type: "list",
            content: [
            "Resubmission of demos and experiences previously shown at other venues is allowed.",
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Demos and Experiences of Accepted Aarhus 2025 Papers
    </h2>,
    "Authors of accepted full papers who also want to present a demos and experiences have to submit an entry into the demos and experiences track. They have two choices:",
    {
          type: "list",
            content: [
              <><span className="font-bold">(1) Regular demo and experiences submission:</span> Authors are welcome to submit a demo abstract (approx. 2 pages), which will result in the abstract being included in the ACM digital library adjunct proceedings. This is sometimes relevant to reflect differences between the paper and demos and experiences submission, e.g., changes in the list or order of authors. Since demos and experiences publications are non-archival, authors are welcome to adapt content from their full paper or other prior publications. We encourage authors to use a distinct title from the full paper (e.g., “Demonstration of …”) to avoid confusion in citations and search results.</>,
              <><span className="font-bold">(2) Fast track:</span> Paper authors can indicate in their demos and experiences submission that they want to submit to the fast demos and experience track. In that case, no abstract is required. However, authors are still required to submit a video and other relevant data (e.g., title, abstract, floorplan). We intend to accept as many fast track demos and experiences as logistics and space allows.</>
          ],
    },
    <h2 className="text-3xl font-bold text-aarhus-red mb-4">
      Changes in author list and affiliations
    </h2>,
    {
          type: "list",
            content: [
            "Please make sure that all authors and their affiliations are correct before submitting in PCS",
            "It is not possible to add or remove any author from a demos and experiences abstract after submission.",
            "It is not possible to change the affiliation of any author after the submission."
          ],
    },

  ];

  return (
    <Layout>
      <div class="flex flex-col flex-1">
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">
              Demos and Experiences
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              The Demos and Experiences track welcomes submissions of artefacts that stage hands-on computational and interactive demonstrations and experiences, including interactive art, design installations, tangible prototypes, interface or system demonstrations.
            </p>
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
