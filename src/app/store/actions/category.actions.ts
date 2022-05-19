import {createAction, props} from '@ngrx/store';
import {Category} from "../../models/category/category";
import {CategoryPagination} from "../../models/category/category-pagination";




let type = "[Category]"


//CHANGE CATEGORY
export const changeCategory = createAction(
  `${type} changeCategory`,
  props<{category: Category, id: number}>(),
)

export const changeCategorySuccess = createAction(
  `${type} changeCategory SUCCESS`,
)

export const changeCategoryFail = createAction(
  `${type} changeCategory FAIL`,
  props<{error: any}>()
)


//ADD CATEGORY
export const addCategory = createAction(
  `${type} addCategory`,
  props<{category: Category}>(),
)
export const addCategorySuccess = createAction(
  `${type} addCategory SUCCESS`,
)

export const addCategoryFail = createAction(
  `${type} addCategory FAIL`,
  props<{error: any}>()
)


//LOAD CATEGORIEs
export const loadCategories = createAction(
  `${type} loadCategories`,
  props<{page: number, items: number}>(),
)
export const loadCategoriesSuccess = createAction(
  `${type} loadCategories SUCCESS`,
  props<{categories: CategoryPagination}>(),
)

export const loadCategoriesFail = createAction(
  `${type} loadCategories FAIL`,
  props<{error: any}>()
)

//DELETE CATEGORY
export const removeCategory = createAction(
  `${type} removeCategory`,
  props<{id: number}>(),
)
export const removeCategorySuccess = createAction(
  `${type} removeCategory SUCCESS`,
)

export const removeCategoryFail = createAction(
  `${type} removeCategory FAIL`,
  props<{error: any}>()
)
