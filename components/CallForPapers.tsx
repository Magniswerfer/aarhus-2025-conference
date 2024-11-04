// components/CallForPapers.tsx
export default function CallForPapers() {
  const dates = [
    { date: "20th February 2025", event: "Deadline Papers, Critiques" },
    { date: "6th March 2025", event: "Deadline, Workshops" },
    { date: "3rd April 2025", event: "Notification of acceptance, Workshops" },
    { date: "29th April 2025", event: "Notification of acceptance, Papers and Critiques" },
    { date: "6th May 2025", event: "Deadline, Work in Progress" },
    { date: "12th June 2025", event: "Notification of acceptance: Work in Progress" },
    { date: "18th - 22nd August 2025", event: "Workshops and Conference" }
  ];

  return (
    <section id="participation_section" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-roboto-condensed mb-10">
            Call for Contributions
          </h3>
          <div className="font-roboto-condensed mb-16">
            <p className="mb-6">
              We invite submissions from authors who understand themselves in line with 
              the previous Aarhus Conferences, as well as authors from other fields who 
              wish to contribute to the discourse on improving computing for the human 
              condition in a world of multiple crises.
            </p>
            <p className="mb-6">
              At the conference we will hear from various knowledge areas such as social 
              science, humanities, engineering, computing, design, and interdisciplinary 
              combinations hereof.
            </p>
            <p className="mb-6">
              In particular, we invite agenda setting papers, but other types of papers 
              that report on 'computing and how to improve' are also of interest.
            </p>
            <p>
              Computing (X) Crisis calls for Papers, Critiques, Workshops, and Work-in-Progress.
            </p>
          </div>

          <h3 className="text-4xl font-roboto-condensed mb-8">
            Important Dates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-roboto-condensed">
            {dates.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="text-sm">{item.date}</div>
                <div className="text-sm">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
