import { createAction, props } from "@ngrx/store";
import { LoginModel, UserInfo } from "src/app/model/commonModel";

// Action constants
export const LOGIN_MENTOR = '[auth] login mentor';
export const LOGIN_MENTOR_SUCCESS = '[auth] login mentor success';
export const GET_MENTOR = '[auth] get mentor'
export const GET_MENTOR_SUCCESS = '[auth] get mentor success'


// Action definitinon
export const loginMentor = createAction(LOGIN_MENTOR,props<{data:LoginModel}>());
export const loginMentorSuccess = createAction(LOGIN_MENTOR_SUCCESS,props<{mentor:UserInfo}>());

// get the user
export const getMentor = createAction(GET_MENTOR,props<{token:string}>()); 
export const getMentorSuccess = createAction(GET_MENTOR_SUCCESS,props<{mentor:UserInfo}>);