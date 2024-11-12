import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";

// Define committee member type
interface CommitteeMember {
  name: string;
  affiliation: string;
}

// Define committee type
interface Committee {
  title: string;
  members: CommitteeMember[];
}

// Committee data
const committees: Committee[] = [
  {
    title: "General Chairs",
    members: [
      { name: "Morten Kyng", affiliation: "Aarhus University" },
      { name: "Lone Koefoed Hansen", affiliation: "Aarhus University" },
      { name: "Clemens Klokmose", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Program Chairs",
    members: [
      { name: "Susanne Bødker", affiliation: "Aarhus University" },
      { name: "Alex Taylor", affiliation: "University of Edinburgh" },
      { name: "Eva Eriksson", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Proceedings Chair",
    members: [
      { name: "Niels Olof Bouvin", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Critiques Chairs",
    members: [
      { name: "Ida Larsen-Ledet", affiliation: "University College Cork" },
      { name: "Marie Louise Juul Søndergaard", affiliation: "Oslo School of Architecture and Design" },
      { name: "Jussi Parikka", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Work-in-Progress Chairs",
    members: [
      { name: "Eve Hoggan", affiliation: "Aarhus University" },
      { name: "Valkyrie Savage", affiliation: "Copenhagen University" },
    ],
  },
  {
    title: "Student Volunteer Chair",
    members: [
      { name: "Magnus Høholt Kaspersen", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Workshop Chairs",
    members: [
      { name: "Jonas Frich", affiliation: "Aarhus University" },
      { name: "Midas Nouwens", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Doctoral Consortium Chairs",
    members: [
      { name: "Ignacio Avellino", affiliation: "Sorbonne Université" },
      { name: "Minna Pakanen", affiliation: "Aarhus University" },
    ],
  },
  {
    title: "Demonstration Chairs",
    members: [
      { name: "Rikke Hagensby Jensen", affiliation: "Aarhus University" },
      { name: "Michael Wessely", affiliation: "Aarhus University" }
    ],
  },
  {
    title: "Web & Graphics Chairs",
    members: [
      { name: "Magnus Høholt Kaspersen", affiliation: "Aarhus University" },
      { name: "Majken Kirkegaard Rasmussen", affiliation: "Aarhus University" },
    ],
  },
];

export default function OrganizersPage() {
  return (
    <>
      <Head>
        <title>Organisers | Aarhus 2025</title>
        <meta name="description" content="Meet the organizing committee of the Aarhus 2025 Conference" />
      </Head>
      <Layout>
        {/* Hero Section */}
        <div class="bg-aarhus-red py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              Organizers
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              Meet the dedicated team behind the Aarhus 2025 Conference organisation
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {committees.map((committee) => (
              <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-2xl font-bold text-aarhus-red mb-4">
                  {committee.title}
                </h2>
                <ul class="space-y-3">
                  {committee.members.map((member) => (
                    <li>
                      <p class="font-semibold">{member.name}</p>
                      <p class="text-gray-600">{member.affiliation}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note about changes */}
          <div class="mt-12 bg-gray-50 p-6 rounded-lg">
            <p class="text-gray-600 text-sm">
              The organizing committee information is subject to updates.
              Please check back regularly for the most current information.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
