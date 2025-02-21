import { useEffect, useState } from "preact/hooks";

interface SubmissionDates {
  type: string;
  names: string[];
  dates: {
    deadline: string;
    notification: string;
    cameraReady?: string;
  };
}

// Function to group submission types by the same deadline
function groupByDeadline(submissions: SubmissionDates[]) {
  const grouped: Record<string, SubmissionDates[]> = {};

  submissions.forEach((submission) => {
    const { deadline } = submission.dates;
    if (!grouped[deadline]) {
      grouped[deadline] = [];
    }
    grouped[deadline].push(submission);
  });

  return grouped;
}

export default function ImportantDates() {
  const [submissionTypes, setSubmissionTypes] = useState<SubmissionDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissionDates() {
      try {
        const response = await fetch("/api/submission-dates");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setSubmissionTypes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching submission dates:", err);
        setError("Failed to fetch submission dates.");
        setLoading(false);
      }
    }

    fetchSubmissionDates();
  }, []);

  if (loading) {
    return <p class="text-gray-300">Loading important dates...</p>;
  }

  if (error) {
    return <p class="text-red-400">{error}</p>;
  }

  const groupedSubmissions = groupByDeadline(submissionTypes);

  return (
    <div class="mb-8 md:mb-0 md:col-span-2">
      <h3 class="font-roboto-condensed font-bold text-lg mb-4">IMPORTANT DATES</h3>
      <p class="font-bold mb-4">All dates are AoE, Anytime on Earth</p>
      <div class="space-y-6">
        {Object.entries(groupedSubmissions).map(([deadline, submissions]) => (
          <div key={deadline} class="space-y-2">
            <h4 class="font-roboto-condensed font-bold text-white/80">
              {submissions.map((s) => s.names.join(", ")).join(", ")}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="text-sm">
                <span class="font-bold">{deadline}</span>
                <br />
                <span class="text-gray-200">Deadline</span>
              </div>
              <div class="text-sm">
                <span class="font-bold">{submissions[0].dates.notification}</span>
                <br />
                <span class="text-gray-200">Notification</span>
              </div>
              {submissions[0].dates.cameraReady && (
                <div class="text-sm">
                  <span class="font-bold">{submissions[0].dates.cameraReady}</span>
                  <br />
                  <span class="text-gray-200">Camera Ready</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
