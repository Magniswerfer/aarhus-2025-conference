import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";
import History from "../islands/History.tsx";

export default function CallForContributionsPage() {
  return (
    <>
      <Head>
        <title>Call for Contributions | Aarhus 2025</title>
        <meta name="description" content="Submit your contributions to the Aarhus 2025 Conference exploring Computing (X) Crisis" />
      </Head>
      <Layout>
        {/* Hero Section */}
        <div class="bg-aarhus-red py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              Call for Contributions
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              We invite submissions from authors who understand themselves in line with the previous Aarhus Conferences, 
              as well as authors from other fields who wish to contribute to the discourse on improving computing for 
              the human condition in a world of multiple crises.
            </p>
          </div>
        </div>
        <History />

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="prose max-w-none">
            <p class="text-lg mb-8">
              At the conference we will hear from various knowledge areas such as social science, humanities, 
              engineering, computing, design, and interdisciplinary combinations hereof. In particular, we invite 
              agenda setting papers, but other types of papers that report on 'computing and how to improve' are 
              also of interest.
            </p>

            {/* Papers Section */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Papers</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Papers are expected to be influential throughout the next decennium by addressing fundamental issues 
                  and proposing new agendas or in other ways offering research contributions with the potential for 
                  long-lasting impact.
                </p>
                <h3 class="font-semibold mb-2">Submissions will be evaluated based on:</h3>
                <ul class="list-disc ml-6 mb-4">
                  <li>Strong contribution to theory and practice as regards Computing (X) Crisis</li>
                  <li>Potential for long-lasting impact</li>
                  <li>New perspectives</li>
                </ul>
                <div class="border-t border-gray-200 pt-4 mt-4">
                  <h3 class="font-semibold mb-2">Submission Guidelines:</h3>
                  <ul class="list-disc ml-6">
                    <li>Short papers: Below 5,000 words</li>
                    <li>Long papers: 5,000 - 12,000 words</li>
                    <li>Papers exceeding 12,000 words should have very good reasons</li>
                    <li>Use the ACM Conference Proceedings Primary Article template</li>
                    <li>Single-column format for the reviewing phase</li>
                    <li>Submissions must be anonymized</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Critiques Section */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Critiques</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  The Critique submission category establishes a forum for critical and insightful perspectives that 
                  challenge the status quo of computing. Submissions must address the conference theme.
                </p>
                <h3 class="font-semibold mb-2">Submission Formats Include:</h3>
                <ul class="list-disc ml-6 mb-4">
                  <li>Essays</li>
                  <li>Creative writing (manifestos, stories, fictions)</li>
                  <li>Pictorial</li>
                  <li>Artwork (software, video games, audio-visual art)</li>
                  <li>Theoretical or analytical articles</li>
                  <li>Provotypes</li>
                  <li>Artifacts with networked, generative, and/or programmed elements</li>
                </ul>
                <div class="border-t border-gray-200 pt-4 mt-4">
                  <h3 class="font-semibold mb-2">Evaluation Criteria:</h3>
                  <ul class="list-disc ml-6">
                    <li>Ability to critically examine a topic, inspire, and/or spark debate and reflection</li>
                    <li>Relevance to the conference theme: Computing (X) Crisis</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Work-in-Progress Section */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Work-in-Progress</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  The Work-in-Progress category is an opportunity to present ideas in the making and tentative findings.
                </p>
                <h3 class="font-semibold mb-2">Submission Guidelines:</h3>
                <ul class="list-disc ml-6">
                  <li>Maximum 2,500 words (excluding images, figures and references)</li>
                  <li>Use the ACM Conference Proceedings Primary Article template</li>
                  <li>Single-column format for the reviewing phase</li>
                  <li>Submissions must be anonymized</li>
                </ul>
              </div>
            </section>

            {/* Important Dates */}
            <section>
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Important Dates</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">20th February 2025</h3>
                  <p>Deadline Papers, Critiques</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">6th March 2025</h3>
                  <p>Deadline, Workshops</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">3rd April 2025</h3>
                  <p>Notification of acceptance, Workshops</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">29th April 2025</h3>
                  <p>Notification of acceptance, Papers and Critiques</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">6th May 2025</h3>
                  <p>Deadline, Work in Progress</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <h3 class="font-semibold mb-2">12th June 2025</h3>
                  <p>Notification of acceptance: Work in Progress</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
