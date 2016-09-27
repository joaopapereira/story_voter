import { Route } from '@angular/router';
import { ProjectComponent, AddProjectComponent } from './index';
import {Authentication} from '../shared/index'

export const ProjectRoutes: Route[] = [
  {
    path: 'projects',
    component: ProjectComponent
  },
  {
    path: 'projects/add',
    component: AddProjectComponent,
    canActivate:[Authentication]


  }
];
