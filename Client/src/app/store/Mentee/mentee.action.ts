import { createAction, props } from "@ngrx/store";
import { LoginModel, MenteeInfo } from "src/app/model/menteeModel";

// Constants declaration
export const LOGIN_MENTEE = '[auth] mentee login';
export const LOGIN_MENTEE_SUCCESS = '[auth] mentee login success';

// Action definition
export const loginMentee = createAction(LOGIN_MENTEE,props<{data:LoginModel}>());
export const loginMenteeSuccess = createAction(LOGIN_MENTEE_SUCCESS,props<{mentee:MenteeInfo}>());