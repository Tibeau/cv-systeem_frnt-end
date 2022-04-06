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
}
