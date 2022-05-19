import {Category} from "../../models/category/category";
import {createReducer, on} from "@ngrx/store";
import {
  loadCategories,
  loadCategoriesFail,
  loadCategoriesSuccess,
  changeCategory,
  changeCategorySuccess,
  changeCategoryFail
} from '../actions/category.actions';
import {CategoryPagination} from "../../models/category/category-pagination";

export const categoryFeatureKey = "categories";

export const selectCategories = (state: State) => state.categories

export const selectCategory = (state: State) => state.categories


export interface State {
  categories: CategoryPagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  categories: null,
  errorMessage: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(loadCategories, (state) => ({categories: null, errorMessage: "loading categories"})),
  on(loadCategoriesSuccess, (state, props) => ({categories: props.categories, errorMessage: "loaded categories successfully"})),
  on(loadCategoriesFail, (state) => ({categories: null, errorMessage: "failed to load categories"})),

  on(changeCategory, (state) => ({categories: null, errorMessage: "changing category"})),
  on(changeCategorySuccess, (state) => ({categories: null, errorMessage: "changed category successfully"})),
  on(changeCategoryFail, (state) => ({categories: null, errorMessage: "failed to change category"})),
);


