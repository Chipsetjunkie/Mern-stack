import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {deleteComment} from '../Actions/post';


const CommentItem = ({postId,auth,deleteComment,
comment:{
  _id,text,name,avatar,user,date
}}) => {
  return(
    <>
    <div className="comments">
       <div className="post bg-white p-1 my-1">
         <div>
           <Link to={`/profile/${user}`}>
             <img
               className="round-img"
               src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
               alt=""
             />
             <h4>{name}</h4>
           </Link>
         </div>
         <div>
           <p className="my-1">
            {text}
           </p>
            <p className="post-date">
               <Moment format='YYYY/MM/DD'>{date}</Moment>
           </p>
           {!auth.loading && user === auth.user.data._id && (
             <button onClick={e =>deleteComment(postId,_id)}
             type="button"
             className='btn btn-danger'>Delete</button>
           )}
         </div>
       </div>
       </div>
    </>
  )
}
CommentItem.propTypes = {
  postId:PropTypes.string.isRequired,
  comment:PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  deleteComment:PropTypes.func.isRequired
};


const mapStateToProps = state =>({
  auth:state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem);
