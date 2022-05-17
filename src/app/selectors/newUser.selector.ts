import {createFeatureSelector, createSelector} from "@ngrx/store";
import {newUserFeatureKey, selectNewUser, State} from "../store/reducers/created-user.reducer";


export const selectNewUSerFeature = createFeatureSelector<State>(newUserFeatureKey);

export const selectMyNewUser = createSelector(selectNewUSerFeature, selectNewUser);

