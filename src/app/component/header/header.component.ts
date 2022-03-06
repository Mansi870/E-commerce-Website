import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';
// import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;
  varIsLoggedIn = 'isLoggedIn';
  constructor(
    private cartService: CartService,
    private Authentication: AuthenticationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    
    });
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  ngDoCheck(): void {
    // this.flagLogOut = this.Authentication.login();
  }
  flagLogOut: boolean = false;

  // Login(){
  //   this.Authentication.login();
  // }

  checkLogin(){

    return localStorage.getItem('isLoggedIn')
  }
  

  logOut() {
    // this.Authentication.logOut();
    localStorage.setItem(this.varIsLoggedIn, 'false');
    this.Authentication.IsLoggedIn(false);
    this.totalItem = 0;
    this.cartService.removeAllCart();
  }
  
}
