// data/conferenceDates.ts
export const CONFERENCE_START_DATE = "18th August 2025";
export const CONFERENCE_END_DATE = "22nd August 2025";
export const CONFERENCE_LOCATION = "Aarhus, Denmark";

export interface ConferenceDate {
  date: string;
  description: string;
  type: string;
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
    description: "Papers, Critiques",
    type: "deadline"
  },
  {
    date: "6th March 2025",
    description: "Workshops",
    type: "deadline"
  },
  {
    date: "3rd April 2025",
    description: "Notification of acceptance: Workshops",
    type: "notification"
  },
  {
    date: "29th April 2025",
    description: "Notification of acceptance: Papers and Critiques",
    type: "notification"
  },
  {
    date: "6th May 2025",
    description: "Doctoral Consortium, Demos and Work in Progress",
    type: "deadline"
  },
  {
    date: "12th June 2025",
    description: "Notification of acceptance: Work in Progress",
    type: "notification"
  },
  {
    date: "TBA",
    description: "Camera-ready deadlines will follow",
    type: "deadline"
  },
  {
    date: `${CONFERENCE_START_DATE} - ${CONFERENCE_END_DATE}`,
    description: "Workshops and Conference",
    type: "conference-dates"
  },
];
