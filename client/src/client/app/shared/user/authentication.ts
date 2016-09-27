import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import {UserService} from '../user/index'

@Injectable()
export class Authentication implements CanActivate {

  constructor(private userService: UserService, 
              private notifications: NotificationsService,
              private router: Router) {}

  canActivate() {

    if (this.userService.isLoggedIn()) { return true; }
      this.router.navigate(['/']);
      this.notifications.alert("Login required", "You need to be logged in to perform this action");
      return false;
  } 
}