import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { client } from "../utils/sanity.ts";
import ExpandableBio from "../islands/ExpandableBio.tsx";

interface AcceptedWorkshop {
  _id: string;
  title: string;
  contactName: string;
  contactEmail: string;
  workshopDocument: string;
  description: string;
  website?: string;
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
        website
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
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
                <p class="text-gray-600 mb-4 text-lg">
                  Contact: {workshop.contactName} | <a href={`mailto:${workshop.contactEmail}`} class="text-aarhus-red hover:underline">{workshop.contactEmail}</a>
                </p>
                <div class="mb-4">
                  <ExpandableBio text={workshop.description} />
                </div>
                <div class="flex flex-col space-y-2 mt-4">
                  <a 
                    href={workshop.workshopDocument} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-aarhus-red hover:underline font-medium"
                  >
                    View Workshop Document
                  </a>
                  {workshop.website && (
                    <a 
                      href={workshop.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-aarhus-red hover:underline font-medium"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
