import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectsService, SpinnerComponent } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-projects',
  templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit {

  projects: Project[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public projectsService: ProjectsService,
              private router: Router) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(){
    // Get all comments
     this.projectsService.all()
                       .subscribe(
                           projects => this.projects = projects, //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
                            });
    }
    newProject() {
      this.router.navigate(["/projects/add"]);
    }
  }
