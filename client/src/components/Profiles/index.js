import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/spinner';
import {getProfiles} from '../Actions/profile';
import {connect} from 'react-redux';
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
      getProfiles();
    },[getProfiles]);
    return(
      <>
      {loading ?
         <Spinner/> :
         <>
         <h1 className="large text-primary">Developers</h1>
         <p className="lead">Browse and Connect with developers</p>
         <div className="profiles">
              {profiles.user_profile && profiles.user_profile.length>0 ?(
                profiles.user_profile.map(profile =>(
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
              ): <h4>No profiles </h4>}
         </div>
         </>}
      </>
    )
}


Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile:state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles);
