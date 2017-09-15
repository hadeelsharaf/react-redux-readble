import { combineReducers } from 'redux'

import {
  CREATE_POST, DELETE_POST, UPDATE_POST,
  VOTE_POST
} from '../actions/posts'


import {
  CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT,
  VOTE_COMMENT
} from '../actions/comments'

function commnet (state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT :
      const { comment } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}


function calendar (state = {}, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  food,
  calendar,
})