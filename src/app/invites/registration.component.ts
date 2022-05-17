import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActionsSubject, Store} from "@ngrx/store";
import {User} from "../security/user";
import {addUser, addUserSuccess, changeNewUser, changeUserSuccess} from "../store/actions/auth.actions";
import {Router} from "@angular/router";
import {Candidate} from "../models/candidate/candidate";
import {
  addCandidate,
  addCandidateSuccess,
  changeCandidate,
  changeCandidateSuccess
} from "../store/actions/candidate.actions";
import {ofType} from "@ngrx/effects";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userForm = this.fb.group({
    id: ["",],
    candidateId: [0],
    companyId: [0],
    email: ["", Validators.required,],
    username: [""],
    phone: ["",],
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
    role: ["CANDIDATE",],
    token: [""],
    number: [""],
    postalCode: [""],
    firstLogin: [true],
    active: [false,],
  })

  candidateForm = this.fb.group({
    id: "",
    userId: "",
    anonymous: false,
  })

  constructor(private router: Router,
              private fb: FormBuilder,
              private authStore: Store<{ user: User }>,
              private candidateStore: Store<{ candidate: Candidate }>,
              private actionsSubject$: ActionsSubject
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let chars = "abc34z!@#$%78stuvwxy)LM^&*(GHIJKklmn>ABCDEFqrdefghij-+<NOP12op5690";
    let pass = "";
    for (var x = 0; x < 8; x++) {
      var i = Math.floor(Math.random() * 8);
      pass += chars.charAt(i);
    }
    this.userForm.patchValue(
      {
        username: this.userForm.value.email,
        password: "1234", //due to change
      }
    )
    this.authStore.dispatch(addUser({user: this.userForm.value}));
    this.candidateStore.dispatch(addCandidate({candidate: this.candidateForm.value}))


    this.actionsSubject$.pipe(ofType(addUserSuccess)).subscribe((data: any) => {
      this.candidateForm.patchValue({userId: data.user.id})
      this.userForm.patchValue({id: data.user.id, password: data.user.password})
      this.candidateStore.dispatch(changeCandidate({
        candidate: this.candidateForm.value,
        id: this.candidateForm.value.id
      }))
      this.authStore.dispatch(changeNewUser({user: this.userForm.value, id: this.userForm.value.id}))
    })

    this.actionsSubject$.pipe(ofType(addCandidateSuccess)).subscribe((data: any) => {
      this.userForm.patchValue({candidateId: data.candidate.id})
      this.candidateForm.patchValue({id: data.candidate.id})
    })


    this.actionsSubject$.pipe(ofType(changeUserSuccess)).subscribe((data: any) => {
      this.userForm.patchValue({candidateId: "", id: ""})
    })

    this.actionsSubject$.pipe(ofType(changeCandidateSuccess)).subscribe((data: any) => {
      this.candidateForm.patchValue({userId: "", id: ""})
    })

    // window.alert(`invite success`);
  }
}



