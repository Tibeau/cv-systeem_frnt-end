import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/security/user';
import {Store} from '@ngrx/store';
import {login} from "../../store/actions/auth.actions";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  isSubmitted: boolean = false;
  errorMessage: string = '';
  errorIsShown: boolean = false;
  isLogin: boolean = false;
  isLogout: boolean = false;

  constructor(private fb: FormBuilder
    , private router: Router,
              private store: Store<{ user: User }>) {
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
