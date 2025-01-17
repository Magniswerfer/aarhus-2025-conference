import { papersCommittee } from "../../data/commiteeData.ts";

const PapersCommittee = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 text-aarhus-red">
        Papers Committee
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6 text-sm">
        {papersCommittee.map((member, index) => (
          <div key={index} className="min-w-0 break-words">
            <p className="font-semibold text-gray-700 mb-1">
              {member.name}
            </p>
            {member.affiliation && (
              <p className="text-gray-600">
                {member.affiliation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PapersCommittee;
