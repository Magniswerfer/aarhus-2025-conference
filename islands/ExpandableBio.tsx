import { useEffect, useRef, useState } from "preact/hooks";

interface ExpandableBioProps {
  text: string;
}

export default function ExpandableBio({ text }: ExpandableBioProps) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Check if the text is actually truncated when component mounts and on window resize
  useEffect(() => {
    const checkTruncation = () => {
      if (!textRef.current) return;

      const element = textRef.current;
      // If not expanded, check if the text is truncated
      if (!expanded) {
        // Compare scroll height to client height to determine if text is truncated
        setIsTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    // Check initially after render
    setTimeout(checkTruncation, 10); // Small timeout to ensure rendering is complete

    // Also check when window resizes
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [expanded, text]);

  return (
    <div>
      <p
        ref={textRef}
        class={`text-gray-800 ${!expanded ? "line-clamp-5" : ""}`}
        style={{ overflow: "hidden" }}
      >
        {text}
      </p>
      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          class="text-aarhus-red text-sm mt-2 hover:underline focus:outline-none"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
