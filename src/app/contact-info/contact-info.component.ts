import { Component, OnInit } from '@angular/core';
import {AuthService} from "../security/auth.service";
import {Store} from "@ngrx/store";
import {User} from "../security/user";
import {filter, Observable, take} from "rxjs";
import {selectMyUser} from "../security/user.selector";
import {FormBuilder, Validators} from "@angular/forms";

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
    postalcode: ["", Validators.required,],
    active: ["", Validators.required,],
    username: ["", Validators.required,],
    authorities: ["", Validators.required,],
  })

  constructor(private fb: FormBuilder ,private authService: AuthService,
              private authStore: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.user$.pipe(
      filter((user): user is User => user !== undefined),
      take(1)).subscribe((user) => {
      this.userForm.patchValue({role: {...user}.role})
      console.log(user)
      console.log(this.userForm.value)
    });
  }

  onSubmit(){

  }

}
