import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { AddProjectComponent } from './add_project.component';
import { ProjectsService } from '../shared/projects/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProjectComponent, AddProjectComponent],
  exports: [ProjectComponent],
  providers: [ProjectsService]
})
export class ProjectModule { }
