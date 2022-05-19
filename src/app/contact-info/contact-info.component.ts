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
import {Education} from "../models/education/education";
import {EducationPagination} from "../models/education/education-pagination";
import {map} from "rxjs/operators";
import {CategoryPagination} from "../models/category/category-pagination";


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  user$: Observable<User | null> = this.authStore.select(selectMyUser);
  categories$: Observable<CategoryPagination | null> = this.categoryStore.select(selectMyCategories);
  myCategories$: Observable<Category[] | undefined> = this.categories$.pipe(
    filter(( categories):  categories is CategoryPagination => categories !== undefined),
    map(categories => categories?.content.filter(categories => categories.active === true)));

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
    this.categoryStore.dispatch(loadCategories({page: 0, items: 999999999}))
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
