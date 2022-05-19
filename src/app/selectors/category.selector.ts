import {createFeatureSelector, createSelector} from "@ngrx/store";
import {categoryFeatureKey, selectCategories, State} from "../store/reducers/category.reducers";

export const selectCategoryFeature = createFeatureSelector<State>(categoryFeatureKey);

export const selectMyCategories = createSelector(selectCategoryFeature, selectCategories);

