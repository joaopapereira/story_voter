import { Route } from '@angular/router';
import { UserStoriesComponent } from './index';

export const ProjectRoutes: Route[] = [
  {
    path: 'projects/:project_id/user_stories',
    component: UserStoriesComponent
  }
];
