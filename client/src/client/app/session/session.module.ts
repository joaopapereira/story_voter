import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';
import { UserService } from '../shared/user/index';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SessionComponent],
  exports: [SessionComponent],
  providers: [UserService]
})
export class SessionModule { }
