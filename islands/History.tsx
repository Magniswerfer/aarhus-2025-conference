import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const conferences = [
  {
    year: "1975",
    title: "Arbejdsformer i systemudvikling",
    description:
      "The, primarily Nordic, conference in 1975 was a milestone in defining the development of computer-based, socio-technical systems as an area where the end-users should have a major say.",
  },
  {
    year: "1985",
    title: "Computers and Democracy",
    description:
      'Focus on practical collaboration with workers and theoretical contributions on topics like object orientation and software as a process. This conference was truly international, and resulted in the 1987 collection "Computers and Democracy" from selected papers.',
  },
  {
    year: "1995",
    title: "Computers in Context joining forces in design",
    description:
      "Focusing on the variety of disciplines involved with the design of computer artifacts as critical action. Over the years the involvement of end-users has become standard procedure in many organizations, today end-user involvement is not always critical action per se.",
  },
  {
    year: "2005",
    title: "Critical Computing – between sense and sensibility",
    description:
      "Focus on revitalize the idea of IT-research as critical action, not only as workplace actionism, but also by integrating a broader scope of critical analysis and critical practice.",
  },
  {
    year: "2015",
    title: "Critical Alternatives",
    description:
      "Focus on critical alternatives in alignment with utopian principles—that is, the hope that things might not only be different but also radically better. Critical alternatives matter and make people reflect.",
  },
  {
    year: "2025",
    title: "Computing [X] Crisis",
    description:
      "Focus on that today, 'crisis' characterize developments in climate, economic inequality, democracy, relations among societies and, more broadly, quality of life. And at the same, time computing seems almost omnipresence. For good and for bad.",
  },
];

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  // Auto-advance for mobile/tablet
  useEffect(() => {
    let intervalId;
    if (!isDesktop && isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % conferences.length);
      }, 5000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [isDesktop, isAutoPlaying]);

  return (
    <div className="bg-black text-white">
      {/* Mobile/Tablet Carousel */}
      <div className={`${!isDesktop ? "block" : "hidden"}`}>
        <div className="relative h-[26rem] px-6 py-8">
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + conferences.length) % conferences.length,
              )
            }
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 text-white p-2"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % conferences.length)
            }
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 text-white p-2"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="h-full flex flex-col justify-between items-center">
            <div className="max-w-lg mx-auto w-full">
              <div className="text-6xl font-bold mb-4 mx-4">
                {conferences[currentSlide].year}
              </div>
              <div className="text-xl font-medium mb-4 mx-4">
                {conferences[currentSlide].title}
              </div>
              <div className="text-sm text-gray-300 leading-relaxed mx-4">
                {conferences[currentSlide].description}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {conferences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200
                    ${index === currentSlide ? "bg-white" : "bg-gray-600"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div
        className={`${isDesktop ? "block" : "hidden"} max-w-[110rem] mx-auto`}
      >
        <div className="grid grid-cols-6 gap-6">
          {conferences.map((conference, index) => (
            <div
              key={conference.year}
              className="relative h-80"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base content */}
              <div className="absolute inset-0 p-6 pt-20 cursor-pointer bg-black border border-transparent transition-colors duration-200 hover:border-gray-700">
                <div className="text-6xl font-bold mb-4">{conference.year}</div>
                <div className="text-lg leading-snug">{conference.title}</div>
              </div>
              {/* Hover content */}
              <div
                className={`absolute inset-0 bg-black p-6 transition-all duration-200
                  ${hoveredIndex === index ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                <div className="text-3xl font-bold mb-4">{conference.year}</div>
                <div className="text-lg font-medium mb-4">
                  {conference.title}
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  {conference.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferenceHistory;
