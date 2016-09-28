import { Route } from '@angular/router';
import { ProjectComponent, ProjectsComponent, AddProjectComponent } from './index';
import {Authentication} from '../shared/index'

export const ProjectRoutes: Route[] = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/add',
    component: AddProjectComponent,
    canActivate:[Authentication]
  },
  {
    path: 'projects/:project_id',
    component: ProjectComponent
  }
];
