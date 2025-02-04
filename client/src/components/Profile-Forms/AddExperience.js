import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import{withRouter,Link} from 'react-router-dom'
import {addExperience} from '../Actions/profile';


const AddExperience = ({addExperience,history}) =>{
  const [formData,setFormData] = useState({company:"",
          title:"",
          location:"",
          from:"",
          to:"",
          current:false,
          description:""})

  const onChange= e => setFormData({...formData,[e.target.name]:e.target.value})

  const {company,
          title,
          location,
          from,
          current,
          to,
          description} = formData


    const submitHandler = e =>{
        e.preventDefault()
        addExperience(formData,history)

    }

    return(
      <>
      <h1 className="large text-primary">
    Add An Experience
   </h1>
   <p className="lead">
     <i className="fas fa-code-branch"></i> Add any developer/programming
     positions that you have had in the past
   </p>
   <small>* = required field</small>
   <form className="form" onSubmit={submitHandler}>
     <div className="form-group">
       <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
     </div>
     <div className="form-group">
       <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange} required />
     </div>
     <div className="form-group">
       <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
     </div>
     <div className="form-group">
       <h4>From Date</h4>
       <input type="date" name="from" value={from} onChange={onChange} />
     </div>
      <div className="form-group">
       <p><input type="checkbox" name="current"  checked={current} value={current} onChange={()=>{
       setFormData({...formData,current:!current})}}/>{' '} Current Job</p>
     </div>
     <div className="form-group">
       <h4>To Date</h4>
       <input type="date" name="to" disabled={current} value={to} onChange={onChange} />
     </div>
     <div className="form-group">
       <textarea
         name="description"
         cols="30"
         rows="5"
         placeholder="Job Description"
         value={description}
         onChange={onChange}
       ></textarea>
     </div>
     <input type="submit" className="btn btn-primary my-1" />
     <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
   </form>
   </>
    )
}

addExperience.propTypes = {
  addExperience:PropTypes.func.isRequired
}

export default connect(null,{addExperience})(withRouter(AddExperience))
