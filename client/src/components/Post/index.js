import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../layout/spinner";
import {getPost} from "../Actions/post";
import PostItem from "../Posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from './commentform';
import CommentItem from './commentitem';

const Post = ({getPost,post:{post,loading}, match}) => {
  useEffect(()=>{
    getPost(match.params.id)
  },[getPost,match.params.id])

  return loading || post ===null?
    <Spinner/>:
    (<>
    <Link to ="/posts">Back</Link>
    {console.log(post)}
    <PostItem post={post.post_} showActions={false}/>
    <CommentForm postId={post.post_._id}/>
    <div className="comments">
    {post.post_.comments.map(comment=>(
      <CommentItem key={comment._id} comment={comment} postId={post.post_._id}/>
    ))}
    </div>
    </>
  )


}

Post.propTypes = {
  getPost:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  post:state.posts
})

export default connect(mapStateToProps,{getPost})(Post);
