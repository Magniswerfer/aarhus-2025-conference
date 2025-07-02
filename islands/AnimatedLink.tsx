import { useState } from "preact/hooks";

interface AnimatedLinkProps {
  href: string;
  text: string;
}

export default function AnimatedLink({ href, text }: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-aarhus-red hover:underline flex items-center gap-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <svg
        class={`w-4 h-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
} 