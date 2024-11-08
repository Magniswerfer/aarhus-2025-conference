import { h } from 'preact';
import { useState } from 'preact/hooks';

const conferences = [
  {
    year: "1975",
    title: "Arbejdsformer i systemudvikling",
    description: "The, primarily Nordic, conference in 1975 was a milestone in defining the development of computer-based, socio-technical systems as an area where the end-users should have a major say."
  },
  {
    year: "1985",
    title: "Computers and Democracy",
    description: "Focus on practical collaboration with workers and theoretical contributions on topics like object orientation and software as a process. This conference was truly international, and resulted in the 1987 collection \"Computers and Democracy\" from selected papers."
  },
  {
    year: "1995",
    title: "Computers in Context joining forces in design",
    description: "Focusing on the variety of disciplines involved with the design of computer artifacts as critical action. Over the years the involvement of end-users has become standard procedure in many organizations, today end-user involvement is not always critical action per se."
  },
  {
    year: "2005",
    title: "Critical Computing – between sense and sensibility",
    description: "Focus on revitalize the idea of IT-research as critical action, not only as workplace actionism, but also by integrating a broader scope of critical analysis and critical practice."
  },
  {
    year: "2015",
    title: "Critical Alternatives",
    description: "Focus on critical alternatives in alignment with utopian principles—that is, the hope that things might not only be different but also radically better. Critical alternatives matter and make people reflect."
  },
  {
    year: "2025",
    title: "Computing [X] Crisis",
    description: "Focus on that today, 'crisis' characterize developments in climate, economic inequality, democracy, relations among societies and, more broadly, quality of life. And at the same, time computing seems almost omnipresence. For good and for bad."
  }
];

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-black text-white">
      <div className="max-w-[110rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {conferences.map((conference, index) => (
            <div
              key={conference.year}
              className="relative h-80"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base content - always visible */}
              <div className="absolute inset-0 p-6 pt-20 cursor-pointer bg-black border border-transparent transition-colors duration-200 hover:border-gray-700">
                <div className="text-6xl font-bold mb-4">{conference.year}</div>
                <div className="text-lg leading-snug">{conference.title}</div>
              </div>

              {/* Hover content */}
              <div
                className={`absolute inset-0 bg-black p-6 transition-all duration-200
                  ${hoveredIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              >
                <div className="text-3xl font-bold mb-4">{conference.year}</div>
                <div className="text-lg font-medium mb-4">{conference.title}</div>
                <div className="text-xs text-gray-300 leading-relaxed">{conference.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferenceHistory;
