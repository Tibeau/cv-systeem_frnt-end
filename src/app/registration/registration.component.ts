import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {User} from "../security/user";
import {Candidate} from "../models/candidate/candidate";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {selectMyCandidate} from "./candidate.selector";
import {addEducation} from "../store/actions/education.actions";
import {addCandidate} from "../store/actions/candidate.actions";
import {addUser} from "../store/actions/auth.actions";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  candidate$: Observable<Candidate | null> = this.candidateStore.select(selectMyCandidate)

  userForm = this.fb.group({
    id: ["",],
    candidateId: [0],
    companyId: [0],
    email: ["", Validators.required,],
    username: [""],
    phone: ["", ],
    password: [""],
    firstname: [""],
    lastname: [""],
    country: [""],
    street: [""],
    city: [""],
    description: [""],
    linkedIn: [""],
    imgUrl: [""],
    driversLicence: [""],
    role: ["CANDIDATE", ],
    token: [""],
    number: [""],
    postalCode: [""],
    active: [false,],
  })

  candidateForm = this.fb.group( {
    id: 0,
    userId: this.userForm.value.id,
    anonymous: false,
  })

  constructor(private fb: FormBuilder ,
              private candidateStore: Store<{ candidate: Candidate }>,
              private authStore: Store<{ user: User }>
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
      var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
      var pass = "";
      for (var x = 0; x < 8; x++) {
        var i = Math.floor(Math.random() * 8);
        pass += chars.charAt(i);
      }

    this.userForm.patchValue(
      {
        username: this.userForm.value.email,
        password: "1234",  //temporary
      }
    )

    this.authStore.dispatch(addUser({user: this.userForm.value}));
    //this.candidateStore.dispatch(addCandidate({candidate: this.candidateForm.value}));

  }

}
