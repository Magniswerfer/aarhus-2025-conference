import { submissionTypes } from "../data/conferenceDates.ts";

interface SubmissionDatesProps {
  submissionType: string;
  className?: string;
  title?: string;
}

const SubmissionDates = ({
  submissionType,
  className = "",
  title = "Important Dates"
}: SubmissionDatesProps) => {
  const submission = submissionTypes.find(s => s.name === submissionType);

  if (!submission) {
    return null;
  }

  return (
    <section className={className}>
      <h2 className="text-3xl font-bold text-aarhus-red mb-8">{title}</h2>
      <p class="font-bold mb-8">
        All dates are AoE, Anytime on Earth
      </p>
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-aarhus-red">
            {submission.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-lg mb-1">{submission.dates.deadline}</div>
              <div className="text-gray-600">Deadline</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-lg mb-1">{submission.dates.notification}</div>
              <div className="text-gray-600">Notification</div>
            </div>
            {submission.dates.cameraReady && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-bold text-lg mb-1">{submission.dates.cameraReady}</div>
                <div className="text-gray-600">Camera Ready</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionDates;
