import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../layout/spinner';
import {getUserProfile} from '../Actions/profile';
import ProfileTop from './profileTop';

const Profile = ({getUserProfile,profile:{profile,loading},auth,...rest}) => {
    console.log(rest)
    useEffect(()=>{
      getUserProfile(rest.match.params.id);
    },[getUserProfile,rest.match.params.id])
    return(
      <>
          {profile === null || loading ? <Spinner/> :
            <>

              <Link to='/profiles' className="btn btn-light">Go Back</Link>
              {profile.profile && auth.isAuthenticated && auth.loading === false
                && auth.user.data._id === profile.profile.user._id&&
                (<Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>)
              }
              {profile.profile && <ProfileTop profile={profile.profile}/>}
            </>
          }
      </>
    )
}

Profile.propTypes = {
  getUserProfile:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      profile:state.profile,
      auth:state.auth
})

export default connect(mapStateToProps,{getUserProfile})(Profile);
