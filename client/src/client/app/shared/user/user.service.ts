// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class UserService {
  private windowHandle: Window;
  private user: Object;
  private loggedIn = false;

  constructor(private http: Http, private notifications: NotificationsService) {
    let token = localStorage.getItem('id_token');
    if(token == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  login() {
      window.location.href = '/auth/github';
  }

  logout() {
    localStorage.removeItem('id_token');
    this.loggedIn = false;
    this.user = null;
    this.http.get("/signout").subscribe(
        response => {
          this.notifications.success(
              'Logout',
              'The user is now logged out'
          );
          sessionStorage.clear();
        },
        error => {
          this.notifications.error(
              'Logout',
              'An error occurred while logging out'

          )
        }
      );
  }

  isLoggedIn(): boolean {
    var $this = this;
    if(this.user == null) {
      this.http.get("/session_handler/show").subscribe(
          response => {
            if(response.json().signed_in) {
              localStorage.setItem('id_token', response.json().user);
              $this.user = {};
              $this.user = response.json().user;
              $this.loggedIn = true;
              if(sessionStorage.getItem("already_logged") == null) {
                $this.notifications.success(
                    'Login',
                    'Welcome back: ' + (<any>$this.user)["name"]
                )
                sessionStorage.setItem("already_logged", "true");
              }
            }
          },
          error => {
            $this.notifications.error (
                'Login',
                'Error login in: ' + error.text()
            )
            $this.loggedIn = false;
          }
        );
    }
    return this.loggedIn;
  }
  getUser() {
    return this.user;
  }
}
