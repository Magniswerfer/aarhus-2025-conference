import { useEffect, useState } from "preact/hooks";

interface SubmissionDates {
  type: string;
  names: string[];
  dates: {
    deadline: string;
    notification: string;
    cameraReady?: string;
    customDates?: Array<{
      date: string;
      label: string;
    }>;
  };
}

interface ApiResponse {
  submissions: SubmissionDates[];
  conferenceDates: {
    startDate: string;
    endDate: string;
    location: string;
  } | null;
}

// Function to group submissions by their dates
function groupByDates(submissions: SubmissionDates[]) {
  if (!Array.isArray(submissions)) {
    console.error("Expected submissions to be an array, got:", submissions);
    return {};
  }

  const grouped: Record<string, SubmissionDates[]> = {};

  submissions.forEach((submission) => {
    const key =
      `${submission.dates.deadline}-${submission.dates.notification}-${
        submission.dates.cameraReady || ""
      }`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(submission);
  });

  return grouped;
}

// Function to parse our custom date format (e.g., "6th May 2025")
function parseCustomDate(dateStr: string): number {
  if (dateStr === "TBA") return Infinity;
  const [day, month, year] = dateStr.split(" ");
  const dayNum = parseInt(day.replace(/\D/g, ""));
  const monthNum = new Date(`${month} 1, 2000`).getMonth();
  return new Date(parseInt(year), monthNum, dayNum).getTime();
}

// Function to convert type to URL slug
function typeToSlug(type: string): string {
  return type.toLowerCase().replace(/\s+/g, "-");
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

        const data: ApiResponse = await response.json();
        console.log("Received data from API:", data);

        if (!data.submissions || !Array.isArray(data.submissions)) {
          throw new Error("Expected submissions to be an array");
        }

        setSubmissionTypes(data.submissions);
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

  if (!submissionTypes.length) {
    return <p class="text-gray-300">No submission dates available</p>;
  }

  const groupedSubmissions = groupByDates(submissionTypes);

  // Convert the grouped object into an array and sort by deadline date (earliest first)
  const sortedGroupedSubmissions = Object.entries(groupedSubmissions).sort(
    ([, submissionsA], [, submissionsB]) =>
      parseCustomDate(submissionsA[0].dates.deadline) -
      parseCustomDate(submissionsB[0].dates.deadline),
  );

  return (
    <div class="mb-8 md:mb-0 md:col-span-2">
      <h3 class="font-roboto-condensed font-bold text-lg mb-2">
        IMPORTANT DATES
      </h3>
      <p class="text-sm text-gray-300 mb-3">
        All dates are AoE, Anytime on Earth
      </p>
      <div class="space-y-4">
        {sortedGroupedSubmissions.map(([, submissions]) => {
          const submission = submissions[0];
          return (
            <div key={submission.dates.deadline} class="space-y-2">
              <div class="flex flex-wrap gap-2">
                {submissions.map((s) => (
                  <a
                    key={s.type}
                    href={`/call-for-contributions/${typeToSlug(s.type)}`}
                    class="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-sm transition-colors"
                  >
                    {s.names.join(", ")}
                  </a>
                ))}
              </div>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span class="font-bold">{submission.dates.deadline}</span>
                  <br />
                  <span class="text-gray-300">Deadline</span>
                </div>
                <div>
                  <span class="font-bold">{submission.dates.notification}</span>
                  <br />
                  <span class="text-gray-300">Notification</span>
                </div>
                {submission.dates.cameraReady && (
                  <div>
                    <span class="font-bold">
                      {submission.dates.cameraReady}
                    </span>
                    <br />
                    <span class="text-gray-300">Camera Ready</span>
                  </div>
                )}
                {submission.dates.customDates?.map((customDate, index) => (
                  <div key={index}>
                    <span class="font-bold">{customDate.date}</span>
                    <br />
                    <span class="text-gray-300">{customDate.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
