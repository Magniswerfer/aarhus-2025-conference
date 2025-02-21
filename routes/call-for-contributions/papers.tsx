// routes/call-for-contributions/papers.tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import PapersCommittee from "../../components/Committees/PapersCommittee.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";
import XBreaker from "../../islands/XBreaker.tsx";
import { parseContent, submissionPageQuery, BlockContent } from "../../utils/sanityParser.tsx";
import { client } from "../../utils/sanity.ts";

interface PageData {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  content: BlockContent[];
  submissionDates?: {
    deadline: string;
    notification: string;
    cameraReady?: string;
  } | null;
  error?: string;
}

// Constants
const SUBMISSION_TYPE = "papers";
const SUBMISSION_DISPLAY_TYPE = "Papers";
const DEFAULT_DESCRIPTION =
  "Papers are expected to be influential throughout the next decennium by addressing fundamental issues and proposing new agendas or in other ways offering research contributions with the potential for long-lasting impact.";

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    try {
      const data = await client.fetch(submissionPageQuery(SUBMISSION_TYPE));

      if (!data) {
        throw new Error("No data from Sanity");
      }

      return ctx.render({
        title: data.title || SUBMISSION_DISPLAY_TYPE,
        description: data.description || DEFAULT_DESCRIPTION,
        imageUrl: data.imageUrl || "/images/papersVinclusive.png",
        imageAlt: data.imageAlt || "Papers illustration",
        content: Array.isArray(data.content) ? data.content : [],
        submissionDates: data.submissionDates || null,
      });
    } catch (error) {
      console.error("Error fetching Sanity data:", error);
      return ctx.render({
        title: SUBMISSION_DISPLAY_TYPE,
        description: DEFAULT_DESCRIPTION,
        imageUrl: "/images/papersVinclusive.png",
        imageAlt: "Papers illustration",
        content: [],
        submissionDates: null,
        error: "Failed to load content. Please try again later.",
      });
    }
  },
};

export default function PapersPage({ data }: PageProps<PageData>) {
  const { title, description, imageUrl, imageAlt, content, submissionDates, error } = data;
  const parsedContent = parseContent(Array.isArray(content) ? content : []);

  return (
    <>
      <Head>
        <title>{`${title} | Aarhus 2025`}</title>
        <meta name="description" content={description} />
      </Head>
      <Layout>
        <div class="bg-aarhus-red">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 class="text-6xl font-bold text-white mb-6">{title}</h1>
            <p class="text-xl text-white/90 max-w-3xl">{description}</p>
          </div>
        </div>

        {error && (
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <ContentSection
          content={parsedContent}
          imageSrc={imageUrl}
          imageAlt={imageAlt}
          imagePosition="right"
        />

        {submissionDates && (
          <SubmissionDates
            dates={submissionDates}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          />
        )}

        <XBreaker />

        <PapersCommittee />
      </Layout>
    </>
  );
}
