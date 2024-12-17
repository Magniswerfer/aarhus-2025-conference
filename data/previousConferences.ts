export interface Conference {
  year: string;
  title: string;
  description: string;
}

export const conferences: Conference[] = [
  {
    year: "1975",
    title: "Arbejdsformer i systemudvikling",
    description:
      "The, primarily Nordic, conference in 1975 was a milestone in defining the development of computer-based, socio-technical systems as an area where the end-users should have a major say.",
  },
  {
    year: "1985",
    title: "Computers and Democracy",
    description:
      'Focus on practical collaboration with workers and theoretical contributions on topics like object orientation and software as a process. This conference was truly international, and resulted in the 1987 collection "Computers and Democracy" from selected papers.',
  },
  {
    year: "1995",
    title: "Computers in Context joining forces in design",
    description:
      "Focusing on the variety of disciplines involved with the design of computer artifacts as critical action. Over the years the involvement of end-users has become standard procedure in many organizations, today end-user involvement is not always critical action per se.",
  },
  {
    year: "2005",
    title: "Critical Computing – between sense and sensibility",
    description:
      "Focus on revitalize the idea of IT-research as critical action, not only as workplace actionism, but also by integrating a broader scope of critical analysis and critical practice.",
  },
  {
    year: "2015",
    title: "Critical Alternatives",
    description:
      "Focus on critical alternatives in alignment with utopian principles—that is, the hope that things might not only be different but also radically better. Critical alternatives matter and make people reflect.",
  },
  {
    year: "2025",
    title: "Computing [X] Crisis",
    description:
      "Focus on that today, 'crisis' characterize developments in climate, economic inequality, democracy, relations among societies and, more broadly, quality of life. And at the same, time computing seems almost omnipresence. For good and for bad.",
  },
];
