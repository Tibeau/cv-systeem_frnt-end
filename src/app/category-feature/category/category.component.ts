import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {faPencil, faTrashCan, faTriangleExclamation, faXmark} from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../models/category/category";
import {filter, Observable, take} from "rxjs";
import {selectMyCategories} from "../../selectors/category.selector";
import {addCategory, changeCategory, loadCategories, removeCategory} from "../../store/actions/category.actions";
import {CategoryPagination} from "../../models/category/category-pagination";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<CategoryPagination | null> = this.categoryStore.select(selectMyCategories);
  myCategories$: Observable<Category[]> = this.categories$.pipe(
    filter((categories): categories is CategoryPagination => categories !== undefined),
    map(categories => categories?.content));

  faPencil = faPencil;
  faTrashCan = faTrashCan;
  faXmark = faXmark;
  faTriangleExclamation = faTriangleExclamation;

  mode: string = "add";
  active = false;
  showModal: boolean = false;

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.categories$.pipe(
    filter((categories): categories is CategoryPagination => categories !== undefined),
    map(categories => categories?.totalPages));
  pageAmount: number = 0;

  categoryForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    active: [false, Validators.required],
  })

  constructor(private fb: FormBuilder, private categoryStore: Store<{ categories: Category[] }>) {
  }

  ngOnInit(): void {
    this.categoryStore.dispatch(loadCategories({page: 0, items: 8}))
    this.myCategories$.pipe(take(1)).subscribe()
    this.pageAmountSub$.subscribe((page: number) => {
      this.pageAmount = page
    })
  }


  onSubmit() {
    if (!this.categoryForm.valid) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if (this.mode === "add") {
        this.categoryStore.dispatch(addCategory({category: this.categoryForm.value}));
      } else if (this.mode === "edit") {
        this.categoryStore.dispatch(changeCategory({
          category: this.categoryForm.value,
          id: this.categoryForm.value.id
        }));
      }
    }
  }

  onEdit(category: Category) {
    this.mode = 'edit'
    this.categoryForm.setValue(category)
  }

  onRemove(id: number) {
    this.showModal = false;
    this.categoryStore.dispatch(removeCategory({id: id}));
  }

  showDeleteModal(category: Category) {
    this.categoryForm.setValue(category);
    this.showModal = true;
  }

  closeDeleteModal(modal: boolean) {
    this.showModal = modal;
  }

  toggleActive(category: Category) {
    console.log(category)
    this.active = category.active
    this.categoryForm.setValue(category)
    this.active = !this.active;
    this.categoryForm.patchValue({active: this.active})
    this.categoryStore.dispatch(changeCategory({category: this.categoryForm.value, id: Number(category.id)}));
    this.clear()
  }

  clear() {
    this.categoryForm.reset()
    this.categoryForm.patchValue({
      id: 0
    })
    this.mode = "add"
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.categoryStore.dispatch(loadCategories({page: this.currentPage, items: 8}));
  }

}
