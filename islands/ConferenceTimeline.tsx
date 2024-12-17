// islands/ConferenceTimeline.tsx
import { Component } from "preact";
import { conferences } from "../data/previousConferences.ts";

export default class ConferenceTimeline extends Component {
  render() {
    return (
      <div class="max-w-4xl mx-auto px-4">
        <div class="relative ml-6 md:ml-16">
          {/* Line container with absolute positioning */}
          <div class="absolute left-0 top-0 bottom-0 hidden md:block">
            {/* Solid line starting from first dot */}
            <div
              class="absolute left-0 w-1 bg-gray-200"
              style="top: 150px; bottom: 40px;"
            />

            {/* Dotted line at the bottom */}
            <div
              class="absolute left-0 bottom-0 w-1 h-16"
              style="background: repeating-linear-gradient(to bottom, #E5E7EB 0, #E5E7EB 4px, transparent 4px, transparent 8px);"
            />
          </div>

          {conferences.map((conference) => (
            <div key={conference.year} class="relative mb-16">
              {/* Year marker - now vertically centered with card */}
              <div class="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full text-white flex items-center justify-center z-10">
                <div class="text-base md:text-lg font-bold">
                  {conference.year}
                </div>
              </div>

              {/* Card container */}
              <div class="ml-8 md:ml-16">
                <div class="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl">
                  {/* Added max-width to card */}
                  <div class="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Text content */}
                    <div class="flex-1">
                      <h3 class="text-xl font-bold mb-4">{conference.title}</h3>
                      <p class="text-gray-600 text-sm">
                        {conference.description}
                      </p>
                    </div>

                    {/* Proceedings placeholder */}
                    <div class="flex justify-center md:justify-start">
                      <div class="group cursor-pointer inline-block">
                        <div class="transition-transform transform group-hover:-translate-y-1">
                          <img
                            src={"images/preceedings_frontpages/placeholder.webp"}
                            alt={`${conference.year} Conference Proceedings`}
                            class="w-40 md:w-48 shadow-lg group-hover:shadow-xl"
                          />
                          <div class="mt-2 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                              <polyline points="10 9 9 9 8 9" />
                            </svg>
                            View Proceedings
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
