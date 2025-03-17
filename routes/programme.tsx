import { Head } from "$fresh/runtime.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";
import ExpandableBio from "../islands/ExpandableBio.tsx";

interface KeynoteSpeaker {
  name: string;
  title: string;
  bio: string;
  photoCredit?: string;
  imageUrl?: string;
}

interface ProgrammeData {
  title: string;
  description: string;
  keynoteSpeakers: KeynoteSpeaker[];
}

// Fallback data in case the fetch fails
const fallbackData: ProgrammeData = {
  title: "Preliminary Programme",
  description:
    "Explore our lineup of exciting keynote speakers and sessions for the Aarhus 2025 Conference",
  keynoteSpeakers: [],
};

export const handler: Handlers<ProgrammeData> = {
  async GET(_req: Request, ctx: FreshContext): Promise<Response> {
    try {
      // Fetch keynote speakers from Sanity with direct image URLs
      const keynoteSpeakers = await client.fetch(`
        *[_type == "keynoteSpeaker"] | order(name asc) {
          name,
          title,
          bio,
          photoCredit,
          "imageUrl": image.asset->url
        }
      `);

      // Create a structured data object
      const programmeData: ProgrammeData = {
        title: "Preliminary Programme",
        description:
          "The detailed programme schedule will be announced closer to the conference date.",
        keynoteSpeakers: keynoteSpeakers || [],
      };

      return ctx.render(programmeData);
    } catch (error) {
      console.error("Error fetching programme data:", error);
      return ctx.render(fallbackData);
    }
  },
};

export default function ProgrammePage({ data }: { data: ProgrammeData }) {
  const { title, description, keynoteSpeakers } = data;

  return (
    <>
      <Head>
        <title>{title} | Aarhus 2025</title>
        <meta name="description" content={description} />
      </Head>
      <div class="bg-aarhus-red py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">
            {description}
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-3xl font-bold text-aarhus-red mb-8">
          Confirmed Keynotes:
        </h2>

        {keynoteSpeakers.length === 0
          ? (
            <div class="bg-gray-50 p-6 rounded-lg">
              <p>Keynote speakers will be announced soon.</p>
            </div>
          )
          : (
            <div class="space-y-10">
              {keynoteSpeakers.map((speaker) => (
                <div class="bg-gray-50 p-6 rounded-lg">
                  <div class="flex flex-col md:flex-row gap-8">
                    {speaker.imageUrl && (
                      <div class="w-full md:w-1/4 lg:w-1/5">
                        <div class="overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-200 relative">
                          <img
                            src={`${speaker.imageUrl}?w=300&h=300&fit=crop`}
                            alt={speaker.name}
                            class="w-full h-full object-cover"
                          />
                          {speaker.photoCredit && (
                            <div class="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1">
                              Photo: {speaker.photoCredit}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-aarhus-red mb-2">
                        {speaker.name}
                      </h3>
                      <p class="text-gray-600 mb-4 text-lg">{speaker.title}</p>
                      <ExpandableBio text={speaker.bio} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        <div class="mt-16">
          <h2 class="text-3xl font-bold text-aarhus-red mb-8">
            Conference Schedule
          </h2>
          <div class="bg-gray-50 p-6 rounded-lg">
            <p class="mb-4">
              The detailed programme schedule will be announced closer to the
              conference date.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
