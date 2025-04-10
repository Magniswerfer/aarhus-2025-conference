import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { conferences } from "../data/previousConferences.ts";

const ConferenceHistory = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState("mobile");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    const handleResize = () => {
      setViewMode(globalThis.innerWidth >= 1024 ? "desktop" : "mobile");
    };

    handleResize();
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (viewMode !== "desktop" && isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        handleSlideChange("left");
      }, 8000);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [viewMode, isAutoPlaying]);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleSlideChange("left");
    } else if (isRightSwipe) {
      handleSlideChange("right");
    }
  };

  const handleSlideChange = (direction: "left" | "right") => {
    const nextIndex = direction === "left"
      ? (currentSlide + 1) % conferences.length
      : (currentSlide - 1 + conferences.length) % conferences.length;

    setCurrentSlide(nextIndex);
    startAutoPlay();
  };

  const DesktopView = () => (
    <div className="overflow-hidden p-4">
      <div className="flex gap-4 h-80">
        {conferences.map((conference, index) => {
          const isHovered = hoveredIndex === index;
          const baseWidth = `${100 / conferences.length}%`;

          return (
            <div
              key={conference.year}
              className="cursor-pointer bg-black relative"
              style={{
                width: isHovered ? "24rem" : baseWidth,
                transition: "width 0.5s ease-in-out",
              }}
              onMouseOver={() => setHoveredIndex(index)}
              onMouseOut={() => setHoveredIndex(null)}
            >
              {
                /*
                 Wrap your "title" and "extra text" in a single container
                 so there's no second absolute div blocking the hover.
              */
              }
              <div
                className="p-6"
                style={{
                  transform: isHovered ? "translateY(-20px)" : "translateY(0)",
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                {/* Always-visible portion */}
                <div className="text-4xl font-bold mb-3">{conference.year}</div>
                <div className="text-base leading-snug opacity-90">
                  {conference.title}
                </div>

                {/* The "expanded" description that appears on hover */}
                <div
                  className="text-sm text-gray-300 leading-relaxed mt-4"
                  style={{
                    overflow: "hidden",
                    opacity: isHovered ? 1 : 0,
                    maxHeight: isHovered ? "300px" : "0",
                    transition:
                      "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
                    transitionDelay: isHovered ? "0.1s" : "0s",
                  }}
                >
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
    <div
      className="relative px-4 pt-12 pb-6 h-[26rem] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={() => handleSlideChange("right")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg
          width="28"
          height="28"
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
        onClick={() => handleSlideChange("left")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg
          width="28"
          height="28"
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

      <div className="relative h-full px-8">
        <div className="max-w-lg mx-auto w-full">
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-5">
            {conferences[currentSlide].year}
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-medium mb-4 md:mb-5">
            {conferences[currentSlide].title}
          </div>
          <div className="text-base text-gray-300 leading-relaxed">
            {conferences[currentSlide].description}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3">
          {conferences.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentSlide) {
                  const direction = index > currentSlide ? "left" : "right";
                  handleSlideChange(direction);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
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
