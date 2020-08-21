import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../layout/spinner";
import {getPost} from "../Actions/post";
import PostItem from "../Posts/PostItem";
import {Link} from "react-router-dom";

const Post = ({getPost,post:{post,loading}, match}) => {
  useEffect(()=>{
    getPost(match.params.id)
  },[getPost,match.params.id])

  return loading || post ===null ?<Spinner/>:(<>
    <Link to ="/posts">Back</Link>
    <PostItem post={post.post_} showActions={false}/>
    </>)


}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  post:state.posts
})

export default connect(mapStateToProps,{getPost})(Post);
