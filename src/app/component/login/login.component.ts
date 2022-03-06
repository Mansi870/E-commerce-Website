import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { ConfirmPasswordValidator } from 'src/app/passwordmatchValidator';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public SignUpForm!: FormGroup;
  public LoginForm!: FormGroup;
  varIsLoggedIn = 'isLoggedIn';
  phoneRege="^[0-9]{10}$"

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private restService: RestService,
    private authenticationService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      Email: ['',[Validators.required]],
      Password: ['',[Validators.required,Validators.minLength(6)]],
      ConfPassword: ['',[Validators.required]],
      Phone: ['',[Validators.required,Validators.minLength(10)]],
    },
    {
      Validators: ConfirmPasswordValidator("Password","ConfPassword")
    }
   
  );
    this.LoginForm = this.formBuilder.group({
      Email: ['',],
      Password: [''],
    });
}
 
  signUp() {
    let userObj = {
      id: ++this.restService.id,
      Email: this.SignUpForm.get(['Email'])?.value,
      Password: this.SignUpForm.get(['Password'])?.value,
      ConfPassword: this.SignUpForm.get(['ConfPassword'])?.value,
      Phone: this.SignUpForm.get(['Phone'])?.value,
    };
    let header={'content-type':'application/json'};

    let body= JSON.stringify(userObj);
    this.http
      .post('http://localhost:8000/register', userObj,{'headers':header, responseType: 'text'})
      .subscribe((data) => {
        console.log(data);
        alert('data in inserted');

    this.SignUpForm.reset();
  })
}



  Login() {

   


    // Email: this.LoginForm.get(['Email'])?.value,
    // Password: this.LoginForm.get(['Password'])?.value
    this.http.get<any>('http://localhost:8000/getAlldata').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.Email === this.LoginForm.value.Email &&
            a.Password === this.LoginForm.value.Password
          );
        });
        if (user) {
           alert('Login Sucess');
           localStorage.setItem(this.varIsLoggedIn, 'true')
          this.LoginForm.reset();
          this.router.navigate(['/Home']);
        } else {
          alert('Details Not found');
        }
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }

  
}

