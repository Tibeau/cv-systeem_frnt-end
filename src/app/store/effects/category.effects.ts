import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {CategoryService} from "../../services/category/category.service";
import {
  addCategorySuccess,
  addCategory,
  addCategoryFail,
  changeCategory,
  loadCategories,
  loadCategoriesFail,
  loadCategoriesSuccess,
  changeCategorySuccess,
  removeCategoryFail,
  removeCategorySuccess,
  removeCategory,
  changeCategoryFail
} from "../actions/category.actions";

@Injectable()
export class CategoryEffects{

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}


  getCategories$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategories),
    switchMap((() => this.categoryService.loadCategories()
      .pipe(
        map(categories => ( loadCategoriesSuccess({categories: categories}) )),
        catchError(() => of(loadCategoriesFail))
      )))
  ));


  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addCategory),
    switchMap(({category}) => this.categoryService.createCategory(category)
      .pipe(
        map(category => ( addCategorySuccess())),
        catchError(() => of(addCategoryFail)),
        map(category => (loadCategories()))
      )))
  );


  changeCategory$ = createEffect(() => this.actions$.pipe(
    ofType(changeCategory),
    switchMap((({category, id}) => this.categoryService.putCategory(category, id)
      .pipe(
        map(category => ( changeCategorySuccess())),
        catchError(() => of(changeCategoryFail)),
        map(category => (loadCategories()))
      )))
  ));

  removeCategory$ = createEffect(() => this.actions$.pipe(
    ofType(removeCategory),
    switchMap(({id}) => this.categoryService.deleteCategory(id)
      .pipe(
        map(category => ( removeCategorySuccess() )),
        catchError(() => of(removeCategoryFail)),
        map(category => (loadCategories()))
      )))
  );
}
