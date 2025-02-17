const contributionTypes = [
  {
    href: "/call-for-contributions/papers",
    title: "Papers",
    description:
      "Full research papers addressing fundamental issues and proposing new agendas with potential for long-lasting impact.",
  },
  {
    href: "/call-for-contributions/critiques",
    title: "Critiques",
    description:
      "Critical and insightful perspectives challenging the status quo of computing, including essays, creative writing, and artwork.",
  },
  {
    href: "/call-for-contributions/workshops",
    title: "Workshops",
    description:
      "Interactive sessions for debate and co-development of ideas related to Computing (X) Crisis.",
  },
  {
    href: "/call-for-contributions/work-in-progress",
    title: "Work-in-Progress",
    description:
      "Presentations of emerging ideas and tentative findings that engage with the conference theme.",
  },
  {
    href: "/call-for-contributions/demos",
    title: "Demos and Experiences",
    description:
      "Demonstrations of, e.g., novel interactions techniques, activitism, etc.",
  },
  {
    href: "/call-for-contributions/doctoral-consortium",
    title: "Doctoral Consortium",
    description:
      "Unique opportunities to engage in exchanges about doctoral research relevant to the conference.",
  },
];

const ContributionTypesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contributionTypes.map((type) => (
        <a
          key={type.href}
          href={type.href}
          className="block group h-full"
        >
          <div className="bg-gray-50 p-6 rounded-lg transition-all duration-200 hover:bg-gray-100 h-full">
            <h3 className="font-bold text-xl mb-2 text-aarhus-red group-hover:text-aarhus-red/80">
              {type.title}
            </h3>
            <p className="text-gray-600">
              {type.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ContributionTypesGrid;
