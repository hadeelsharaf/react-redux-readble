import {
    combineReducers
} from 'redux'

import {
    CREATE_POST,
    DELETE_POST,
    UPDATE_POST,
    VOTE_POST,
    GET_POST,
    GET_POSTS,
    GET_POST_COMMENTS
} from '../actions/posts'


import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    VOTE_COMMENT
} from '../actions/comments'

import {GET_CATEGORIES, GET_CATEGORY_POSTS} from "../actions/categories";

const initialState = {
    allPosts: []
}

function update_state_posts(state,action){
      let updated_posts = state.allPosts.map((item, index) => {
        if (item.id === action.data.id) {
            item = action.data;
        }
        return item;
    });
    return updated_posts;
}

function post(state={},action){
    switch (action.type) {
        case GET_POST:
            return action.data
        default:
            return state
    }
}

// posts state
function posts(state = initialState, action) {


    switch (action.type) {
        case GET_POSTS:
            return {...state,
                allPosts: action.data
            }
        case GET_CATEGORY_POSTS:
            return {...state,
                categoryPosts: action.data
            }
        case CREATE_POST:
            return {...state,
                allPosts: state.allposts.concat([action.data])
            }
        case UPDATE_POST:
        case VOTE_POST:
            return {...state,
                allPosts: update_state_posts(state,action)
            }
        case DELETE_POST:
            return {
                ...state,
                [posts.allPosts.id]: null
            }
        default:
            return state
    }
}

function update_state_comment(state,action){
  console.log(state)
  let parentId = action.postId
  console.log(action)
  let updated_comments = state[parentId].map((item, index) => {
      if (item.id === action.data.id) {
          item = action.data;
      }
      return item;
  });
  return updated_comments
}


// comments state
function comments(state = {}, action) {
    
    switch (action.type) {
        case GET_POST_COMMENTS:
            return {...state,
                [action.id]: action.data
            }
        case CREATE_COMMENT:
          return {
                ...state,
                [action.postId]: state[action.postId].concat([action.data])
            }
        case UPDATE_COMMENT:
        case VOTE_COMMENT:
            return {
                ...state,
                [action.postId]: update_state_comment(state,action)
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.postId]: state[action.postId].filter(comment => comment.id !== action.id)
            }
        default:
            return state
    }
}

function categories (state = [], action){
  switch (action.type) {
    case GET_CATEGORIES:
        return action.data
    default:
      return state
    }
}

export default combineReducers({
    posts,
    post,
    comments,
    categories
})
