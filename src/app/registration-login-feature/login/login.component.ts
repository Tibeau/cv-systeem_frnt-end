import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/security/user';
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import {login} from "../../store/actions/auth.actions";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user$: Observable<User> = this.store.select(state => state.user)
userForm = this.fb.group({
  email: ["", Validators.required],
  password: ["", Validators.required],
})

  isSubmitted: boolean = false;
  errorMessage: string = '';
  errorIsShown: boolean = false;
  isLogin: boolean = false;
  isLogout: boolean = false;

  constructor( private fb: FormBuilder
    ,private router: Router,
              private store: Store<{ user: User}>) {
    this.user$ = store.select('user')
  }

  ngOnInit(): void {
    this.isLogin = true;
  }

  onSubmit(): void {
    const payload = {
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    this.store.dispatch(login({payload}))
  }
}
