// user.service.ts
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { Project } from './project';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export class NewProjects {
  user: Project[] = [];
  organizations: {[key: string]: Project[];}
}

interface JSONInterface {
  user: any[];
  orgs: any[];
}

@Injectable()
export class ProjectsService {
  projects: Project[];

  constructor(private http: Http, private notifications: NotificationsService) {
    this.projects = [];
  }

  all(): Observable<Project[]> {
    var $this = this;
     return this.http.get("/projects")
                .map((res: Response) => res.json())
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  newProjects(): Observable<NewProjects> {
    var $this = this;
     return this.http.get("/projects/new")
                .map((res: Response) => res.json())
                .map((projects: JSONInterface) => {
                    let result: NewProjects = new NewProjects();
                    projects.user.forEach((project:any) => {
                      result.user.push(new Project(project))
                    })
                    result.organizations = {};
                    Object.keys(projects.orgs).forEach((org: any) => {
                      result.organizations[org] = [];
                      projects.orgs[org].forEach((project: any) => {
                        result.organizations[org].push(new Project(project));
                      })
                    })
                    return result;
                  })

                //...errors if any
                .catch((error:any) => Observable.throw(error || 'Server error'));
  }
  createProject(projectRepo:string): Observable<any> {
    var $this = this;
    return this.http.post("/projects", {repo_name: projectRepo})
                .map((res: Response) => {
                  this.notifications.success("Project created", "Project created successfuly");
                })
                .catch((error: any) => {
                   let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                  console.error(errMsg); // log to console instead
                  this.notifications.error("Error creating project", "Error happened while creating the project")
                  return Observable.throw(error.json().error || 'Server error');
                });
  }
  getProjects() {
    if(this.projects.length == 0) {
      this.all();
    }
    return this.projects;
  }

  getProject(project_id: number): Project {
    if(this.projects.length == 0) {
      this.all();
    }
    var $project:Project = undefined;
    this.projects.forEach((project:Project) => {
      if(project_id == project.id){
        $project = project;
      }
    });
    return $project;
  }
}
