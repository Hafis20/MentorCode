import { createReducer, on } from '@ngrx/store';
import { MentorState } from './mentor.state';
import { getMentorSuccess, loginMentorSuccess, logoutMentor } from './mentor.action';

const _mentorReducer = createReducer(
  MentorState,
  on(loginMentorSuccess, (state, action) => {
    const mentorData = { ...action.mentor };
    return {
      ...state,
      mentorInfo: {
        _id: mentorData._id,
        name: mentorData.name,
        email: mentorData.email,
        image:mentorData.image,
        role: mentorData.role,
      },
    };
  }),
  on(getMentorSuccess,(state,action)=>{
      const mentorData = {...action.mentor}
      return {
         ...state,
         mentorInfo :{
            _id:mentorData._id,
            name:mentorData.name,
            email:mentorData.email,
            image:mentorData.image,
            role:mentorData.role,
         }
      }
  }),
  on(logoutMentor,(state)=>{
    return {
      ...state,
      mentorInfo:{
        _id:'',
        name:'',
        email:'',
        image:'',
        role:''
      }
    }
  })
);

export function MentorReducer(state: any, action: any) {
  return _mentorReducer(state, action);
}
