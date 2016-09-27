import { Routes } from '@angular/router';

import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { SessionRoutes } from './session/index';
import { ProjectRoutes } from './projects/index'

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...SessionRoutes,
  ...ProjectRoutes
];
