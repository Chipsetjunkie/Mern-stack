import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileTop = ({profile:{
        status,
        company,location,website,
        social,
        user:{name,avatar},
        skills,
        experience,
        education
}}) => {



      return(
        <>
        <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
    <img
      className="round-img my-1"
      src={avatar}
      alt=""
    />
    <h1 className="large">{name}</h1>
    <p className="lead">{status}</p>
    <p>{location? location:"Mars section01X" }</p>

    </div>
        <div className="profile-about bg-light p-2">
    <h2 className="text-primary">John's Bio</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
      doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
      neque modi perspiciatis similique?
    </p>
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill,index)=>(
          <div key={index} className="p-1"><i className="fa fa-check"></i> {skill}</div>
      ))}
    </div>
        </div>
    <div className="profile-exp bg-white p-2">
    <h2 className="text-primary">Experience</h2>
      {experience.length >0 ? experience.map((exp,i) =>
        <div key={exp._id}>
          <h3 className="text-dark">{exp.company}</h3>
          <p><Moment format="MMMM, YYYY">{exp.from}</Moment> - {exp.to?<Moment format="MMMM, YYYY">{exp.to}</Moment>:"current"}</p>
          <p><strong>Position: </strong>{exp.title}</p>
          <p>
            <strong>Description: </strong>{exp.description}
          </p>
        </div>
      ):<b>No Experience Credentials</b>}
      </div>
    <div className="profile-edu bg-white p-2">
    <h2 className="text-primary">Education</h2>
    {education.length>0 ? education.map((edu,i)=>(
      <div key={i}>
        <h3>{edu.school}</h3>
        <p><Moment format="MMMM, YYYY">{edu.from}</Moment> - {edu.to?<Moment format="MMMM, YYYY">{edu.to}</Moment>:"current"}</p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
        <p>
          <strong>Description: </strong>{edu.description}
        </p>
      </div>
    )) : <b>No Education Credentials</b>}
        </div>
        </div>
        </>
      )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
