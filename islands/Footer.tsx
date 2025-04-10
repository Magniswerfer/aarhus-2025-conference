import { useEffect, useState } from "preact/hooks";
import ImportantDates from "./importantDates.tsx";

interface ConferenceInfo {
  startDate: string;
  endDate: string;
  location: string;
}

const CONFERENCE_INFO: ConferenceInfo = {
  startDate: "18th August 2025",
  endDate: "22nd August 2025",
  location: "Aarhus, Denmark",
};

export default function Footer() {
  return (
    <footer class="bg-aarhus-red text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Conference Info */}
          <div class="mb-8 md:mb-0">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">
              CONFERENCE INFO
            </h3>
            <div class="flex items-start">
              <img
                src="/images/Bandaid-Icon-2.png"
                alt="Conference Logo"
                class="h-6 w-6 mr-4 mt-1"
              />
              <div class="font-roboto-condensed">
                {CONFERENCE_INFO.startDate} - {CONFERENCE_INFO.endDate}
                <br />
                {CONFERENCE_INFO.location}
              </div>
            </div>
          </div>

          {/* Important Dates (Now an Island) */}
          <ImportantDates />

          {/* Quick Links */}
          <div class="mb-8 md:mb-0">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">
              QUICK LINKS
            </h3>
            <nav class="flex flex-col space-y-2">
              <a
                href="/call-for-contributions"
                class="hover:text-gray-200 transition-colors"
              >
                Call for Contributions
              </a>
              <a
                href="/author-guidelines"
                class="hover:text-gray-200 transition-colors"
              >
                Author Guidelines
              </a>
              <a
                href="/organisers"
                class="hover:text-gray-200 transition-colors"
              >
                Organisers
              </a>
              <a
                href="https://new.precisionconference.com/submissions"
                class="hover:text-gray-200 transition-colors"
              >
                Submission (PCS)
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <div class="font-roboto-condensed font-bold mb-2">
              HOSTED BY
            </div>
            <img
              src="/images/aulogo_uk_var1_white.png"
              alt="Aarhus University"
              class="h-12"
            />
          </div>
          <div>
            <img
              src="/images/ACM-In-Cooperation_medium_BW_homebrew.svg"
              alt="ACM Logo"
              class="h-16"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
