import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { client } from "../utils/sanity.ts";
import ExpandableBio from "../islands/ExpandableBio.tsx";
import AnimatedLink from "../islands/AnimatedLink.tsx";

interface AcceptedWorkshop {
  _id: string;
  title: string;
  contactName: string;
  contactEmail: string;
  workshopDocument: string;
  description: string;
  website?: string;
  organizers?: {
    name: string;
    email: string;
    affiliation: string;
  }[];
}

interface Data {
  workshops: AcceptedWorkshop[];
  error?: string;
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    try {
      const query = `*[_type == "acceptedWorkshop"] {
        _id,
        title,
        contactName,
        contactEmail,
        workshopDocument,
        description,
        website,
        organizers
      }`;
      
      const workshops = await client.fetch(query);
      return ctx.render({ workshops });
    } catch (err) {
      console.error("Error fetching workshops:", err);
      return ctx.render({ workshops: [], error: "Failed to load workshops" });
    }
  },
};

export default function AcceptedWorkshops({ data }: PageProps<Data>) {
  const { workshops, error } = data;

  return (
    <>
      <Head>
        <title>Accepted Workshops | Aarhus 2025 Conference</title>
      </Head>

      <div class="bg-aarhus-red py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            {"Accepted Workshops"}
          </h1>
          <p class="text-xl text-white/90 max-w-3xl">
            Here you can find the accepted workshops for the Aarhus 2025 Conference.
          </p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {error && <p class="text-red-500">{error}</p>}
        
        {!error && workshops.length === 0 && (
          <div class="bg-gray-50 p-6 rounded-lg">
            <p>No workshops have been accepted yet.</p>
          </div>
        )}
        
        <div class="space-y-10">
          {workshops.map((workshop) => (
            <div key={workshop._id} class="bg-gray-50 p-6 rounded-lg">
              <div class="flex flex-col">
                <h3 class="text-2xl font-bold text-aarhus-red mb-2">
                  {workshop.title}
                </h3>
                {workshop.organizers && workshop.organizers.length > 0 && (
                  <div class="mb-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-2">Organizers:</h4>
                    <p class="text-gray-600">
                      {workshop.organizers.map((organizer, index) => (
                        <span key={index}>
                          {organizer.name}
                          {index < (workshop.organizers?.length ?? 0) - 2 ? ", " : ""}
                          {index === (workshop.organizers?.length ?? 0) - 2 ? " & " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                <div class="mb-4">
                  <h4 class="text-lg font-semibold text-gray-800 mb-2">Description:</h4>
                  <ExpandableBio text={workshop.description} />
                </div>
                <div class="flex flex-col space-y-2 mb-4">
                  {/* <AnimatedLink href={workshop.workshopDocument} text="Workshop document" /> */}
                  {workshop.website && workshop.website.startsWith('http') && (
                    <AnimatedLink href={workshop.website} text="Website" />
                  )}
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-800 mb-2">Contact:</h4>
                  <p class="text-gray-600">
                    {workshop.contactName} | <a href={`mailto:${workshop.contactEmail}`} class="text-aarhus-red hover:underline">{workshop.contactEmail}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
