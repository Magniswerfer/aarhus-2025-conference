interface ContentSectionProps {
  title?: string;
  content: string | string[];
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
  const textContent = Array.isArray(content) ? content : [content];
  
  const TextContent = () => (
    <div className="w-1/2">
      {title && (
        <h2 className="text-4xl font-roboto-condensed font-normal text-aarhus-red mb-8">
          {title}
        </h2>
      )}
      <div className="font-roboto-condensed space-y-6">
        {textContent.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  const ImageOrPlaceholder = () => (
    <div className="w-1/2 flex justify-center items-center">
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={imageAlt || ''} 
          className={imageClassName}
        />
      )}
    </div>
  );

  return (
    <section className="py-20">
      <div className="px-10">
        <div className="max-w-7xl mx-auto">
          <div className="px-32">
            <div className="flex gap-20">
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
