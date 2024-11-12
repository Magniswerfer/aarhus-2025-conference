
import { papersCommittee } from "../../data/papersCommittee.ts";

const formatName = (name: string) => {
  // Convert "LastName, FirstName" to "FirstName LastName"
  const [lastName, firstName] = name.split(", ");
  if (!firstName) return name; // If no comma, return as is
  return `${firstName} ${lastName}`.replace(" PhD FACS", ""); // Remove titles
};

const PapersCommittee = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-aarhus-red mb-6">Papers Committee</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
        {papersCommittee.map((member, index) => (
          <div key={index} className="min-w-0">
            <p className="font-medium text-gray-900">
              {formatName(member.name)}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PapersCommittee;
