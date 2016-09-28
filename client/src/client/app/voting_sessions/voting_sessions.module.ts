import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VotingSessionsComponent } from './voting_sessions.component';
import { VotingSessionsService } from './voting_sessions.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [VotingSessionsComponent],
  exports: [VotingSessionsComponent],
  providers: [VotingSessionsService]
})
export class VotingSessionsModule { }
