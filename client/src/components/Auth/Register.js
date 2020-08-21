import React,{useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {setAlert} from '../Actions';
import {register} from '../Actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert,register,isauthenticated}) =>{
    const [formData, setFormData] = useState({
      name:'',
      email:'',
      password: '',
      password2:''
    })

    const {name,email,password,password2} = formData;

    const changeHandler = event =>{
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    const SubmitForm = async event =>{
      event.preventDefault();
      if(password !== password2){
        setAlert('Password do not Match','danger')
      }else{
        register({name,email,password});
      }
    };

    if(isauthenticated){
      return <Redirect to="/Dashboard"/>

    }
  return(
    <>
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={SubmitForm}>
        <div className="form-group">
          <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange = {changeHandler}
          required
           />
        </div>
        <div className="form-group">
          <input type="email"
          placeholder="Email Address"
          value={email}
          onChange = {changeHandler}
          name="email"
          required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange = {changeHandler}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange = {changeHandler}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isauthenticated:PropTypes.bool
}

const mapStateToProps = state =>({
    isauthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register})(Register)
