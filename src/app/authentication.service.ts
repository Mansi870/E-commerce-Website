import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}
  varIsLoggedIn = 'isLoggedIn';
  loginFlag: boolean = false;
  login() {
    localStorage.setItem(this.varIsLoggedIn, 'true');
    // this.router.navigate(['/cart']);
    return this.loginFlag;
  }
  IsLoggedIn(flag: boolean) {
    this.loginFlag = flag;
  }
  logOut() {
    localStorage.setItem(this.varIsLoggedIn, 'false');
    this.router.navigate(['/Home']);
    return (this.loginFlag = false);
  }
}
