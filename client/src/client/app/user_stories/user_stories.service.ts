// user.service.ts
import { Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { Project } from '../shared/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class UserStory {
    id: number;
    identifier: string;
    title: string;
    url: string;
    constructor(info: Object) {
        this.id = info["id"];
        this.identifier = info["identifier"];
        this.title = info["title"];
        this.url = info["url"];
    }
}
export class UserStories {
    project: Project;
    stories: UserStory[];
}

@Injectable()
export class UserStoriesService {
  projects: Project[];

  constructor(private http: Http, private notifications: NotificationsService) {
    this.projects = [];
  }

  getUserStories(projectId): Observable<UserStories> {
    var $this = this;
     return this.http.get("/projects/" + projectId + '/user_stories')
                .map((res: Response) => res.json())
                .map((stories: Object) => {
                    let result:UserStories = new UserStories();
                    result.project = new Project(stories["project"]);
                    stories["stories"].forEach((story) => {
                        result.stories.push(new UserStory(story));
                    });
                    return result;
                  })
                //...errors if any
                .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
