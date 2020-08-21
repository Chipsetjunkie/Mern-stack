import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from './PostItem';
import {getPosts} from '../Actions/post';
import PostForm from './PostsForm';

const Posts = ({getPosts,post:{posts,loading}}) =>{
  useEffect(()=>{
      getPosts()
  },[getPosts])
  return(
    loading ? <Spinner/> :
      <>
      <h1 className="large text=-primary">Post</h1>
      <p className="load">
      <i className="fas fa-user"></i> Welcome to the community</p>
      <PostForm/>
      {posts.map(post =>(
        <PostItem key = {post._id} post={post}/>
      ))}
      </>
    )

}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  post:state.posts
})

export default connect(mapStateToProps,{getPosts})(Posts);
