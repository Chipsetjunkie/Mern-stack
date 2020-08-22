import {GET_POST,ADD_COMMENT,REMOVE_COMMENT,GET_POSTS,POST_ERROR,ADD_POST,UPDATE_LIKES,DELETE_POST} from '../Actions/types';
import axios from 'axios';
import {setAlert} from './index';

export const getPosts = () =>async dispatch =>{

  try{
    const res =  await axios.get('/api/posts');
    console.log(res.data)
    dispatch({
      type:GET_POSTS,
      payload:res.data
    });
  }catch(err){
    console.log('post err',err)
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
  })
  }
}

export const getPost = id =>async dispatch =>{

  try{
    const res =  await axios.get(`/api/posts/post/${id}`);
    dispatch({
      type:GET_POST,
      payload:res.data
    });
  }catch(err){
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
  })
  }
}

export const addLike = postid =>async dispatch =>{
  try{
    const res =  await axios.put(`/api/posts/like/${postid}`);
    dispatch({
      type:UPDATE_LIKES,
      payload:{postid, likes:res.data}
    });
  }catch(err){
    console.log('post err',err)
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
  })
  }
}

export const removeLike = postid =>async dispatch =>{
  try{
    const res =  await axios.delete(`/api/posts/unlike/${postid}`);
    dispatch({
      type:UPDATE_LIKES,
      payload:{postid, likes:res.data}
    });
  }catch(err){
    console.log('post err',err)
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
  })
  }
}

export const deletePost = postid =>async dispatch =>{
  try{
    await axios.delete(`/api/posts/delete/${postid}`);
    dispatch({
      type:DELETE_POST,
      payload:postid
    });
    dispatch(setAlert('Post Removed','success'))
  }catch(err){
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.data.msg,status:err.response.status}
  })
  }
}


export const addPost = formData =>async dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  try{
    const res =  await axios.post('/api/posts',formData,config);
    dispatch({
      type:ADD_POST,
      payload:res.data
    });
    dispatch(setAlert('Post created','success'))
  }catch(err){
    dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.data.msg,status:err.response.status}
  })
  }
}

export const addComment = (post_id,formData) =>async dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  try{
    const res =  await axios.put(`/api/posts/comment/${post_id}`,formData,config);
    dispatch({
      type:ADD_COMMENT,
      payload:res.data
    });
    dispatch(setAlert('CommentAdded','success'))
  }catch(err){
    console.log(err)
    /*dispatch({
      type:POST_ERROR,
      payload:{msg:err.response.data.msg,status:err.response.status}
  })*/
  }
}

export const deleteComment = (post_id,com_id) =>async dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  try{
    const res =  await axios.delete(`/api/posts/comment/delete/${post_id}/${com_id}`);
    dispatch({
      type:REMOVE_COMMENT,
      payload:com_id
    });
    dispatch(setAlert('CommentRemoved','success'))
  }catch(err){
    console.log(err)
  }
}
