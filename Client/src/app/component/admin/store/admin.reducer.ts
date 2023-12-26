import { createReducer, on } from '@ngrx/store';
import { AdminState } from './admin.state';
import { getAdminSuccess, loginAdminSuccess } from './admin.action';

const _adminReducer = createReducer(
  AdminState,
  on(loginAdminSuccess, (state, action) => {
    const admin = { ...action.admin };
    return {
      ...state,
      adminInfo: {
        _id: admin._id,
        name: admin.name,
        role: admin.role,
      },
    };
  }),
  on(getAdminSuccess,(state,action)=>{
   const admin = {...action.admin}
   return {
      ...state,
      adminInfo:{
         _id:admin._id,
         name:admin.name,
         role:admin.role,
      }
   }
  })
);

export function AdminReducer(state: any, action: any) {
  return _adminReducer(state, action);
}
