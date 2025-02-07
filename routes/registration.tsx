import Layout from "../layouts/layout.tsx";
import ContentSection from "../components/ContentSection.tsx";
import XBreaker from "../islands/XBreaker.tsx";
import { Head } from "$fresh/runtime.ts";

export default function RegistrationPage() {
    return (
      <>
        <Head>
          <title>Call for Contributions | Aarhus 2025</title>
          <meta
            name="description"
            content="Submit your contributions to the Aarhus 2025 Conference exploring Computing (X) Crisis"
          />
        </Head>
        <Layout>
          {/* Hero Section */}
          <div class="bg-aarhus-red py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                Registration
              </h1>
              <p class="text-xl text-white/90 max-w-3xl">
                Registration will open around the 10th of April 2025
              </p>
            </div>
          </div>
  
          {/* Main Content */}
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="prose max-w-none">
              <p class="text-lg mb-8">
              How to register: Registration will open around the 10th of April 2025.
              </p>
              <p class="text-lg mb-8">
              Rates: We are working on the budget. The final decision on registration rates will be public when registration opens. It will be around DKK 3,000 for regular attendees and DKK 1,750 for students. Workshop fees are included in the registration fee, however Workshop Only will be possible and will be around DKK 600 per workshop. Final fees to be confirmed.
              </p>
            </div>
          </div>
        </Layout>
      </>
    );
  }