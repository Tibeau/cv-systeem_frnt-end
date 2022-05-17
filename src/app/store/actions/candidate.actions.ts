import {createAction, props} from '@ngrx/store';
import {Candidate} from "../../models/candidate/candidate";

let type = "[Candidate]"

//CHANGE CANDIDATE
export const changeCandidate = createAction(
  `${type} changeCandidate`,
  props<{candidate: Candidate, id: number}>(),
)

export const changeCandidateSuccess = createAction(
  `${type} changeCandidate SUCCESS`,
)

export const changeCandidateFail = createAction(
  `${type} changeCandidate FAIL`,
  props<{error: any}>()
)


//ADD CANDIDATE
export const addCandidate = createAction(
  `${type} addCandidate`,
  props<{candidate: Candidate}>(),
)
export const addCandidateSuccess = createAction(
  `${type} addCandidate SUCCESS`,
  props<{candidate: Candidate}>(),
)

export const addCandidateFail = createAction(
  `${type} addCandidate FAIL`,
  props<{error: any}>()
)





