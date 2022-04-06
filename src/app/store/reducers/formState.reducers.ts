import {Education} from "../../models/education";
import {createReducer, on} from "@ngrx/store";
import {
  resetFormState,
  setAddFormState,
  setEditFormState
} from '../actions/formState.actions';

export interface State {
  id: number | null,
  isAdd: boolean | null,
  isEdit: boolean | null
}

export const initialState: State = {
  id: null,
  isAdd:  null,
  isEdit: null
};

export const formReducer = createReducer(
  initialState,
  on(setAddFormState, (state, props) => ( {isEdit: true, isAdd: false, id: null})),
  on(setEditFormState, (state, props) => ( {isEdit: false, isAdd: true, id: props.id})),
  on(resetFormState, (state) => ( {isEdit: null, isAdd: null, id: null})),
);


