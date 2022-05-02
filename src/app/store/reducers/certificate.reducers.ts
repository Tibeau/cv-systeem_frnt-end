import {createReducer, on} from "@ngrx/store";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {
  changeCertificate, changeCertificateFail, changeCertificateSuccess,
  loadCertificates,
  loadCertificatesFail,
  loadCertificatesSuccess
} from "../actions/certificate.actions";
export const certificateFeatureKey = "certificates";

export const selectCertificates = (state: State) => state.certificates

export const selectCertificate = (state: State) => state.certificates


export interface State {
  certificates: CertificatePagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  certificates: null,
  errorMessage: null,
};

export const certificateReducer = createReducer(
  initialState,
  on(loadCertificates, (state) => ({certificates: null, errorMessage: "loading certificates"})),
  on(loadCertificatesSuccess, (state, props) => ({certificates: props.certificates, errorMessage: "loaded certificates successfully"})),
  on(loadCertificatesFail, (state) => ({certificates: null, errorMessage: "failed to load certificates"})),

  on(changeCertificate, (state) => ({certificates: null, errorMessage: "changing certificate"})),
  on(changeCertificateSuccess, (state) => ({certificates: null, errorMessage: "changed certificate successfully"})),
  on(changeCertificateFail, (state) => ({certificates: null, errorMessage: "failed to change certificate"})),

);


