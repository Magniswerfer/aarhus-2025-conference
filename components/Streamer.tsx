import { JSX } from "preact";

export default function Streamer(): JSX.Element {
  return (
    <div class="w-full bg-gray-900 py-3">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <a
          href="/programme"
          class="inline-block text-base font-medium text-white hover:text-gray-200 transition-colors underline decoration-1"
        >
          See all accepted papers and critiques
        </a>
      </div>
    </div>
  );
}
