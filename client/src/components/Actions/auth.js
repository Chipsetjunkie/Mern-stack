import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS,CLEAR_PROFILE,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from './types';
import {setAlert} from './index';
import setAuthToken from '../Utils/setAuthToken';
//
export const loadUser = () => async dispatch =>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try{
    const res = await axios.get('/api/auth');
    dispatch({
      type:USER_LOADED,
      payload:res.data
    })
  }catch(err){
    dispatch({
      type:AUTH_ERROR
    })
  }
}

export const register = ({name,email,password}) => async dispatch =>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const body = JSON.stringify({name, email, password});

    try{
      const res = await axios.post('/api/user',body, config)

      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      });
      dispatch(loadUser())
    }catch(err){
      const errors = err.response.data.errors
      if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
      }

      dispatch({
        type:REGISTER_FAIL
      });
    }
}

export const loginuser = (email,password) => async dispatch =>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const body = JSON.stringify({email, password});

    try{
      const res = await axios.post('/api/auth',body, config)

      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      });

      dispatch(loadUser());
    }catch(err){
      const errors = err.response.data.errors
      if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
      }

      dispatch({
        type:LOGIN_FAIL
      });
    }
}

export const logout = () => dispatch => {
    dispatch({type:LOGOUT});
    dispatch({type:CLEAR_PROFILE});
  };
