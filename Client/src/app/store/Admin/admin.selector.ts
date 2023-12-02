import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "src/app/model/adminModel";


// Admin State
export const getAdminState = createFeatureSelector<AdminState>('admin');


// Selectors 
export const getAdminInfo = createSelector(getAdminState,(state)=>{
   return state.adminInfo;
})