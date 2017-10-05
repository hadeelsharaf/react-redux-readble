import { voteComment, deleteComment, createComment, updateComment } from "../apis/comments";

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'

export function getComments (comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}


export function addComment(comment) {
  return function (dispatch) {
    return createComment(comment)
      .then(result => {
        dispatch({type:CREATE_COMMENT, data: result, postId: result.parentId});
        return comment
      })
  }
}

export function editComment(id,comment) {
  return function (dispatch) {
    return updateComment(id,comment)
      .then(result => {
        dispatch({type:UPDATE_COMMENT, data: result, postId: result.parentId});
        return result
      })
  }
}


export function upVote(id) {
  return function (dispatch) {
    return voteComment(id, "upVote")
      .then(result => {
        dispatch({type:VOTE_COMMENT, data: result, postId: result.parentId});
        return result
      })
  }
}

export function downVote(id) {
  return function (dispatch) {
    return voteComment(id, "downVote")
      .then(result => {
        dispatch({type:VOTE_COMMENT, data: result, postId: result.parentId});
        return result
      })
  }
}


export function deleteCommentById(postId,id) {
  return function (dispatch) {
    return deleteComment(id)
      .then(result => {
        dispatch({type:DELETE_COMMENT, id, postId});
        return result
      })
  }
}


