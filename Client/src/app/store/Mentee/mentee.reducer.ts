import { createReducer, on } from '@ngrx/store';
import { MenteeState } from './mentee.state';
import { getMenteeSuccess, loginMenteeSuccess, logoutMentee } from './mentee.action';

const _menteeReducer = createReducer(
  MenteeState,
  on(loginMenteeSuccess, (state, action) => {
    console.log(action);
    const mentee = { ...action.mentee };
    return {
      ...state,
      menteeInfo: {
        _id: mentee._id,
        name: mentee.name,
        email: mentee.email,
        image:mentee.image,
        role: mentee.role,
      },
    };
  }),
  on(getMenteeSuccess,(state,action)=>{
   const mentee = { ...action.mentee };
    return {
      ...state,
      menteeInfo: {
        _id: mentee._id,
        name: mentee.name,
        email: mentee.email,
        image:mentee.image,
        role: mentee.role,
      },
    };
  }),
  on(logoutMentee,(state)=>{
    return {
      ...state,
      menteeInfo:{
        _id:'',
        name:'',
        email:'',
        image:'',
        role:''
      }
    }
  })
);

export function MenteeReducer(state: any, action: any) {
  return _menteeReducer(state, action);
}
