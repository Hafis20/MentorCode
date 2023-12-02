import { createAction, props } from "@ngrx/store";
import { AdminInfo, LoginModel } from "src/app/model/commonModel";

// Action constants
export const LOGIN_ADMIN = '[auth] admin login';
export const LOGIN_ADMIN_SUCCESS = '[auth] admin login success';


// Action definitions
// Admin login dispatch
export const loginAdmin = createAction(LOGIN_ADMIN,props<{data:LoginModel}>());
// Admin login action success 
export const loginAdminSuccess = createAction(LOGIN_ADMIN_SUCCESS,props<{admin:AdminInfo}>());
