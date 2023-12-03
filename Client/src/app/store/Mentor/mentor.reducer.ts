import { createReducer, on } from "@ngrx/store";
import { MentorState } from "./mentor.state";
import { loginMentorSuccess } from "./mentor.action";

const _mentorReducer =   createReducer(MentorState,
   on(loginMentorSuccess,(state,action)=>{
      const mentorData = {...action.mentor}
      return {
         ...state,
         mentorInfo:{
            name:mentorData.name,
            email:mentorData.email,
            role:mentorData.role,
         }
      }
   }))


export function MentorReducer(state:any,action:any){
   return _mentorReducer(state,action);
}