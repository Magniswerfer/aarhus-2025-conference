// routes/call-for-contributions/doctoral-consortium.tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../layouts/layout.tsx";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";
import { parseContent, submissionPageQuery, BlockContent } from "../../utils/sanityParser.tsx";
import { client } from "../../utils/sanity.ts";

interface PageData {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  content: BlockContent[];
  submissionDates?: {
    deadline: string;
    notification: string;
    cameraReady?: string;
  } | null;
  error?: string;
}

// Constants
const SUBMISSION_TYPE = "doctoral-consortium"; // For Sanity query
const SUBMISSION_DISPLAY_TYPE = "Doctoral Consortium"; // Exact match with submissionTypes array
const DEFAULT_DESCRIPTION =
  "The Aarhus 2025 Doctoral Consortium provides current doctoral candidates with unique opportunities to engage in exchanges about doctoral research relevant to the conference with researchers and peers in a stimulating, open, and safe environment. We expect that participants will come from a variety of disciplines and thus that this will be an interdisciplinary environment as well.";

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
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        content: Array.isArray(data.content) ? data.content : [],
        submissionDates: data.submissionDates || null,
      });
    } catch (error) {
      console.error("Error fetching Sanity data:", error);
      return ctx.render({
        title: SUBMISSION_DISPLAY_TYPE,
        description: DEFAULT_DESCRIPTION,
        content: [],
        submissionDates: null,
        error: "Failed to load content. Please try again later.",
      });
    }
  },
};

export default function DoctoralConsortiumPage({ data }: PageProps<PageData>) {
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

        <div class="flex-1 flex min-h-[20vh]">
          {error && (
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <ContentSection
            content={parsedContent}
            imagePosition="right"
            imageSrc={imageUrl}
            imageAlt={imageAlt}
          />
        </div>

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
