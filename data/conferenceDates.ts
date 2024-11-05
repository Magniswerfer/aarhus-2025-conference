// data/conferenceDates.ts
export const CONFERENCE_START_DATE = "18th August 2025";
export const CONFERENCE_END_DATE = "22nd August 2025";
export const CONFERENCE_LOCATION = "Aarhus, Denmark";

export interface ConferenceDate {
  date: string;
  description: string;
}

export interface QuickLink {
  title: string;
  href: string;
}

export const quickLinks: QuickLink[] = [
  {
    title: "Call for Contributions",
    href: "/call-for-contributions",
  },
  {
    title: "Author Guidelines",
    href: "/author-guidelines",
  },
  {
    title: "Organizers",
    href: "/organizers",
  },
];

export const conferenceDates: ConferenceDate[] = [
  {
    date: "20th February 2025",
    description: "Deadline Papers, Critiques",
  },
  {
    date: "6th March 2025",
    description: "Deadline, Workshops",
  },
  {
    date: "3rd April 2025",
    description: "Notification of acceptance, Workshops",
  },
  {
    date: "29th April 2025",
    description: "Notification of acceptance, Papers and Critiques",
  },
  {
    date: "6th May 2025",
    description: "Deadline, Work in Progress",
  },
  {
    date: "12th June 2025",
    description: "Notification of acceptance: Work in Progress",
  },
  {
    date: "TBA",
    description: "Camera-ready deadlines will follow",
  },
  {
    date: `${CONFERENCE_START_DATE} - ${CONFERENCE_END_DATE}`,
    description: "Workshops and Conference",
  },
];
