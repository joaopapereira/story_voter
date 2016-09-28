import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../shared/index';
import { UserStoriesService, UserStories, UserStory } from './user_stories.service'

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-user-stories',
  templateUrl: 'user_stories.component.html'
})

export class UserStoriesComponent implements OnInit {
  projectId: number;
  project: Project;
  stories: UserStory[];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public route: ActivatedRoute, public userStories: UserStoriesService) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.projectId = +params['project_id'];
    });
    this.loadStories();
  }

  loadStories() {
    var $this = this;
    this.userStories.getUserStories(this.projectId)
        .subscribe(
            (userStoryObject:UserStories) => {
              $this.project = userStoryObject.project;
              $this.stories = userStoryObject.stories;
            }, //Bind to view
             err => {
                 // Log errors if any
                 console.log(err);
             });
  }
}
