import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Project, ProjectsService } from '../shared/index';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-add-project',
  templateUrl: 'project.component.html'
})

export class AddProjectComponent implements OnInit, OnDestroy {

  newProjects: Project[] = [];
  closeResult: string;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public projectsService: ProjectsService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    //this.loadProjects();
  }

  ngOnDestroy() {
  }


  loadProjects(){
    // Get all comments
     this.projectsService.all()
                       .subscribe(
                           newProjects => this.newProjects = newProjects, //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
                            });
    }
  }
