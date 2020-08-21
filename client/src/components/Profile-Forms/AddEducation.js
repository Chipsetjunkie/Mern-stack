import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import{withRouter} from 'react-router-dom'
import {addEducation} from '../Actions/profile';

const AddEducation = ({addEducation,history}) =>{
  const [formData,setFormData] = useState({school:"",
          degree:"",
          fieldofstudy:"",
          from:"",
          to:"",
          description: "",
          current:false
        })

  const onChange= e => setFormData({...formData,[e.target.name]:e.target.value})

  const {school,
          degree,
          fieldofstudy,
          from,
          to,
          description,current} = formData


    const submitHandler = e =>{
        e.preventDefault()
        addEducation(formData,history)

    }

    return(
      <>
      <h1 className="large text-primary">
          Add Your Education
        </h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
          you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange}/>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChange}/>
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" value="" onChange={()=>{setFormData({...formData,current:!current})}}
              /> Current School or Bootcamp
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" disabled={current} onChange={onChange} value={to}/>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" onChange={onChange}/>
          <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
   </>
    )
}

AddEducation.propTypes = {
  addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(withRouter(AddEducation))
