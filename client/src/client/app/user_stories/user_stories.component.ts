import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-projects',
  templateUrl: 'project.component.html'
})

export class UserStoriesComponent implements OnInit {

  @Input() project: Project;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public route: ActivatedRoute) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.loadProjects();
    
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
        .then(hero => this.hero = hero);
    });
  }

  loadProjects(){
  
    }
  }
