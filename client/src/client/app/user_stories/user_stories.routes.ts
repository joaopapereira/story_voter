import { Route } from '@angular/router';
import { UserStoriesComponent } from './index';

export const UserStoriesRoutes: Route[] = [
  {
    path: 'projects/:project_id/user_stories',
    component: UserStoriesComponent
  }
];
