import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SimpleNotificationsModule } from 'angular2-notifications'

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { ProjectModule } from './projects/project.module';
import { UserStoriesModule } from './user_stories/user_stories.module';
import { SessionModule } from './session/session.module';
import { SharedModule } from './shared/shared.module';
import { VotingSessionsModule } from './voting_sessions/voting_sessions.module';

@NgModule({
  imports: [SimpleNotificationsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes),
            AboutModule, HomeModule, SessionModule, ProjectModule,
            UserStoriesModule, VotingSessionsModule,
            SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
