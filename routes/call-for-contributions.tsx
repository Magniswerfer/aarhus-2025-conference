  import { Head } from "$fresh/runtime.ts";
  import Layout from "../layouts/layout.tsx";
  import ConferenceDates from "../components/ConferenceDates.tsx";
  import ContributionTypesGrid from "../components/ContributionTypesGrid.tsx";

  export default function CallForContributionsPage() {
    return (
      <>
        <Head>
          <title>Call for Contributions | Aarhus 2025</title>
          <meta
            name="description"
            content="Submit your contributions to the Aarhus 2025 Conference exploring Computing (X) Crisis"
          />
        </Head>
          {/* Hero Section */}
          <div class="bg-aarhus-red py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                Call for Contributions
              </h1>
              <p class="text-xl text-white/90 max-w-3xl">
                We invite submissions from authors who understand themselves in
                line with the previous Aarhus Conferences, as well as authors from
                other fields who wish to contribute to the discourse on improving
                computing for the human condition in a world of multiple crises.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="prose max-w-none">
              <p class="text-lg mb-8">
                At the conference we will hear from various knowledge areas such
                as social science, humanities, engineering, computing, design, and
                interdisciplinary combinations hereof. In particular, we invite
                agenda setting papers, but other types of papers that report on
                'computing and how to improve' are also of interest.
              </p>

              {/* Contribution Types */}
              <section class="mb-16 ">
                <h2 class="text-3xl font-bold text-aarhus-red mb-6">
                  Submission Types
                </h2>
                <p class="mb-6">
                  Computing (X) Crisis calls for the following types of
                  contributions:
                </p>

                <ContributionTypesGrid />
              </section>

              {/* Important Dates using component */}
              <ConferenceDates
                displayStyle="grid"
                class="mb-16"
                title="Important Dates"
              />
            </div>
          </div>
      </>
    );
  }
