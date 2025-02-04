import axios from 'axios';
import {setAlert} from './index';


import {GET_PROFILE,GET_PROFILES,PROFILE_ERROR,UPDATE_PROFILE,DELETE_ACCOUNT,CLEAR_PROFILE} from './types';

export const getCurrentProfile = () => async dispatch => {
    try{
      const res = await axios.get('/api/profile/me');
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })

    }catch(err){
      console.log(err)
      dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
      })
    }
}

export const getProfiles = () => async dispatch => {
    try{
      const res = await axios.get('/api/profile');
      dispatch({
        type:GET_PROFILES,
        payload:res.data
      })

    }catch(err){
      console.log(err)
      dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
      })
    }
}


export const getUserProfile = userId => async dispatch => {
     dispatch({
      type:CLEAR_PROFILE,
    });

    try{
        const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
        type:GET_PROFILE,
        payload:res.data
      })

    }catch(err){
      console.log(err)
      dispatch({
        type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}
      })
    }
}


export const createProfile = (formData,history,edit=false) => async dispatch =>{
  try{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const res = await axios.post('api/profile',formData,config);
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated':'Profile Created','success'));

    if(!edit){
      history.push('/dashboard');
    }
  }catch(err){
    const errors = err.response.data.errors.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
  }
  dispatch({
    type:PROFILE_ERROR,
    payload:{msg:err.response.statusText,status:err.response.status}
  })
}
};

//Add Experience
export const addExperience = (formData,history) => async dispatch =>{
  try{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const res = await axios.put('api/profile/experience',formData,config);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    });
    dispatch(setAlert('Experience Added','success'));
    history.push('/dashboard');

  }catch(err){
    const errors = err.response.data.errors.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
  }
  dispatch({
    type:PROFILE_ERROR,
    payload:{msg:err.response.statusText,status:err.response.status}
  })
}
};

//Add Education
  export const addEducation = (formData,history) => async dispatch =>{
  try{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const res = await axios.put('api/profile/education',formData,config);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    });
    dispatch(setAlert('Education Added','success'));
    history.push('/dashboard');

  }catch(err){
    console.log(err)
    const errors = err.response.data.errors.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
  }
  dispatch({
    type:PROFILE_ERROR,
    payload:{msg:err.response.statusText,status:err.response.status}
  })
}
};


export const deleteExperience = id => async dispatch =>{
try{
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:{user_profile:res.data}
    });
  dispatch(setAlert('Experience Deleted','success'));

}catch(err){
dispatch({
  type:PROFILE_ERROR,
  payload:{msg:err.response.statusText,status:err.response.status}
})
}
};

export const deleteEducation = id => async dispatch =>{
try{
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:{user_profile:res.data}
    });
  dispatch(setAlert('Education Deleted','success'));

}catch(err){
  console.log(err)
dispatch({
  type:PROFILE_ERROR,
  payload:{msg:err.response.statusText,status:err.response.status}
})
}
};


export const deleteAccount = () => async dispatch =>{

if(window.confirm('are you sure')){
try{
    await axios.delete(`api/profile`);
    dispatch({
      type:DELETE_ACCOUNT,
    });
    dispatch({
      type:CLEAR_PROFILE,
    });
  dispatch(setAlert('Account Permanently Deleted'));

}catch(err){
dispatch({
  type:PROFILE_ERROR,
  payload:{msg:err.response.statusText,status:err.response.status}
})
}
}};
