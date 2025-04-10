import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

interface SubmissionDate {
  type: string;
  names: string[];
  dates: {
    deadline: string;
    notification: string;
    cameraReady?: string;
  };
}

interface ConferenceDatesProps {
  displayStyle?: "grid";
  class?: string;
  title?: string;
}

export default function ConferenceDates({
  displayStyle = "grid",
  class: className = "",
  title = "Important Dates",
}: ConferenceDatesProps) {
  const [submissions, setSubmissions] = useState<SubmissionDate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch("/api/submission-dates");
        if (!response.ok) {
          throw new Error("Failed to fetch submission dates");
        }
        const data = await response.json();
        setSubmissions(data.submissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dates");
        console.error("Error fetching submission dates:", err);
      }
    };

    fetchDates();
  }, []);

  if (error) {
    return (
      <section class={className}>
        <h2 class="text-3xl font-bold text-aarhus-red mb-4">{title}</h2>
        <div class="text-red-500">Error: {error}</div>
      </section>
    );
  }

  if (submissions.length === 0) {
    return (
      <section class={className}>
        <h2 class="text-3xl font-bold text-aarhus-red mb-4">{title}</h2>
        <div>Loading dates...</div>
      </section>
    );
  }

  const sortedSubmissions = [...submissions]
    .sort((a, b) =>
      new Date(a.dates.deadline).getTime() -
      new Date(b.dates.deadline).getTime()
    );

  return (
    <section class={className}>
      <h2 class="text-3xl font-bold text-aarhus-red mb-4">{title}</h2>
      <div class="space-y-8">
        <p class="font-bold mb-8">
          All dates are AoE, Anytime on Earth
        </p>
        {sortedSubmissions.map((item) => (
          <div key={item.type} class="space-y-4">
            <h3 class="text-2xl font-bold text-aarhus-red">
              {item.names.join(", ")}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="font-bold text-lg mb-1">{item.dates.deadline}</div>
                <div class="text-gray-600">Deadline</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="font-bold text-lg mb-1">
                  {item.dates.notification}
                </div>
                <div class="text-gray-600">Notification</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
