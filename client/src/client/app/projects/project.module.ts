import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project.component';
import { AddProjectComponent, KeysPipe } from './add_project.component';
import { ProjectsService } from '../shared/projects/index';
import { UserStoriesModule } from '../user_stories/user_stories.module'
import { VotingSessionsModule } from '../voting_sessions/voting_sessions.module'

@NgModule({
  imports: [CommonModule, SharedModule, UserStoriesModule, VotingSessionsModule],
  declarations: [ProjectsComponent, AddProjectComponent, KeysPipe, ProjectComponent],
  exports: [ProjectsComponent, ProjectComponent],
  providers: [ProjectsService]
})
export class ProjectModule { }
