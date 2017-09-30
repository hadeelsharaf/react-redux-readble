import { voteComment, deleteComment, createComment } from "../apis/comments";

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
// export function createComment (comment) {
//   return {
//     type: CREATE_COMMENT,
//     ...comment
//   }
// }

export function addComment(comment) {
  return function (dispatch) {
    return createComment(comment)
      .then(result => {
        dispatch({type:CREATE_COMMENT, data: result, postId: result.parentId});
        return comment
      })
  }
}


export function updateComment ({ title, body }) {
  return {
    type: UPDATE_COMMENT,
    title,
    body
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


