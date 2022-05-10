import {createAction, props} from '@ngrx/store';
import {UserPagination} from "../../models/candidate/candidate-pagination";




let type = "[Candidate]"

//LOAD CANDIDATES
export const loadCandidates = createAction(
  `${type} loadCandidates`,
  props<{page: number, items: number}>(),
)
export const loadCandidatesSuccess = createAction(
  `${type} loadCandidates SUCCESS`,
  props<{candidates: UserPagination}>(),
)

export const loadCandidatesFail = createAction(
  `${type} loadCandidates FAIL`,
  props<{error: any}>()
)
