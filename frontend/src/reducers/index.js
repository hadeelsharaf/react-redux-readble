import sortBy from 'sort-by'
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
    GET_POST_COMMENTS,
    SORT_POSTS
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
                allPosts: state.allPosts.concat([action.data])
            }
        case UPDATE_POST:
        case VOTE_POST:
            return {...state,
                allPosts: update_state_posts(state,action)
            }
        case SORT_POSTS:
            let sorted= state.allPosts.sort(sortBy(action.sort_by))
            return {
                allPosts: sorted
            }
        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post.id !== action.data.id)
            }
        default:
            return state
    }
}

function update_state_comment(state,action){
  let parentId = action.postId
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

function post(state={},action){
    switch (action.type) {
        case GET_POST:
        case UPDATE_POST:
        case VOTE_POST:
            return action.data
        case DELETE_POST:
            return {}
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
