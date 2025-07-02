import { JSX } from "preact";

export default function Streamer(): JSX.Element {
  return (
    <div class="w-full bg-gray-900 py-3">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <a 
          href="/registration" 
          class="inline-block text-base font-medium text-white hover:text-gray-200 transition-colors underline decoration-1"
        >
          Sign up for the Aarhus 2025 conference before the early bird deadline (June 27th 2025)
        </a>
      </div>
    </div>
  );
} 