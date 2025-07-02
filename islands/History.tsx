import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { conferences } from "../data/previousConferences.ts";

// Import the CSS (will need to be handled by the bundler)
// This is a comment to show that we're aware CSS needs to be imported

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState("mobile");
  const descriptionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleResize = () => {
      setViewMode(globalThis.innerWidth >= 1024 ? "desktop" : "mobile");
    };

    handleResize();
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  // Handle showing scrollbar only when needed
  useEffect(() => {
    if (hoveredIndex !== null) {
      const descriptionEl = descriptionRefs.current[hoveredIndex];
      if (descriptionEl) {
        // Get the panel and title elements
        const panel = descriptionEl.closest(".panel");
        const titleGroup = panel?.querySelector(".title-group");

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
          descriptionEl.style.maxHeight = "10rem";
        }

        descriptionEl.style.opacity = "1";
        descriptionEl.style.overflow = "auto";

        // Wait for the animation to complete
        const timer = setTimeout(() => {
          // Check if content actually overflows
          const isOverflowing =
            descriptionEl.scrollHeight > descriptionEl.clientHeight;

          // Only add class if content overflows
          if (isOverflowing) {
            descriptionEl.classList.add("description-visible");
            // Force a repaint to ensure the scrollbar appears
            descriptionEl.style.display = "none";
            void descriptionEl.offsetHeight; // Force reflow
            descriptionEl.style.display = "block";
          } else {
            descriptionEl.classList.remove("description-visible");
          }
        }, 400); // Match the CSS animation duration

        return () => {
          clearTimeout(timer);
          if (descriptionEl) {
            descriptionEl.classList.remove("description-visible");
            descriptionEl.style.maxHeight = "";
            descriptionEl.style.opacity = "";
            descriptionEl.style.overflow = "";
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
              className={`panel relative cursor-pointer bg-black ${
                hoveredIndex === index ? "z-10" : ""
              }`}
              style={{
                width: baseWidth,
                transition: "transform var(--duration) var(--easing)",
              }}
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
                      ref={(el) => descriptionRefs.current[index] = el}
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
    <div className="relative w-full overflow-hidden">
      {/* Mobile carousel with horizontal scrolling - pure CSS snap */}
      <div
        className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "white rgba(255,255,255,0.1)",
        }}
      >
        <style jsx>
          {`
          /* Make scrollbar always visible with gradient steps */
          div {
            -ms-overflow-style: none; /* Hide default scrollbar in IE/Edge */
            scrollbar-width: none; /* Hide default scrollbar in Firefox */
          }
          
          div::-webkit-scrollbar {
            height: 8px;
            background-color: rgba(255,255,255,0.1);
            border-radius: 4px;
            display: block;
          }
          
          div::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 4px;
            background: linear-gradient(
              to right,
              rgba(100,100,100,0.5) 0%,
              rgba(150,150,150,0.7) 15%,
              rgba(255,255,255,1) 50%,
              rgba(150,150,150,0.7) 85%,
              rgba(100,100,100,0.5) 100%
            );
            background-size: ${conferences.length * 100}% 100%;
            background-position: var(--scroll-pos, 0) 0;
          }
          
          /* Make the scrollbar track stylized with "steps" */
          div::-webkit-scrollbar-track {
            background-image: repeating-linear-gradient(
              to right,
              transparent,
              transparent calc((100% / ${conferences.length}) - 2px),
              rgba(255,255,255,0.2) calc((100% / ${conferences.length}) - 1px),
              rgba(255,255,255,0.2) calc(100% / ${conferences.length})
            );
            border-radius: 4px;
          }
        `}
        </style>

        <div className="flex">
          {conferences.map((conference, index) => (
            <div
              key={index}
              className="snap-center min-w-full transition-transform duration-300 ease-out"
            >
              <div className="w-full h-[22rem] min-h-[350px] flex flex-col justify-center px-6 py-8">
                <div className="space-y-5">
                  <div className="text-3xl sm:text-4xl font-bold">
                    {conference.year}
                  </div>
                  <div className="text-lg sm:text-xl font-medium">
                    {conference.title}
                  </div>
                  <div className="text-base text-gray-300 leading-relaxed mt-4">
                    {conference.description}
                  </div>
                </div>
              </div>
            </div>
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
