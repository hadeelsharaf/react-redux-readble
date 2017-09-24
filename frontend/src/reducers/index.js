import { combineReducers } from 'redux'

import {
  CREATE_POST, DELETE_POST, UPDATE_POST,
  VOTE_POST, GET_POSTS
} from '../actions/posts'


import {
  CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT,
  VOTE_COMMENT
} from '../actions/comments'


// posts state
function posts (state = {}, action) {
  let updated_post = {
        ...state,
        [posts.id]: action.data
      }
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.data}
    case CREATE_POST :
    case UPDATE_POST :
    case VOTE_POST :
      return updated_post
    case DELETE_POST :
      return {
        ...state,
        [posts.id]: null
      }
    default :
      return state
  }
}


// comments state
function comments (state = {}, action) {
  let updated_comment = {
        ...state,
        [comments.id]: action.data
      }
  switch (action.type) {
    case CREATE_COMMENT :
    case UPDATE_COMMENT :
    case VOTE_COMMENT :
      return updated_comment
    case DELETE_COMMENT :
      return {
        ...state,
        [comments.id]: null
      }
    default :
      return state
  }
}



export default combineReducers({
  posts,
  comments,
})
