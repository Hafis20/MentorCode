import { createReducer, on } from "@ngrx/store";
import { MenteeState } from "./mentee.state";
import { loginMenteeSuccess } from "./mentee.action";


const _menteeReducer = createReducer(MenteeState,
   on(loginMenteeSuccess,(state,action)=>{
   const mentee = {...action.mentee}
      return {
         ...state,
         menteeInfo:{
            name:mentee.name,
            email:mentee.email,
            role:mentee.role,
         }
      }
   }))

export function MenteeReducer(state:any,action:any){
   return _menteeReducer(state,action);
}