import { Component, OnInit } from '@angular/core';
import {AuthService} from "../security/auth.service";
import {Store} from "@ngrx/store";
import {User} from "../security/user";
import {filter, Observable, take} from "rxjs";
import {selectMyUser} from "../security/user.selector";
import {FormBuilder, Validators} from "@angular/forms";
import {addEducation, changeEducation} from "../store/actions/education.actions";
import {Router} from "@angular/router";
import {changeUser} from "../store/actions/auth.actions";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  user$: Observable<User | null> = this.authStore.select(selectMyUser);

  userForm = this.fb.group({
    id: ["", Validators.required,],
    candidateId: [0],
    companyId: [0],
    email: ["", Validators.required,],
    username: [""],
    phone: ["", Validators.required,],
    password: ["", Validators.required,],
    firstname: ["", Validators.required,],
    lastname: ["", Validators.required,],
    country: ["", Validators.required,],
    street: ["", Validators.required,],
    city: ["", Validators.required,],
    description: ["", Validators.required,],
    linkedIn: ["", Validators.required,],
    imgUrl: ["", Validators.required,],
    driversLicence: ["", Validators.required,],
    role: ["", Validators.required,],
    token: [""],
    number: ["", Validators.required,],
    postalCode: ["", Validators.required,],
    active: ["", Validators.required,],
  })

  constructor(private http: HttpClient, private router: Router ,private fb: FormBuilder ,private authService: AuthService,
              private authStore: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.user$.pipe(
      filter((user): user is User => user !== null),
      take(1)).subscribe((user) => {
      this.userForm.setValue({...user})
    });
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
        this.authStore.dispatch(changeUser({user: this.userForm.value, id: this.userForm.value.id}));
    }

  }




}
