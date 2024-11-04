import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function History() {
  const timelineEvents = [
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
      title: "Critical Computing -- between sense and sensibility",
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
      description: "Focus on that today, 'crisis' characterize developments in climate, economic inequality, democracy, relations among societies and, more broadly, quality of life. And at the same time computing seems almost omnipresence. For good and for bad."
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const TimelineEvent = ({ event, index }: { event: typeof timelineEvents[0], index: number }) => {
    const isHovered = hoveredIndex === index;
    
    return (
      <div 
        className="w-1/6 relative cursor-pointer"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className={`
          text-center 
          transition-[height] duration-700 ease-in-out
          ${isHovered ? 'h-80' : 'h-40'}
        `}>
          <div className="text-6xl font-roboto-condensed leading-none py-4">
            {event.year}
          </div>
          <div className="text-sm font-roboto-condensed mb-4">
            {event.title}
          </div>
          <div className={`
            text-sm font-roboto-condensed px-2
            transition-opacity duration-300 ease-in-out
            delay-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            {event.description}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Desktop Timeline */}
        <div className="hidden lg:flex justify-between">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.year} event={event} index={index} />
          ))}
        </div>
        
        {/* Mobile Touch Slider */}
        <div className="lg:hidden relative">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length)}
              className="absolute left-0 z-10 p-2 text-white"
              aria-label="Previous slide"
            >
              ←
            </button>
            
            <div className="w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {timelineEvents.map((event) => (
                  <div key={event.year} className="w-full flex-shrink-0 px-4">
                    <div className="mb-10">
                      <div className="text-4xl font-roboto-condensed mb-2">
                        {event.year}
                      </div>
                      <div className="text-xl font-roboto-condensed mb-4">
                        {event.title}
                      </div>
                      <div className="text-sm opacity-80">
                        {event.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % timelineEvents.length)}
              className="absolute right-0 z-10 p-2 text-white"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
