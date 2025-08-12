// routes/[slug].tsx
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import ContentSection from "../components/ContentSection.tsx";
import ConferenceDates from "../components/ConferenceDates.tsx";
import ContributionTypesGrid from "../components/ContributionTypesGrid.tsx";
import { BlockContent, parseContent } from "../utils/sanityParser.tsx";
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

  showAcceptedPublications: boolean;
  acceptedPublications?: {
    sectionTitle: string;
    csvFile: {
      asset: {
        url: string;
        originalFilename: string;
      };
    };
    publications?: {
      title: string;
      author: string;
      abstract: string;
    }[];
  }[];
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
          showAcceptedPublications,
          acceptedPublications[]{
            sectionTitle,
            csvFile{
              asset->{
                url,
                originalFilename
              }
            }
          }
        }`,
        { slug },
      );

      if (!data) {
        return ctx.renderNotFound();
      }

      // Process CSV files if accepted publications are enabled
      let processedPublications = data.acceptedPublications || [];
      if (data.showAcceptedPublications && data.acceptedPublications?.length) {
        processedPublications = await Promise.all(
          data.acceptedPublications.map(async (section: any) => {
            if (!section.csvFile?.asset?.url) {
              return { ...section, publications: [] };
            }

            try {
              // Fetch CSV content
              const csvResponse = await fetch(section.csvFile.asset.url);
              const csvText = await csvResponse.text();

              // Parse CSV with proper comma and line break handling
              const csvContent = csvText.trim();
              if (!csvContent) {
                return { ...section, publications: [] };
              }

              // Function to parse entire CSV content handling quoted fields with commas and line breaks
              const parseCSV = (content: string): string[][] => {
                const rows: string[][] = [];
                const chars = content.split("");
                let currentField = "";
                let currentRow: string[] = [];
                let inQuotes = false;
                let i = 0;

                while (i < chars.length) {
                  const char = chars[i];
                  const nextChar = chars[i + 1];

                  if (char === '"') {
                    if (inQuotes && nextChar === '"') {
                      // Handle escaped quotes ("")
                      currentField += '"';
                      i += 2;
                    } else {
                      // Toggle quote state
                      inQuotes = !inQuotes;
                      i++;
                    }
                  } else if (char === "," && !inQuotes) {
                    // Field separator found outside quotes
                    currentRow.push(currentField.trim());
                    currentField = "";
                    i++;
                  } else if ((char === "\n" || char === "\r") && !inQuotes) {
                    // Row separator found outside quotes
                    currentRow.push(currentField.trim());
                    if (currentRow.some((field) => field.length > 0)) {
                      rows.push(currentRow);
                    }
                    currentRow = [];
                    currentField = "";

                    // Skip \r\n combination
                    if (char === "\r" && nextChar === "\n") {
                      i += 2;
                    } else {
                      i++;
                    }
                  } else {
                    // Regular character (including line breaks within quotes)
                    currentField += char;
                    i++;
                  }
                }

                // Add the last field and row
                currentRow.push(currentField.trim());
                if (currentRow.some((field) => field.length > 0)) {
                  rows.push(currentRow);
                }

                return rows;
              };

              const rows = parseCSV(csvContent);
              if (rows.length < 2) {
                return { ...section, publications: [] };
              }

              // Skip header row and parse data
              const publications = rows.slice(1).map((columns) => {
                return {
                  title: columns[0] || "",
                  author: columns[1] || "",
                  abstract: columns[2] || "",
                };
              }).filter((pub) => pub.title && pub.author); // Filter out empty rows

              return { ...section, publications };
            } catch (error) {
              console.error("Error processing CSV:", error);
              return { ...section, publications: [] };
            }
          }),
        );
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
        showAcceptedPublications: !!data.showAcceptedPublications,
        acceptedPublications: processedPublications,
      });
    } catch (error) {
      console.error(
        `Error fetching page with slug '${ctx.params.slug}':`,
        error,
      );

      return ctx.render({
        title: "Page Not Found",
        description: "We couldn't find the page you're looking for.",
        slug: ctx.params.slug,
        layoutType: "standard",
        content: [],
        showAcceptedPublications: false,
        acceptedPublications: [],
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
    showAcceptedPublications,
    acceptedPublications,
    error,
  } = data;

  const parsedContent = parseContent(Array.isArray(content) ? content : []);

  // Helper function to format authors with affiliations
  const formatAuthors = (authorString: string) => {
    if (!authorString) return null;

    // Split by semicolon to get individual authors
    const authors = authorString.split(";").map((author) => author.trim());

    return authors.map((author, index) => {
      // Check if author has affiliations (indicated by colon)
      if (author.includes(":")) {
        const [name, affiliationsStr] = author.split(":", 2);
        const affiliations = affiliationsStr.split(",").map((aff) =>
          aff.trim()
        );

        // Format: "Name, Affiliation1, Affiliation2"
        return (
          <div key={index}>
            {`${name.trim()}, ${affiliations.join(", ")}`}
          </div>
        );
      } else {
        // Just the name if no affiliations
        return <div key={index}>{author}</div>;
      }
    });
  };

  // Helper function to render accepted publications
  const renderAcceptedPublications = () => {
    if (!showAcceptedPublications || !acceptedPublications?.length) {
      return null;
    }

    // Generate anchor IDs from section titles
    const generateAnchorId = (title: string) => {
      return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .trim();
    };

    const sections = acceptedPublications.map((section, index) => ({
      ...section,
      anchorId: generateAnchorId(section.sectionTitle),
    }));

    return (
      <>
        {/* Jump to navigation - only show if more than one section */}
        {sections.length > 1 && (
          <div class="mb-12 flex flex-wrap items-center gap-3">
            <h3 class="text-lg font-semibold text-gray-800">Jump to:</h3>
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#${section.anchorId}`}
                class="inline-block px-3 py-1 bg-aarhus-red text-white text-xs rounded-full hover:bg-aarhus-red/80 transition-colors shadow-sm"
              >
                {section.sectionTitle}
              </a>
            ))}
          </div>
        )}

        {/* Render sections with anchor links */}
        {sections.map((section, index) => (
          <section key={index} class="mb-12">
            <h2
              id={section.anchorId}
              class="text-3xl font-bold text-aarhus-red mb-6"
            >
              {section.sectionTitle}
            </h2>
            {section.publications && section.publications.length > 0
              ? (
                <div class="space-y-6">
                  {section.publications.map((publication, pubIndex) => (
                    <div key={pubIndex} class="bg-gray-50 p-6 rounded-lg">
                      <h3 class="text-xl font-bold text-aarhus-red mb-3">
                        {publication.title}
                      </h3>
                      <div class="text-sm text-gray-700 mb-3 tracking-wide">
                        {formatAuthors(publication.author)}
                      </div>
                      <h4 class="text-lg font-semibold text-gray-800 mb-2 tracking-wide">
                        Abstract
                      </h4>
                      <div class="text-gray-600 leading-relaxed">
                        {publication.abstract}
                      </div>
                    </div>
                  ))}
                </div>
              )
              : (
                <div class="bg-gray-50 p-6 rounded-lg">
                  <p class="text-gray-600">
                    {section.csvFile?.asset?.originalFilename
                      ? "Loading publications..."
                      : "No publications file uploaded"}
                  </p>
                </div>
              )}
          </section>
        ))}
      </>
    );
  };

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
      {layoutType === "standard"
        ? (
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="prose max-w-none min-h-[60vh]">
              {/* Standard layout content */}
              <div class="text-lg mb-12">{parsedContent}</div>

              {/* Accepted Publications */}
              {renderAcceptedPublications()}
            </div>
          </div>
        )
        : (
          <div class="flex-1 flex min-h-[60vh]">
            {/* Two-column layout with image */}
            <ContentSection
              content={parsedContent}
              imagePosition={imagePosition || "right"}
              imageSrc={imageUrl}
              imageAlt={imageAlt}
            />

            {/* For two-column layout, add components after the ContentSection */}
            {showAcceptedPublications && (
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Accepted Publications */}
                {renderAcceptedPublications()}
              </div>
            )}
          </div>
        )}
    </>
  );
}
