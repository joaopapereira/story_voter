import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';


import { UserService } from '../shared/user/user.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-session',
  templateUrl: 'session.component.html',
  styleUrls: ['session.component.css'],
})

export class SessionComponent  implements OnInit  {
  errorMessage: string;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public userService: UserService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.isLoggedIn();
  }
  /**
   * Handle the nameListService observable
   */
  login() {
    console.log("Trying to login")
    this.userService.login();
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  logout() {
    this.userService.logout();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
