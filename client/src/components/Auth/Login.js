import React,{useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginuser} from '../Actions/auth';

const Login = ({loginuser,isauthenticated}) =>{

  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  const {email,password} = formData;

  const changeHandler = event =>{
      setFormData({...formData,[event.target.name]:event.target.value})
  }

  const SubmitForm = async event =>{
    event.preventDefault();
    loginuser(email,password)
  }

  //Login redirect
  if(isauthenticated){
    return <Redirect to="/dashboard"/>;
  }

  return(
    <>
    <h1 className="large text-primary">Sign In</h1>
      <form className="form" onSubmit={SubmitForm}>
        <div className="form-group">
          <input type="email"
          placeholder="Email Address"
          value={email}
          onChange = {changeHandler}
          name="email"
          required/>
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      </>
  )
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}



const mapStateToProps = state =>({
    isauthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{loginuser})(Login)
