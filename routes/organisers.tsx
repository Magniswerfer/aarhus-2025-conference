import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";

interface CommitteeMember {
  name: string;
  affiliation: string;
}

interface Committee {
  title: string;
  members: CommitteeMember[];
  email?: string;
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

const committees: Committee[] = [
  {
    title: "General Chairs",
    members: [
      { name: "Morten Kyng", affiliation: "Aarhus University" },
      { name: "Lone Koefoed Hansen", affiliation: "Aarhus University" },
      { name: "Clemens Klokmose", affiliation: "Aarhus University" },
    ],
    email: "general-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Program Chairs",
    members: [
      { name: "Susanne Bødker", affiliation: "Aarhus University" },
      { name: "Alex Taylor", affiliation: "University of Edinburgh" },
      { name: "Eva Eriksson", affiliation: "Aarhus University" },
    ],
    email: "paper-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Proceedings Chair",
    members: [
      { name: "Niels Olof Bouvin", affiliation: "Aarhus University" },
    ],
    email: "proceeding-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Critiques Chairs",
    members: [
      { name: "Ida Larsen-Ledet", affiliation: "University College Cork" },
      { name: "Dag Svanæs", affiliation: "Norwegian University of Science and Technology" },
      { name: "Jussi Parikka", affiliation: "Aarhus University" },
    ],
    email: "critique-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Work-in-Progress Chairs",
    members: [
      { name: "Eve Hoggan", affiliation: "Aarhus University" },
      { name: "Valkyrie Savage", affiliation: "Copenhagen University" },
    ],
    email: "work-in-progress-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Student Volunteer Chair",
    members: [
      { name: "Magnus Høholt Kaspersen", affiliation: "Aarhus University" },
    ],
    email: "student-volunteer-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Workshop Chairs",
    members: [
      { name: "Jonas Frich", affiliation: "Aarhus University" },
      { name: "Midas Nouwens", affiliation: "Aarhus University" },
    ],
    email: "workshop-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Doctoral Consortium Chairs",
    members: [
      { name: "Ignacio Avellino", affiliation: "Sorbonne Université" },
      { name: "Minna Pakanen", affiliation: "Aarhus University" },
    ],
    email: "doctoral-consortium-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Demonstration Chairs",
    members: [
      { name: "Rikke Hagensby Jensen", affiliation: "Aarhus University" },
      { name: "Michael Wessely", affiliation: "Aarhus University" }
    ],
    email: "demo-chairs.aarhus2025@maillist.au.dk"
  },
  {
    title: "Web & Graphics Chairs",
    members: [
      { name: "Magnus Høholt Kaspersen", affiliation: "Aarhus University" },
      { name: "Majken Kirkegaard Rasmussen", affiliation: "Aarhus University" },
    ]
  },
];

export default function OrganizersPage() {
  return (
    <>
      <Head>
        <title>Organisers | Aarhus 2025</title>
        <meta name="description" content="Meet the organising committee of the Aarhus 2025 Conference" />
      </Head>
      <Layout>
        <div class="bg-aarhus-red py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              Organisers
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              Meet the dedicated team behind the Aarhus 2025 Conference organisation
            </p>
          </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {committees.map((committee) => (
              <div class="bg-gray-50 p-6 rounded-lg">
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
                {committee.title === "Critiques Chairs" && (
                  <p class="mt-4 text-sm text-gray-600 italic">
                    Thank you to former Critiques Chair, Marie Louise Juul Søndergaard.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div class="mt-12 bg-gray-50 p-6 rounded-lg">
            <p class="text-gray-600 text-sm">
              The organising committee information is subject to updates.
              Please check back regularly for the most current information.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}