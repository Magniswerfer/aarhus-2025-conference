import { papersCommittee } from "../../data/papersCommittee.ts";

const PapersCommittee = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Papers Committee</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-4 text-sm">
        {papersCommittee.map((member, index) => (
          <div key={index} className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{member.name}</p>
            {member.affiliation && (
              <p className="text-gray-500 truncate">{member.affiliation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PapersCommittee;
