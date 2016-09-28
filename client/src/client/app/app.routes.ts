import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { SessionRoutes } from './session/index';
import { ProjectRoutes } from './projects/index';
import { UserStoriesRoutes } from './user_stories/index';
import { VotingSessionsRoutes } from './voting_sessions/index';

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...SessionRoutes,
  ...ProjectRoutes,
  ...UserStoriesRoutes,
  ...VotingSessionsRoutes
];
