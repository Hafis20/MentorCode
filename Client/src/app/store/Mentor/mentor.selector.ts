import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MentorState } from "src/app/model/mentorModel";

// Create feature mentor selector
const MentorState = createFeatureSelector<MentorState>('mentor');

// Select mentor info
export const getMentorInfo = createSelector(MentorState,state=>{
   return state.mentorInfo;
})
