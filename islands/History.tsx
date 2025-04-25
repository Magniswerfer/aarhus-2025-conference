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
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Simple scroll tracking for mobile
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || viewMode === "desktop") return;
    
    const handleScroll = () => {
      const slideWidth = carousel.clientWidth;
      const scrollPosition = carousel.scrollLeft;
      
      // Calculate which slide is most visible
      const slideIndex = Math.round(scrollPosition / slideWidth);
      if (slideIndex !== currentSlide && slideIndex < conferences.length) {
        setCurrentSlide(slideIndex);
      }
    };
    
    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [viewMode, currentSlide, conferences.length]);

  // Simple autoplay
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        if (viewMode === "desktop") {
          // Desktop mode - use state to change slides
          setCurrentSlide((prev) => (prev + 1) % conferences.length);
        } else {
          // Mobile mode - programmatically scroll the carousel
          const carousel = carouselRef.current;
          if (carousel) {
            const nextSlide = (currentSlide + 1) % conferences.length;
            carousel.scrollTo({
              left: nextSlide * carousel.clientWidth,
              behavior: 'smooth'
            });
          }
        }
      }, 3000);
    }
    
    return () => intervalId && clearInterval(intervalId);
  }, [viewMode, isAutoPlaying, currentSlide, conferences.length]);

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
    <div className="relative w-full overflow-hidden">
      {/* Prev/Next buttons - hidden on small screens, visible on sm+ */}
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            (prev - 1 + conferences.length) % conferences.length
          )}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hidden sm:flex items-center justify-center p-3 rounded-full hover:bg-white/10 transition-colors"
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
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % conferences.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hidden sm:flex items-center justify-center p-3 rounded-full hover:bg-white/10 transition-colors"
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

      {/* Play/Pause button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 z-10 p-3 text-white rounded-full hover:bg-white/10 transition-colors"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      {/* Mobile carousel with white scrollbar */}
      <div 
        ref={carouselRef}
        className="sm:hidden w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pb-10 white-scrollbar"
        style={{
          scrollbarColor: "white rgba(255,255,255,0.1)",
          scrollbarWidth: "thin"
        }}
      >
        <div className="flex">
          {conferences.map((conference, index) => (
            <div 
              key={index}
              className="snap-center min-w-full transition-transform duration-300 ease-out"
            >
              <div className="w-full h-[20rem] sm:h-[22rem] min-h-[350px] flex flex-col justify-start px-6 py-10">
                <div className="space-y-5">
                  <div className="text-3xl font-bold">
                    {conference.year}
                  </div>
                  <div className="text-lg font-medium leading-snug">
                    {conference.title}
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed mt-4">
                    {conference.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Larger screens - controlled slide view */}
      <div className="hidden sm:block px-8 py-8 h-[20rem] md:h-[22rem]">
        <div className="flex flex-col justify-start h-full transition-transform duration-300 ease-out">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="text-4xl md:text-5xl font-bold">
              {conferences[currentSlide].year}
            </div>
            <div className="text-xl md:text-2xl font-medium leading-snug">
              {conferences[currentSlide].title}
            </div>
            <div className="text-base md:text-lg text-gray-300 leading-relaxed">
              {conferences[currentSlide].description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white w-full">
      <style>{`
        /* White scrollbar styles */
        .white-scrollbar::-webkit-scrollbar {
          height: 4px;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .white-scrollbar::-webkit-scrollbar-thumb {
          background-color: white;
          border-radius: 4px;
        }
        
        .white-scrollbar::-webkit-scrollbar-track {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
      `}</style>
      <div className="max-w-[110rem] mx-auto">
        {viewMode === "desktop" ? <DesktopView /> : <MobileView />}
      </div>
    </div>
  );
};

export default ConferenceHistory;
