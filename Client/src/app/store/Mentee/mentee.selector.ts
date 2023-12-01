import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenteeState } from "src/app/model/menteeModel";

const getMenteeState = createFeatureSelector<MenteeState>('mentee');

export const getMenteeInfo = createSelector(getMenteeState,(state)=>{
   return state.menteeInfo;
})