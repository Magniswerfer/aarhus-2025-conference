// routes/call-for-contributions/papers.tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ContentSection from "../../components/ContentSection.tsx";
import SubmissionDates from "../../components/SubmissionDates.tsx";
import XBreaker from "../../islands/XBreaker.tsx";
import { parseContent, submissionPageQuery, BlockContent } from "../../utils/sanityParser.tsx";
import { client } from "../../utils/sanity.ts";

interface CommitteeMember {
  name: string;
  affiliation: string;
}

interface Committee {
  title: string;
  members: CommitteeMember[];
}

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
  committee?: Committee;
  error?: string;
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    try {
      // Fetch page content from Sanity
      const data = await client.fetch(submissionPageQuery("papers"));

      // Fetch committee data for papers committee
      const committeeQuery = `*[_type == "committee" && committeeType == "papers"][0]{
        title,
        members[]{ name, affiliation }
      }`;
      const committee = await client.fetch(committeeQuery);

      return ctx.render({
        title: data.title || "Papers",
        description: data.description || "Default description",
        imageUrl: data.imageUrl || "/images/papersVinclusive.png",
        imageAlt: data.imageAlt || "Papers illustration",
        content: Array.isArray(data.content) ? data.content : [],
        submissionDates: data.submissionDates || null,
        committee,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.render({
        title: "Papers",
        description: "Default description",
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
  const { title, description, imageUrl, imageAlt, content, submissionDates, committee, error } = data;
  const parsedContent = parseContent(content);

  return (
    <>
      <Head>
        <title>{`${title} | Aarhus 2025`}</title>
        <meta name="description" content={description} />
      </Head>

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
      {committee ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-bold mb-8 text-aarhus-red">
            Papers Committee
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6 text-sm">
            {committee.members.map((member, index) => (
              <div key={index} className="min-w-0 break-words">
                <p className="font-semibold text-gray-700 mb-1">
                  {member.name}
                </p>
                {member.affiliation && (
                  <p className="text-gray-600">
                    {member.affiliation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading committee...</p>
      )}

    </>
  );
}
