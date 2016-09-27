import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './project.component';
import { AddProjectComponent, KeysPipe } from './add_project.component';
import { ProjectsService } from '../shared/projects/index';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProjectComponent, AddProjectComponent, KeysPipe],
  exports: [ProjectComponent],
  providers: [ProjectsService]
})
export class ProjectModule { }
