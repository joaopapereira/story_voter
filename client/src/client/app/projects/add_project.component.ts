import { Component, ViewChild, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Project, NewProjects, ProjectsService } from '../shared/index';

import { UserService } from '../shared/user/user.service';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args:string[]) : any {
    if(value === undefined) {
      return [];
    }
    let keys:any[] = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

@Pipe({name: 'projects'})
export class ProjectsPipe implements PipeTransform {
  transform(value:NewProjects, args:any[]) : Project[] {
    if(value === undefined) {
      return [];
    }
    let keys:any[] = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-add-project',
  templateUrl: 'add_project.component.html'
})

export class AddProjectComponent implements OnInit{

  newProjects: NewProjects = new NewProjects();
  closeResult: string;
  project = {repo_name: ""};

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public projectsService: ProjectsService,
              private router: Router,
              private userService: UserService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.loadProjects();
  }

  ngOnDestroy() {
  }


  loadProjects(){
     this.projectsService.newProjects()
                       .subscribe(
                           newProjects => this.newProjects = newProjects, //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
                            });
    }
    gotoProjects() {
      this.router.navigate(['/projects']);
    }
    getOrganizations() {
      return Object.keys(this.newProjects.organizations);
    }
    onSubmit(){
      this.projectsService.createProject(this.project.repo_name)
          .subscribe(value => {
            this.router.navigate(['/']);
          })
    }
  }
