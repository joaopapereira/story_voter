import { Component, OnInit, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectsService } from '../shared/index';
import { VotingSessionsService, VotingSession } from './voting_sessions.service'


@Pipe({name: 'dateToday'})
export class DateWithTodayPipe implements PipeTransform {
  transform(value: string): string {
    let today = new Date().toISOString().slice(0,10);
    if(0 == value.localeCompare(today)) {
      return "Today";
    }
    return value.toString();
  }
}


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'st-voting-sessions',
  templateUrl: 'voting_sessions.component.html'
})

export class VotingSessionsComponent implements OnInit {
  projectId: number;
  project: Project;
  sessions: VotingSession[];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public route: ActivatedRoute, public votingService: VotingSessionsService, public projectsService: ProjectsService) {
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
    this.project = this.projectsService.getProject(this.projectId);
    this.votingService.getSessions(this.projectId)
        .subscribe(
            (userStoryObject:VotingSession[]) => {
              $this.sessions = userStoryObject;
            }, //Bind to view
             (err:any) => {
                 // Log errors if any
                 console.log(err);
             });
  }
}
