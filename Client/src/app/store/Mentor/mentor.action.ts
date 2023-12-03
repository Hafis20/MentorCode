import { createAction, props } from "@ngrx/store";
import { LoginModel, UserInfo } from "src/app/model/commonModel";

// Action constants
export const LOGIN_MENTOR = '[auth] login mentor';
export const LOGIN_MENTOR_SUCCESS = '[auth] login mentor success';


// Action definitinon
export const loginMentor = createAction(LOGIN_MENTOR,props<{data:LoginModel}>());
export const loginMentorSuccess = createAction(LOGIN_MENTOR_SUCCESS,props<{mentor:UserInfo}>());