import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserStoriesComponent } from './user_stories.component';
import { ProjectsService } from '../shared/projects/index';
import { UserStoriesService } from './user_stories.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [UserStoriesComponent],
  exports: [UserStoriesComponent],
  providers: [ProjectsService, UserStoriesService]
})
export class UserStoriesModule { }
