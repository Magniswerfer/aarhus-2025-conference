// routes/[slug].tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ContentSection from "../components/ContentSection.tsx";
import ConferenceDates from "../components/ConferenceDates.tsx";
import ContributionTypesGrid from "../components/ContributionTypesGrid.tsx";
import { parseContent, BlockContent } from "../utils/sanityParser.tsx";
import { client } from "../utils/sanity.ts";

interface PageData {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  content: BlockContent[];
  slug: string;
  layoutType: "standard" | "twoColumn";
  imagePosition?: "left" | "right";
  showConferenceDates: boolean;
  showContributionTypes: boolean;
  error?: string;
}

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    try {
      const { slug } = ctx.params;

      // Query Sanity for the page data
      const data = await client.fetch(
        `*[_type == "page" && slug.current == $slug][0]{
          title,
          description,
          "slug": slug.current,
          layoutType,
          imagePosition,
          "imageUrl": image.asset->url,
          "imageAlt": image.alt,
          content,
          showConferenceDates,
          showContributionTypes
        }`,
        { slug }
      );

      if (!data) {
        return ctx.renderNotFound();
      }

      return ctx.render({
        title: data.title,
        description: data.description,
        slug: data.slug,
        layoutType: data.layoutType || "standard",
        imagePosition: data.imagePosition || "right",
        imageUrl: data.imageUrl,
        imageAlt: data.imageAlt,
        content: Array.isArray(data.content) ? data.content : [],
        showConferenceDates: !!data.showConferenceDates,
        showContributionTypes: !!data.showContributionTypes,
      });
    } catch (error) {
      console.error(`Error fetching page with slug '${ctx.params.slug}':`, error);

      return ctx.render({
        title: "Page Not Found",
        description: "We couldn't find the page you're looking for.",
        slug: ctx.params.slug,
        layoutType: "standard",
        content: [],
        showConferenceDates: false,
        showContributionTypes: false,
        error: "Failed to load page content. Please try again later.",
      });
    }
  },
};

export default function GenericPage({ data }: PageProps<PageData>) {
  const {
    title,
    description,
    imageUrl,
    imageAlt,
    content,
    layoutType,
    imagePosition,
    showConferenceDates,
    showContributionTypes,
    error,
  } = data;

  const parsedContent = parseContent(Array.isArray(content) ? content : []);

  return (
    <>
      <Head>
        <title>{`${title} | Aarhus 2025`}</title>
        <meta name="description" content={description} />
      </Head>

      {/* Hero Section - This will be rendered inside the Layout provided by _app.tsx */}
      <div class="bg-aarhus-red py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">{description}</p>
        </div>
      </div>

      {/* Error message if needed */}
      {error && (
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {/* Content section based on layout type */}
      {layoutType === "standard" ? (
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="prose max-w-none">
            {/* Standard layout content */}
            <div class="text-lg mb-8 min-h-[60vh]">{parsedContent}</div>

            {/* Optional components */}
            {showContributionTypes && (
              <section class="mb-16">
                <h2 class="text-3xl font-bold text-aarhus-red mb-6">
                  Submission Types
                </h2>
                <p class="mb-6">
                  Computing (X) Crisis calls for the following types of
                  contributions:
                </p>
                <ContributionTypesGrid />
              </section>
            )}

            {showConferenceDates && (
              <ConferenceDates
                displayStyle="grid"
                class="mb-16"
                title="Important Dates"
              />
            )}
          </div>
        </div>
      ) : (
        <div class="flex-1 flex min-h-[60vh]">
          {/* Two-column layout with image */}
          <ContentSection
            content={parsedContent}
            imagePosition={imagePosition || "right"}
            imageSrc={imageUrl}
            imageAlt={imageAlt}
          />

          {/* For two-column layout, add components after the ContentSection */}
          {(showContributionTypes || showConferenceDates) && (
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {showContributionTypes && (
                <section class="mb-16">
                  <h2 class="text-3xl font-bold text-aarhus-red mb-6">
                    Submission Types
                  </h2>
                  <ContributionTypesGrid />
                </section>
              )}

              {showConferenceDates && (
                <ConferenceDates
                  displayStyle="grid"
                  class="mb-16"
                  title="Important Dates"
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
