import { Component, OnInit, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'st-voting-session',
  templateUrl: 'voting_session.component.html'
})

export class VotingSessionComponent implements OnInit {
  projectId: number;
  sessionId: number;
  project: Project;
  session: VotingSession;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public route: ActivatedRoute,
              public router: Router,
              public votingService: VotingSessionsService,
              public projectsService: ProjectsService) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.projectId = +params['project_id'];
      this.sessionId = +params['session_id'];
    });
    this.loadSession();
  }

  loadSession() {
    var $this = this;
    this.votingService.getSession(this.projectId, this.sessionId)
        .subscribe(
            (userStoryObject:VotingSession) => {
              $this.session = userStoryObject;
              $this.project = $this.session.project;
            }, //Bind to view
             (err:any) => {
                 // Log errors if any
                 console.log(err);
             });
  }
  goBack() {
    this.router.navigate(['/projects/' + this.projectId ]);
  }
  gotoAddStories() {
    this.router.navigate(['/projects/' + this.projectId + '/voting_session/' + this.sessionId + '/add' ]);
  }
}
