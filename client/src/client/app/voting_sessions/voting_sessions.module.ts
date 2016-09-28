import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VotingSessionsComponent, DateWithTodayPipe } from './voting_sessions.component';
import { VotingSessionComponent } from './voting_session.component';
import { VotingSessionsService } from './voting_sessions.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [VotingSessionsComponent, DateWithTodayPipe, VotingSessionComponent],
  exports: [VotingSessionsComponent, VotingSessionComponent],
  providers: [VotingSessionsService]
})
export class VotingSessionsModule { }
