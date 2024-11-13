import { conferenceDates } from "../data/conferenceDates.ts";

interface ConferenceDatesProps {
  displayStyle?: "grid";
  class?: string;
  title?: string;
}

export default function ConferenceDates({ displayStyle = "grid", class: className = "", title = "Important Dates" }: ConferenceDatesProps) {
  // Filter and sort dates by type
  const relevantDates = conferenceDates.filter(
    date => date.type === "deadline" || date.type === "notification"
  );

  const deadlines = relevantDates
    .filter(date => date.type === "deadline")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const notifications = relevantDates
    .filter(date => date.type === "notification")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const DateColumn = ({ dates, title }) => (
    <div class="space-y-4">
      <h3 class="text-2xl font-bold text-aarhus-red mb-4">{title}</h3>
      <div class="space-y-6">
        {dates.map((item) => (
          <div class="bg-gray-50 p-4 rounded-lg" key={item.date + item.description}>
            <div class="font-bold text-lg mb-1">{item.date}</div>
            <div class="text-gray-600">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section class={className}>
      <h2 class="text-3xl font-bold text-aarhus-red mb-8">{title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DateColumn dates={deadlines} title="Deadlines" />
        <DateColumn dates={notifications} title="Notifications" />
      </div>
    </section>
  );
}
