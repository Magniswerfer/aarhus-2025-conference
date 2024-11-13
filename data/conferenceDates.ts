// data/conferenceDates.ts
export const CONFERENCE_START_DATE = "18th August 2025";
export const CONFERENCE_END_DATE = "22nd August 2025";
export const CONFERENCE_LOCATION = "Aarhus, Denmark";

export interface DateInfo {
  deadline: string;
  notification: string;
  cameraReady?: string;
}

export interface SubmissionType {
  name: string;
  dates: DateInfo;
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

// Helper function to group submission types by their dates
export function getCollatedSubmissionTypes(submissions: SubmissionType[]) {
  const groupedByDates = submissions.reduce((acc, submission) => {
    const key = `${submission.dates.deadline}-${submission.dates.notification}-${submission.dates.cameraReady}`;
    if (!acc[key]) {
      acc[key] = {
        names: [],
        dates: submission.dates
      };
    }
    acc[key].names.push(submission.name);
    return acc;
  }, {} as Record<string, { names: string[], dates: DateInfo }>);

  return Object.values(groupedByDates).map(group => ({
    names: group.names,
    dates: group.dates
  }));
}

export const submissionTypes: SubmissionType[] = [
  {
    name: "Papers",
    dates: {
      deadline: "20th February 2025",
      notification: "29th April 2025",
      cameraReady: "TBA"
    }
  },
  {
    name: "Critiques",
    dates: {
      deadline: "20th February 2025",
      notification: "29th April 2025",
      cameraReady: "TBA"
    }
  },
  {
    name: "Workshops",
    dates: {
      deadline: "6th March 2025",
      notification: "3rd April 2025",
      cameraReady: "TBA"
    }
  },
  {
    name: "Work in Progress",
    dates: {
      deadline: "6th May 2025",
      notification: "12th June 2025",
      cameraReady: "TBA"
    }
  },
  {
    name: "Demos",
    dates: {
      deadline: "6th May 2025",
      notification: "12th June 2025",
      cameraReady: "TBA"
    }
  },
  {
    name: "Doctoral Consortium",
    dates: {
      deadline: "6th May 2025",
      notification: "12th June 2025",
      cameraReady: "TBA"
    }
  }
];

export const conferenceDate = {
  start: CONFERENCE_START_DATE,
  end: CONFERENCE_END_DATE,
  location: CONFERENCE_LOCATION,
  description: "Workshops and Conference"
};
