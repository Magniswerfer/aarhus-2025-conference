// components/ConferenceDates.tsx
import { conferenceDates, type ConferenceDate } from "../data/conferenceDates.ts";

interface ConferenceDatesProps {
  dates?: ConferenceDate[];
  class?: string;
  displayStyle?: "grid" | "list";
  title?: string;
}

export default function ConferenceDates({ 
  dates,
  class: className = "",
  displayStyle = "grid",
  title = "Important Dates"
}: ConferenceDatesProps) {
  const datesList = dates || conferenceDates;

  if (displayStyle === "grid") {
    return (
      <section class={className}>
        <h2 class="text-3xl font-bold text-aarhus-red mb-6">{title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {datesList.map((item, index) => (
            <div key={index} class="bg-gray-50 p-4 rounded">
              <h3 class="font-semibold mb-2">{item.date}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section class={className}>
      <h2 class="text-3xl font-bold text-aarhus-red mb-6">{title}</h2>
      <div class="space-y-4">
        {datesList.map((item, index) => (
          <div key={index} class="flex items-baseline gap-4">
            <div class="font-semibold w-48 flex-shrink-0">{item.date}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
