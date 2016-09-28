// user.service.ts
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { Project } from '../shared/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface JSONInterface {
    [key: string]: any;
}


export class VotingSession {
    id: number;
    start_date: Date;
    end_date: Date;
    person: Object;
    project: Project;

    constructor(info: JSONInterface) {
        this.id = info["id"];
        this.start_date = info["start_date"];
        this.end_date = info["end_date"];
        this.person = info["person"];
        this.project = new Project(info["project"]);
    }
}

@Injectable()
export class VotingSessionsService {
  projects: Project[];

  constructor(private http: Http, private notifications: NotificationsService) {
    this.projects = [];
  }

  getSessions(projectId: number): Observable<VotingSession[]> {
    var $this = this;
     return this.http.get("/projects/" + projectId + '/voting_session')
                .map((res: Response) => res.json())
                .map((result: JSONInterface) => {
                    return result["sessions"];
                  })
                //...errors if any
                .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
