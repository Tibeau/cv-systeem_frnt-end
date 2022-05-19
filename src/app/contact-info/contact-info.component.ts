import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {User} from "../security/user";
import {filter, Observable, take} from "rxjs";
import {selectMyUser} from "../selectors/auth.selector";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {changeUser} from "../store/actions/auth.actions";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category/category";
import {selectMyCategories} from "../selectors/category.selector";
import {loadCategories} from "../store/actions/category.actions";


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  user$: Observable<User | null> = this.authStore.select(selectMyUser);
  categories$: Observable<Category[] | null> = this.categoryStore.select(selectMyCategories);

  userForm = this.fb.group({
    id: ["", Validators.required,],
    candidateId: [""],
    companyId: [""],
    email: ["", Validators.required,],
    username: [""],
    category: [""],
    phone: ["", Validators.required,],
    password: [""],
    firstname: ["", Validators.required,],
    lastname: ["", Validators.required,],
    country: ["", Validators.required,],
    street: ["", Validators.required,],
    city: ["", Validators.required,],
    description: [""],
    linkedIn: ["", Validators.required,],
    imgUrl: [""],
    driversLicence: ["", Validators.required,],
    role: ["", Validators.required,],
    token: [""],
    number: ["", Validators.required,],
    postalCode: ["", Validators.required,],
    firstLogin: [false],
    active: ["", Validators.required,],
  })

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder,
              private authStore: Store<{ user: User }>,
              private categoryStore: Store<{ categories: Category[] }>,
  ) {
  }

  ngOnInit(): void {
    this.categoryStore.dispatch(loadCategories())
    this.categories$.pipe(take(1)).subscribe()
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
      this.userForm.patchValue({
        username: this.userForm.value.email
      })

      if (this.userForm.value.firstLogin) {
        this.userForm.patchValue({
          firstLogin: false,
          active: true,
        })
      }
      this.authStore.dispatch(changeUser({user: this.userForm.value, id: this.userForm.value.id}));
    }
  }
}
