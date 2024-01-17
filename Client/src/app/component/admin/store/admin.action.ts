import { createAction, props } from "@ngrx/store";
import { AdminInfo, LoginModel } from "src/app/model/commonModel";

// Action constants
export const LOGIN_ADMIN = '[auth] admin login';
export const LOGIN_ADMIN_SUCCESS = '[auth] admin login success';
// To get admin data
export const GET_ADMIN = '[auth] get admin data';
export const GET_ADMIN_SUCCESS = '[auth] get admin success';

// Action definitions
// Admin login dispatch
export const loginAdmin = createAction(LOGIN_ADMIN,props<{data:LoginModel}>());
// Admin login action success 
export const loginAdminSuccess = createAction(LOGIN_ADMIN_SUCCESS,props<{admin:AdminInfo}>());

// Action for getting admin data
export const getAdmin = createAction(GET_ADMIN);
export const getAdminSuccess = createAction(GET_ADMIN_SUCCESS,props<{admin:AdminInfo}>());