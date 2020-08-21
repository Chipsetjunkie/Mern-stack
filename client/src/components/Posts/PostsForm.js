import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../Actions/post';

const PostForm = ({addPost}) => {
    const[text,setText] = useState('')

    const submitHandler = e =>{
      e.preventDefault();
      addPost({text})
      setText('')
    }

    return(
      <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={submitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e =>setText(e.target.value)}
            placeholder="Create a post"
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      </div>
    )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null,{addPost})(PostForm);
