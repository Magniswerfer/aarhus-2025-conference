// routes/call-for-contributions/workshops.tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";
import { BlockContent, parseContent, submissionPageQuery } from "../../utils/sanityParser.tsx";
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
  }| null; // <-- Allow null explicitly;
  error?: string;
}

const SUBMISSION_TYPE = 'workshops';
const DEFAULT_DESCRIPTION = "Workshops are spaces for debate and co-development of ideas and approaches related to the advancement of research and practice within the theme of 'Computing (X) Crisis'.";

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    try {
      const data = await client.fetch(submissionPageQuery(SUBMISSION_TYPE));
      
      if (!data) {
        throw new Error("No data from Sanity");
      }

      return ctx.render({
        title: data.title || SUBMISSION_TYPE,
        description: data.description || DEFAULT_DESCRIPTION,
        imageUrl: data.imageUrl || "/images/ws.png",
        imageAlt: data.imageAlt || "Workshop illustration",
        content: Array.isArray(data.content) ? data.content : [],
        submissionDates: data.submissionDates
      });
    } catch (error) {
      console.error("Error fetching Sanity data:", error);
      return ctx.render({
        title: SUBMISSION_TYPE,
        description: DEFAULT_DESCRIPTION,
        imageUrl: "/images/ws.png",
        imageAlt: "Workshop illustration",
        content: [],
        submissionDates: null,
        error: "Failed to load content. Please try again later.",
      });
    }
  },
};

export default function WorkshopsPage({ data }: PageProps<PageData>) {
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
      </Layout>
    </>
  );
}