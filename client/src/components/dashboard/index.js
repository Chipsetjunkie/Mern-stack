import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../Actions/profile';
import Spinner from '../layout/spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';

const Dashboard = ({auth:{ user },deleteAccount,profile:{profile,loading},getCurrentProfile}) =>{
  useEffect(()=>{
      getCurrentProfile();
  },[getCurrentProfile])

  return loading && profile ===null ? <Spinner/> : <>
  <h1 className="large text-primary">Dashboard</h1>
  <p className="lead"><i className="fas fa-user"></i>Welcome <b>{user && user
    .data.name}</b></p>
      {profile !==null ? <>
        <DashboardActions/>
        {profile.user_profile && <Experience experience= {profile.user_profile.experience}/>}
        {profile.user_profile && <Education education= {profile.user_profile.education}/>}
        <div className="my-2">
        <button className="btn btn-danger" onClick={()=>deleteAccount()}>
        <i className="fas fa-user-minus"></i> Delete My Account
        </button>
        </div>
        </>
        :
        <><p> You have not yet set up a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">
        Create
        </Link>
        </>
      }
  </>
}


Dashboard.propTypes = {
    profile:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    deleteAccount:PropTypes.func.isRequired,
    auth :state.auth,
    getCurrentProfile:PropTypes.func.isRequired,
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
