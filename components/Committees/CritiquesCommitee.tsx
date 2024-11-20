import { critiquesCommittee } from "../../data/commiteeData.ts";
import type CritiquesPage from "../../routes/call-for-contributions/critiques.tsx";

const CritiquesCommittee = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 text-aarhus-red">
        Critiques Committee
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6 text-sm">
        {critiquesCommittee.map((member, index) => (
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

export default CritiquesCommittee;
