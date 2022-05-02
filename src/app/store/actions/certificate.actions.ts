import {createAction, props} from '@ngrx/store';
import {Certificate} from "../../models/certificate/certificate";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";


let type = "[Certificate]"


//CHANGE CERTIFICATE
export const changeCertificate = createAction(
  `${type} changeCertificate`,
  props<{certificate: Certificate, id: number}>(),
)

export const changeCertificateSuccess = createAction(
  `${type} changeCertificate SUCCESS`,
)

export const changeCertificateFail = createAction(
  `${type} changeCertificate FAIL`,
  props<{error: any}>()
)



//ADD CERTIFICATE
export const addCertificate = createAction(
  `${type} addCertificate`,
  props<{certificate: Certificate}>(),
)
export const addCertificateSuccess = createAction(
  `${type} addCertificate SUCCESS`,
)

export const addCertificateFail = createAction(
  `${type} addCertificate FAIL`,
  props<{error: any}>()
)



//LOAD CERTIFICATEs
export const loadCertificates = createAction(
  `${type} loadCertificates`,
  props<{page: number}>(),
)
export const loadCertificatesSuccess = createAction(
  `${type} loadCertificates SUCCESS`,
  props<{certificates: CertificatePagination}>(),
)

export const loadCertificatesFail = createAction(
  `${type} loadCertificates FAIL`,
  props<{error: any}>()
)



//DELETE CERTIFICATE
export const removeCertificate = createAction(
  `${type} removeCertificate`,
  props<{id: number}>(),
)
export const removeCertificateSuccess = createAction(
  `${type} removeCertificate SUCCESS`,
)

export const removeCertificateFail = createAction(
  `${type} removeCertificate FAIL`,
  props<{error: any}>()
)
