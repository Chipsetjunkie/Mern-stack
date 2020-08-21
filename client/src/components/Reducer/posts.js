import {GET_POST,ADD_COMMENT,REMOVE_COMMENT,GET_POSTS,ADD_POST,POST_ERROR,DELETE_POST,UPDATE_LIKES} from '../Actions/types';


const initialState = {
  posts:[],
  post:null,
  loading:true,
  error:{}
}


export default function(state=initialState,action){
  const {type,payload}=action;

  switch (type) {
    case GET_POST:
    return{
      ...state,
      post:payload,
      loading:false
    }
    case GET_POSTS:
    return{
      ...state,
      posts:payload,
      loading:false
    }

    case ADD_POST:
    return{
      ...state,
      posts:[payload,...state.posts],
      loading:false
    }

    case POST_ERROR:
    return{
      ...state,
      error:payload,
      loading:false
    }
    case DELETE_POST:
        return{
          ...state,
          posts:state.posts.filter(post=>post._id!==payload),
          loading:false
        }

    case ADD_COMMENT:
      return{
      ...state.post,
      comments:payload,
    loading:false}

    case REMOVE_COMMENT:
        return{
          ...state,
          post:{
            ...state.post,
            comments:state.post.comments.filter(
              comment=>comment._id !== payload),
              loading:false
          }
        }

    case UPDATE_LIKES:
     return{
       ...state,
       posts:state.posts.map(post=>post._id===payload.postid?{...post,likes:payload.likes}:post),
       loading:false
     }
    default:
    return state

  }
}
