// components/Footer.tsx
export default function Footer() {
  return (
    <footer class="bg-aarhus-red text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Conference Info */}
          <div class="mb-8 md:mb-0">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">CONFERENCE INFO</h3>
            <div class="flex items-start">
              <img src="/images/Bandaid-Icon-2.png" alt="Conference Logo" class="h-6 w-6 mr-4 mt-1" />
              <div class="font-roboto-condensed">
                18-22 August, 2025<br />
                Aarhus, Denmark
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div class="mb-8 md:mb-0 md:col-span-2">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">IMPORTANT DATES</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="text-sm">
                <span class="font-medium">20th February 2025</span><br />
                <span class="text-gray-200">Deadline Papers, Critiques</span>
              </div>
              <div class="text-sm">
                <span class="font-medium">6th March 2025</span><br />
                <span class="text-gray-200">Deadline, Workshops</span>
              </div>
              <div class="text-sm">
                <span class="font-medium">3rd April 2025</span><br />
                <span class="text-gray-200">Notification of acceptance, Workshops</span>
              </div>
              <div class="text-sm">
                <span class="font-medium">29th April 2025</span><br />
                <span class="text-gray-200">Notification of acceptance, Papers and Critiques</span>
              </div>
              <div class="text-sm">
                <span class="font-medium">6th May 2025</span><br />
                <span class="text-gray-200">Deadline, Work in Progress</span>
              </div>
              <div class="text-sm">
                <span class="font-medium">12th June 2025</span><br />
                <span class="text-gray-200">Notification of acceptance: Work in Progress</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div class="mb-8 md:mb-0">
            <h3 class="font-roboto-condensed font-bold text-lg mb-4">QUICK LINKS</h3>
            <nav class="flex flex-col space-y-2">
              <a href="/call-for-contributions" class="hover:text-gray-200 transition-colors">
                Call for Contributions
              </a>
              <a href="/author-guidelines" class="hover:text-gray-200 transition-colors">
                Author Guidelines
              </a>
              <a href="/organizers" class="hover:text-gray-200 transition-colors">
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
            <img src="/images/aulogo_uk_var1_white.png" alt="Aarhus University" class="h-12" />
          </div>
          <div>
            <img src="/images/ACM-In-Cooperation_medium.svg" alt="ACM Logo" class="h-16" />
          </div>
        </div>
      </div>
    </footer>
  );
}
