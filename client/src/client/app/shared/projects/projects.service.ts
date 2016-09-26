// user.service.ts
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { Project } from './project';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
  new(): Observable<Project[]> {
    var $this = this;
     return this.http.get("/projects/new")
                .map((res: Response) => res.json())
                //...errors if any
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjects() {
    if(this.projects.length == 0) {
      this.all();
    }
    return this.projects;
  }
}
