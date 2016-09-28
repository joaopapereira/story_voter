import { Route } from '@angular/router';
import { VotingSessionComponent } from './index';

export const VotingSessionsRoutes: Route[] = [
  {
    path: 'projects/:project_id/voting_session/:session_id',
    component: VotingSessionComponent
  },
  {
    path: 'projects/:project_id/voting_session/:session_id/add',
    component: VotingSessionComponent
  }
];
