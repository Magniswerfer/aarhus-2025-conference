import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { conferences } from "../data/previousConferences.ts";

// Import the CSS (will need to be handled by the bundler)
// This is a comment to show that we're aware CSS needs to be imported

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState("mobile");
  const descriptionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let intervalId: number | undefined;
    if (viewMode !== "desktop" && isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % conferences.length);
      }, 5000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [viewMode, isAutoPlaying]);

  // Handle showing scrollbar only when needed
  useEffect(() => {
    if (hoveredIndex !== null) {
      const descriptionEl = descriptionRefs.current[hoveredIndex];
      if (descriptionEl) {
        // Get the panel and title elements
        const panel = descriptionEl.closest('.panel');
        const titleGroup = panel?.querySelector('.title-group');
        
        if (panel && titleGroup) {
          // Calculate available space
          const panelHeight = panel.clientHeight;
          const titleHeight = titleGroup.clientHeight;
          const padding = 40; // Account for padding
          
          // Set max height to use available space
          const availableHeight = panelHeight - titleHeight - padding;
          descriptionEl.style.maxHeight = `${availableHeight}px`;
        } else {
          // Fallback if elements aren't found
          descriptionEl.style.maxHeight = '10rem';
        }
        
        descriptionEl.style.opacity = '1';
        descriptionEl.style.overflow = 'auto';
        
        // Wait for the animation to complete
        const timer = setTimeout(() => {
          // Check if content actually overflows
          const isOverflowing = descriptionEl.scrollHeight > descriptionEl.clientHeight;
          
          // Only add class if content overflows
          if (isOverflowing) {
            descriptionEl.classList.add('description-visible');
            // Force a repaint to ensure the scrollbar appears
            descriptionEl.style.display = 'none';
            void descriptionEl.offsetHeight; // Force reflow
            descriptionEl.style.display = 'block';
          } else {
            descriptionEl.classList.remove('description-visible');
          }
        }, 400); // Match the CSS animation duration
        
        return () => {
          clearTimeout(timer);
          if (descriptionEl) {
            descriptionEl.classList.remove('description-visible');
            descriptionEl.style.maxHeight = '';
            descriptionEl.style.opacity = '';
            descriptionEl.style.overflow = '';
          }
        };
      }
    }
  }, [hoveredIndex]);

  const DesktopView = () => (
    <div className="overflow-hidden p-4">
      <div className="flex gap-4 h-80">
        {conferences.map((conference, index) => {
          const baseWidth = `${100 / conferences.length}%`;

          return (
            <div
              key={conference.year}
              style={{
                width: baseWidth,
                transition: "transform var(--duration) var(--easing)",
              }}
              className={`panel relative cursor-pointer bg-black ${hoveredIndex === index ? 'z-10' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="panel-content">
                <div className="title-container">
                  <div className="title-group">
                    <div className="year-title text-4xl font-bold">
                      {conference.year}
                    </div>
                    <div className="subtitle text-base leading-snug">
                      {conference.title}
                    </div>
                  </div>
                  <div className="description-wrapper">
                    <div 
                      className="description text-sm text-gray-300 leading-relaxed"
                      ref={el => descriptionRefs.current[index] = el}
                    >
                      {conference.description}
                    </div>
                  </div>
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
