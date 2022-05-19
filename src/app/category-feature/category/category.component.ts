import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../models/category/category";
import {Observable, take} from "rxjs";
import {selectMyCategories} from "../../selectors/category.selector";
import {addCategory, changeCategory, loadCategories, removeCategory} from "../../store/actions/category.actions";
import {Education} from "../../models/education/education";
import {addEducation, changeEducation, removeEducation} from "../../store/actions/education.actions";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[] | null> = this.categoryStore.select(selectMyCategories);

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faXmark = faXmark;
  faTriangleExclamation = faTriangleExclamation;

  mode: string = "add";
  active = false;
  showModal: boolean = false;

  categoryForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    active: [true, Validators.required],
  })

  constructor(private fb: FormBuilder, private categoryStore: Store<{ cateories: Category[] }>) { }

  ngOnInit(): void {
    this.categoryStore.dispatch(loadCategories())
    this.categories$.pipe(take(1)).subscribe()
  }


  onSubmit(){
    if (!this.categoryForm.valid) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if ( this.mode === "add") {
        this.categoryStore.dispatch(addCategory({category: this.categoryForm.value}));
      } else if (this.mode === "edit") {
        this.categoryStore.dispatch(changeCategory({category: this.categoryForm.value, id: this.categoryForm.value.id}));
      }
    }

  }

  onEdit(category: Category){
    this.mode = 'edit'
    this.categoryForm.setValue(category)
  }

  onRemove(id: number) {
    this.showModal = false;
    this.categoryStore.dispatch(removeCategory({id: id}));
  }

  showDeleteModal(category: Category){
    this.categoryForm.setValue(category);
    this.showModal = true;
  }

  closeDeleteModal(modal: boolean){
    this.showModal = modal;
  }

  toggleActive(category: Category){
    console.log(category)
    this.active = category.active
    this.categoryForm.setValue(category)
    this.active = !this.active;
    this.categoryForm.patchValue({ active: this.active })
    this.categoryStore.dispatch(changeCategory({category: this.categoryForm.value, id: Number(category.id)}));
  }

  clear(){
    this.categoryForm.reset()
    this.categoryForm.patchValue({
      id: 0
    })
    this.mode = "add"
  }

}
