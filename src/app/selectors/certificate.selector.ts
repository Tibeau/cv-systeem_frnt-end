import {createFeatureSelector, createSelector} from "@ngrx/store";
import {certificateFeatureKey, selectCertificates, State} from "../store/reducers/certificate.reducers";

export const selectCertificateFeature = createFeatureSelector<State>(certificateFeatureKey);

export const selectMyCertificates= createSelector(selectCertificateFeature, selectCertificates);
