import { ComponentChildren } from "preact";

interface ContentItem {
  type: "paragraph" | "list";
  content: ComponentChildren | ComponentChildren[];
}

interface ContentSectionProps {
  title?: string;
  content: (ContentItem | ComponentChildren)[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "right" | "left";
  imageClassName?: string;
}

export default function ContentSection({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  imageClassName = "w-4/5",
}: ContentSectionProps) {
  const renderContent = (item: ContentItem | ComponentChildren) => {
    if (!item || typeof item === "boolean") return null;
    
    if (
      typeof item === "string" || 
      typeof item === "number" ||
      Array.isArray(item)
    ) {
      return (
        <p className="leading-relaxed">
          {item}
        </p>
      );
    }

    if ("type" in item && item.type === "list") {
      return (
        <ul className="list-disc ml-6 space-y-2">
          {Array.isArray(item.content)
            ? item.content.map((listItem, index) => (
              <li key={index} className="leading-relaxed">{listItem}</li>
            ))
            : <li className="leading-relaxed">{item.content}</li>}
        </ul>
      );
    }

    return (
      <p className="leading-relaxed">
        {item}
      </p>
    );
  };

  const TextContent = () => (
    <div className="w-full md:w-1/2">
      {title && (
        <h2 className="text-3xl md:text-4xl font-roboto-condensed font-normal text-aarhus-red mb-6 md:mb-8">
          {title}
        </h2>
      )}
      <div className="font-roboto-condensed space-y-4 md:space-y-6">
        {content.map((item, index) => (
          <div key={index}>
            {renderContent(item)}
          </div>
        ))}
      </div>
    </div>
  );

  const ImageOrPlaceholder = () => (
    <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || ""}
          className={`${imageClassName} max-w-full`}
        />
      )}
    </div>
  );

  return (
    <section className="flex-1 flex py-12 md:py-20">
      <div className="px-4 sm:px-6 lg:px-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="px-0 md:px-8">
            {/* Mobile Layout */}
            <div className="block md:hidden">
              <ImageOrPlaceholder />
              <TextContent />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex gap-8 lg:gap-20">
              {imagePosition === "left" ? (
                <>
                  <ImageOrPlaceholder />
                  <TextContent />
                </>
              ) : (
                <>
                  <TextContent />
                  <ImageOrPlaceholder />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
