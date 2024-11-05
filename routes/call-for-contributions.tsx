import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";
import ConferenceDates from "../components/ConferenceDates.tsx";

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

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="prose max-w-none">
            <p class="text-lg mb-8">
              At the conference we will hear from various knowledge areas such as social science, humanities, 
              engineering, computing, design, and interdisciplinary combinations hereof. In particular, we invite 
              agenda setting papers, but other types of papers that report on 'computing and how to improve' are 
              also of interest.
            </p>

            {/* Contribution Types */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Submission Types</h2>
              <p class="mb-6">Computing (X) Crisis calls for the following types of contributions:</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="/call-for-contributions/papers" class="block group">
                  <div class="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 ">
                    <h3 class="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">Papers</h3>
                    <p class="text-gray-600">Full research papers addressing fundamental issues and proposing new agendas with potential for long-lasting impact.</p>
                  </div>
                </a>

                <a href="/call-for-contributions/critiques" class="block group">
                  <div class="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 ">
                    <h3 class="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">Critiques</h3>
                    <p class="text-gray-600">Critical and insightful perspectives challenging the status quo of computing, including essays, creative writing, and artwork.</p>
                  </div>
                </a>

                <a href="/call-for-contributions/workshops" class="block group">
                  <div class="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 ">
                    <h3 class="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">Workshops</h3>
                    <p class="text-gray-600">Interactive sessions for debate and co-development of ideas related to Computing (X) Crisis.</p>
                  </div>
                </a>

                <a href="/call-for-contributions/work-in-progress" class="block group">
                  <div class="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 ">
                    <h3 class="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">Work-in-Progress</h3>
                    <p class="text-gray-600">Presentations of emerging ideas and tentative findings that engage with the conference theme.</p>
                  </div>
                </a>
                
                <a href="/call-for-contributions/demos" class="block group">
                  <div class="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 ">
                    <h3 class="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">Demos</h3>
                    <p class="text-gray-600">Demonstrations of, e.g., novel interactions techniques, activitism, etc.</p>
                  </div>
                </a>

              </div>
            </section>
            
            {/* Important Dates using component */}
            <ConferenceDates 
              displayStyle="grid"
              class="mb-16"
              title="Important Dates"
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
