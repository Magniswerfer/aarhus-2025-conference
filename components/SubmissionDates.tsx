interface SubmissionDates {
  deadline: string;
  notification: string;
  cameraReady?: string;
}

interface SubmissionDatesProps {
  dates: SubmissionDates;
  className?: string;
  title?: string;
}

const SubmissionDates = ({
  dates,
  className = "",
  title = "Important Dates"
}: SubmissionDatesProps) => {
  if (!dates) {
    return null;
  }

  return (
    <section className={className}>
      <h2 className="text-3xl font-bold text-aarhus-red mb-8">{title}</h2>
      <p class="font-bold mb-8">
        All dates are AoE, Anytime on Earth
      </p>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-bold text-lg mb-1">{dates.deadline}</div>
            <div className="text-gray-600">Deadline</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="font-bold text-lg mb-1">{dates.notification}</div>
            <div className="text-gray-600">Notification</div>
          </div>
          {dates.cameraReady && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-lg mb-1">{dates.cameraReady}</div>
              <div className="text-gray-600">Camera Ready</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubmissionDates;