import { Component } from "preact";

// Define types for proceedings links
type ProceedingsLink = {
  title: string;
  url: string;
};

type Conference = {
  year: number;
  title: string;
  description: string;
  proceedingsImage: string;
  proceedingsLinks: ProceedingsLink[];
  supplementaryLinks?: Array<{
    title: string;
    url: string;
    icon?: string;
  }>;
};

interface ConferenceTimelineProps {
  conferences: Conference[];
}

export default class ConferenceTimeline extends Component<ConferenceTimelineProps> {
  getSortedConferences() {
    return [...this.props.conferences].sort((a, b) => a.year - b.year);
  }

  renderSupplementaryLinks(links: Conference['supplementaryLinks']) {
    if (!links?.length) return null;

    return (
      <div class="mt-4 flex flex-wrap gap-4">
        {links.map((link) => (
          <a
            href={link.url}
            class="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon && (
              <span class="w-4 h-4" dangerouslySetInnerHTML={{ __html: link.icon }} />
            )}
            <span class="group-hover:underline">{link.title}</span>
          </a>
        ))}
      </div>
    );
  }

  render() {
    const sortedConferences = this.getSortedConferences();

    return (
      <div class="max-w-4xl mx-auto px-4">
        <div class="relative ml-6 md:ml-16">
          {/* Timeline line */}
          <div class="absolute left-0 top-0 bottom-0 hidden md:block">
            <div
              class="absolute left-0 w-1 bg-gray-200"
              style="top: 40px; bottom: 40px;"
            />
            <div
              class="absolute left-0 bottom-0 w-1 h-16"
              style="background: repeating-linear-gradient(to bottom, #E5E7EB 0, #E5E7EB 4px, transparent 4px, transparent 8px);"
            />
          </div>

          {sortedConferences.map((conference) => (
            <div key={conference.year} class="relative mb-16">
              {/* Year marker - desktop */}
              <div class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-1/2 w-16 h-16 bg-aarhus-red rounded-full text-white items-center justify-center z-10">
                <div class="text-lg font-bold">{conference.year}</div>
              </div>

              {/* Content container */}
              <div class="md:ml-16">
                {/* Year marker - mobile */}
                <div class="md:hidden w-20 h-20 bg-aarhus-red rounded-full text-white flex items-center justify-center mb-4 mx-auto">
                  <div class="text-2xl font-bold">{conference.year}</div>
                </div>

                {/* Conference card */}
                <div class="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl">
                  <div class="flex flex-col md:flex-row md:items-start gap-8">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold mb-4">{conference.title}</h3>
                      <p class="text-gray-600 text-sm">{conference.description}</p>
                      {this.renderSupplementaryLinks(conference.supplementaryLinks)}
                    </div>

                    {/* Proceedings section */}
                    {conference.proceedingsImage && (
                      <div class="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
                        <div class="group inline-block">
                          <div class="transition-transform transform group-hover:-translate-y-1">
                            <img
                              src={conference.proceedingsImage}
                              alt={`${conference.year} Conference Proceedings`}
                              class="w-40 md:w-48 shadow-lg group-hover:shadow-xl"
                            />
                            {conference.proceedingsLinks && (
                              <div class="mt-2 flex flex-col gap-2">
                                {conference.proceedingsLinks.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-center text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 group"
                                  >
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
                                    <span class="group-hover:underline">
                                      {link.title}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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
