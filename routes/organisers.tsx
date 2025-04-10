import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";
import { client } from "../utils/sanity.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";
import { BlockContent, parseContent } from "../utils/sanityParser.tsx";

interface CommitteeMember {
  name: string;
  affiliation: string;
}

interface Committee {
  title: string;
  members: CommitteeMember[];
  email?: string;
  specialNote?: BlockContent[];
}

interface OrganizersData {
  title: string;
  description: string;
  committees: Committee[];
  footerNote: string;
}

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

// Fallback data in case the fetch fails
const fallbackData: OrganizersData = {
  title: "Organisers",
  description:
    "Meet the dedicated team behind the Aarhus 2025 Conference organisation",
  committees: [
    {
      title: "General Chairs",
      members: [
        { name: "Morten Kyng", affiliation: "Aarhus University" },
        { name: "Lone Koefoed Hansen", affiliation: "Aarhus University" },
        { name: "Clemens Klokmose", affiliation: "Aarhus University" },
      ],
      email: "general-chairs.aarhus2025@maillist.au.dk",
    },
    // Add all your other committees here as fallback
  ],
  footerNote:
    "The organising committee information is subject to updates. Please check back regularly for the most current information.",
};

export const handler: Handlers<OrganizersData> = {
  async GET(_req: Request, ctx: FreshContext): Promise<Response> {
    try {
      // First check if we can get any data at all
      const allDocuments = await client.fetch(`*[_type == "organisers"]`);
      //console.log("All organizers documents:", allDocuments);

      // If we have documents, try to get the first one
      if (allDocuments && allDocuments.length > 0) {
        // Use a simpler query first
        const data = allDocuments[0];
        //console.log("Using first document:", data);

        // Create a properly structured object that matches our interface
        const structuredData: OrganizersData = {
          title: data.title || "Organisers",
          description: data.description || fallbackData.description,
          committees: Array.isArray(data.committees)
            ? data.committees.map((committee: any) => ({
              title: committee.title || "",
              email: committee.email || undefined,
              specialNote: Array.isArray(committee.specialNote)
                ? committee.specialNote
                : [],
              members: Array.isArray(committee.members)
                ? committee.members.map((member: any) => ({
                  name: member.name || "",
                  affiliation: member.affiliation || "",
                }))
                : [],
            }))
            : fallbackData.committees,
          footerNote: data.footerNote || fallbackData.footerNote,
        };

        return ctx.render(structuredData);
      }

      //console.log("No documents found, using fallback data");
      return ctx.render(fallbackData);
    } catch (error) {
      //console.error("Error fetching organizers data:", error);
      return ctx.render(fallbackData);
    }
  },
};

export default function OrganizersPage({ data }: { data: OrganizersData }) {
  const { title, description, committees, footerNote } = data;

  return (
    <>
      <Head>
        <title>{title || "Organisers"} | Aarhus 2025</title>
        <meta name="description" content={description} />
      </Head>
      <div class="bg-aarhus-red py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            {title || "Organisers"}
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">
            {description}
          </p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {committees.map((committee) => (
            <div class="bg-gray-50 p-6 rounded-lg flex flex-col h-full">
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <h2 class="text-2xl font-bold text-aarhus-red">
                    {committee.title}
                  </h2>
                  {committee.email && (
                    <a
                      href={`mailto:${committee.email}`}
                      class="flex items-center gap-2 text-sm text-gray-600 hover:text-aarhus-red transition-colors"
                    >
                      <MailIcon />
                      <span class="hidden md:inline">Contact</span>
                    </a>
                  )}
                </div>
                <ul class="space-y-3">
                  {committee.members.map((member) => (
                    <li>
                      <p class="font-semibold">{member.name}</p>
                      <p class="text-gray-600">{member.affiliation}</p>
                    </li>
                  ))}
                </ul>
              </div>
              {committee.specialNote && (
                <div class="mt-4 text-sm text-gray-600 italic">
                  {parseContent(committee.specialNote)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div class="mt-12 bg-gray-50 p-6 rounded-lg">
          <div class="text-gray-600 text-sm">
            {footerNote}
          </div>
        </div>
      </div>
    </>
  );
}
