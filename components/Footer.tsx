import {
  CONFERENCE_END_DATE,
  CONFERENCE_LOCATION,
  CONFERENCE_START_DATE,
  submissionTypes,
  getCollatedSubmissionTypes,
  quickLinks,
} from "../data/conferenceDates.ts";

export default function Footer() {
  const collatedTypes = getCollatedSubmissionTypes(submissionTypes);
  const sortedCollatedTypes = [...collatedTypes].sort((a, b) =>
    new Date(a.dates.deadline).getTime() - new Date(b.dates.deadline).getTime()
  );

  const ImportantDatesSection = () => (
    <div class="mb-8 md:mb-0 md:col-span-2">
      <h3 class="font-roboto-condensed font-bold text-lg mb-4">
        IMPORTANT DATES
      </h3>
      <div class="space-y-6">
        {sortedCollatedTypes.map((item) => (
          <div key={item.type} class="space-y-2">
            <h4 class="font-roboto-condensed font-bold text-white/80">
              {item.names.join(", ")}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="text-sm">
                <span class="font-bold">{item.dates.deadline}</span>
                <br />
                <span class="text-gray-200">Deadline</span>
              </div>
              <div class="text-sm">
                <span class="font-bold">{item.dates.notification}</span>
                <br />
                <span class="text-gray-200">Notification</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
          <ImportantDatesSection />

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
