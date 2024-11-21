// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $author_guidelines from "./routes/author-guidelines.tsx";
import * as $call_for_contributions from "./routes/call-for-contributions.tsx";
import * as $call_for_contributions_critiques from "./routes/call-for-contributions/critiques.tsx";
import * as $call_for_contributions_demos from "./routes/call-for-contributions/demos.tsx";
import * as $call_for_contributions_doctoral_consortium from "./routes/call-for-contributions/doctoral-consortium.tsx";
import * as $call_for_contributions_papers from "./routes/call-for-contributions/papers.tsx";
import * as $call_for_contributions_work_in_progress from "./routes/call-for-contributions/work-in-progress.tsx";
import * as $call_for_contributions_workshops from "./routes/call-for-contributions/workshops.tsx";
import * as $index from "./routes/index.tsx";
import * as $organisers from "./routes/organisers.tsx";
import * as $History from "./islands/History.tsx";
import * as $Navigation from "./islands/Navigation.tsx";
import * as $XBreaker from "./islands/XBreaker.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/author-guidelines.tsx": $author_guidelines,
    "./routes/call-for-contributions.tsx": $call_for_contributions,
    "./routes/call-for-contributions/critiques.tsx":
      $call_for_contributions_critiques,
    "./routes/call-for-contributions/demos.tsx": $call_for_contributions_demos,
    "./routes/call-for-contributions/doctoral-consortium.tsx":
      $call_for_contributions_doctoral_consortium,
    "./routes/call-for-contributions/papers.tsx":
      $call_for_contributions_papers,
    "./routes/call-for-contributions/work-in-progress.tsx":
      $call_for_contributions_work_in_progress,
    "./routes/call-for-contributions/workshops.tsx":
      $call_for_contributions_workshops,
    "./routes/index.tsx": $index,
    "./routes/organisers.tsx": $organisers,
  },
  islands: {
    "./islands/History.tsx": $History,
    "./islands/Navigation.tsx": $Navigation,
    "./islands/XBreaker.tsx": $XBreaker,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
