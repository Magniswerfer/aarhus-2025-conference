import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { conferences } from "../data/previousConferences.ts";

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState("mobile");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setViewMode("desktop");
      } else {
        setViewMode("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let intervalId;
    if (viewMode !== "desktop" && isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % conferences.length);
      }, 5000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [viewMode, isAutoPlaying]);

  const DesktopView = () => (
    <div className="overflow-hidden p-4">
      <div className="flex gap-4 h-80">
        {conferences.map((conference, index) => {
          const isHovered = hoveredIndex === index;
          const baseWidth = `${100 / conferences.length}%`;

          return (
            <div
              key={conference.year}
              style={{
                width: isHovered ? "24rem" : baseWidth,
                transition: "all 0.5s ease-in-out",
              }}
              className="relative cursor-pointer bg-black"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base content - always visible but fades out on hover */}
              <div
                className="absolute inset-0 p-6 transition-opacity duration-500"
                style={{
                  opacity: isHovered ? 0 : 1,
                }}
              >
                <div className="absolute top-1/3 left-6 right-6">
                  <div className="text-4xl font-bold mb-3">
                    {conference.year}
                  </div>
                  <div className="text-base leading-snug opacity-90">
                    {conference.title}
                  </div>
                </div>
              </div>

              {/* Hover content - fades in on hover */}
              <div
                className="absolute inset-0 p-6"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <div className="text-3xl font-bold mb-3">{conference.year}</div>
                <div className="text-base font-medium mb-3">
                  {conference.title}
                </div>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {conference.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="relative px-6 py-4
      h-[22rem]
      min-[500px]:h-[16rem]
      md:h-[18rem]">
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            (prev - 1 + conferences.length) % conferences.length
          )}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 text-white p-2"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % conferences.length)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 text-white p-2"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="flex flex-col justify-between items-center h-full">
        <div className="max-w-lg mx-auto w-full">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 mx-4">
            {conferences[currentSlide].year}
          </div>
          <div className="text-base sm:text-lg md:text-xl font-medium mb-3 md:mb-4 mx-4">
            {conferences[currentSlide].title}
          </div>
          <div className="text-sm text-gray-300 leading-relaxed mx-4">
            {conferences[currentSlide].description}
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-4 md:mt-6">
          {conferences.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? "bg-white" : "bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white w-full">
      <div className="max-w-[110rem] mx-auto">
        {viewMode === "desktop" ? <DesktopView /> : <MobileView />}
      </div>
    </div>
  );
};

export default ConferenceHistory;
