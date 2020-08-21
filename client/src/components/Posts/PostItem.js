import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import{connect} from 'react-redux';
import Moment from 'react-moment';
import {addLike, removeLike, deletePost} from '../Actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post:{
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,date
  },
  showActions
}) => {
  console.log(name)
  return(
  <>
   <div className="posts">
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
            <Moment format="MM/DD/YY">{date}</Moment>
         </p>
         {showActions&&<>
           <button onClick={()=>addLike(_id)} type="button" className="btn btn-light">
             <i className="fas fa-thumbs-up"></i>
             <span>{likes.length>0?likes.length: '' }</span>{' '}Likes
           </button>
           <button onClick={()=>removeLike(_id)} type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
                unlike
              </button>
              <Link to={`/post/${_id}`} className="btn btn-primary">
             Discussion  {comments.length >0 && <span className='comment-count'>{comments.length}</span>
           }</Link>
           {!auth.loading && user === auth.user.data._id &&(
             <button
             type="button"
             className="btn btn-danger"
             onClick={()=>deletePost(_id)}
           >Delete
             <i className="fas fa-times"></i>
           </button>
           )}

           </>}

       </div>
     </div>
   </div>
   </>
 )
}

PostItem.defaultProps={
  showActions:true

}


PostItem.propTypes = {
  auth:PropTypes.object.isRequired,
  post:PropTypes.object.isRequired,
  addLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
  auth:state.auth
})

export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem);
