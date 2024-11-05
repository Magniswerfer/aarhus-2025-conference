// components/Footer.tsx
import {
  CONFERENCE_END_DATE,
  CONFERENCE_LOCATION,
  CONFERENCE_START_DATE,
  conferenceDates,
} from "../data/conferenceDates.ts";

export default function Footer() {
  // Get a subset of important dates for the footer
  const footerDates = conferenceDates.slice(0, 6); // First 6 dates, excluding TBA and conference dates

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
                {CONFERENCE_START_DATE} - {CONFERENCE_END_DATE}
                <br />
                {CONFERENCE_LOCATION}
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div class="mb-8 md:mb-0 md:col-span-2">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">
              IMPORTANT DATES
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              {footerDates.map((item) => (
                <div class="text-sm">
                  <span class="font-bold">{item.date}</span>
                  <br />
                  <span class="text-gray-200">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

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
                href="/organizers"
                class="hover:text-gray-200 transition-colors"
              >
                Organizers
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
              src="/images/ACM-In-Cooperation_medium.svg"
              alt="ACM Logo"
              class="h-16"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
