import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/security/user';
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import {LogIn} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user$: Observable<User> = this.store.select(state => state.user)
  user: User = {
    id: '',
    password: '',
    email: '',
    token: '',
    firstname: '',
    lastname: '',
    street: '',
    country: '',
    active: '',
    role: '',
    description: '',
    city: '',
    number: '',
    postcode: '',
    phone: '',
    linkedIn: '',
    imgUrl: '',
    driversLicence: '',
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';
  errorIsShown: boolean = false;
  isLogin: boolean = false;
  isLogout: boolean = false;

  constructor(private router: Router,
              private store: Store<{ user: User}>) {
    this.user$ = store.select('user')
  }

  ngOnInit(): void {
    this.isLogin = true;
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    console.log(payload)
    this.store.dispatch(new LogIn(payload))
    console.log("login started")
  }

  // onSubmit(): void {
  //   console.log(this.user);
  //   this.isSubmitted = true;
  //   this.authService.authenticate(this.user).subscribe((result) => {
  //     console.log('login success');
  //     console.log(result);
  //     //Access token opslaan in localStorage
  //     localStorage.setItem('token', result.jwttoken);
  //     localStorage.setItem('id', JSON.stringify(result.id));
  //     localStorage.setItem('email', result.email);
  //     localStorage.setItem('firstname', result.firstname);
  //     localStorage.setItem('lastname', result.lastname);
  //     localStorage.setItem('role', result.role.toString().toUpperCase());
  //     localStorage.setItem('city', result.city);
  //     localStorage.setItem('country', result.country);
  //     localStorage.setItem('street', result.street);
  //     localStorage.setItem('number', result.number);
  //     localStorage.setItem('postcode', result.postcode);
  //     localStorage.setItem('phone', result.phone);
  //     localStorage.setItem('description', result.description);
  //     localStorage.setItem('active', result.active);
  //     this.router.navigate(['']).then(() => {
  //       window.location.reload();
  //     });
  //   });
  // }
}
