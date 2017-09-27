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
export function createComment (comment) {
  return {
    type: CREATE_COMMENT,
    ...comment
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
    return votePost(id, "upVote")
      .then(result => {
        dispatch({type:VOTE_COMMENT, data: result, postId: result.parentID});
        return result
      })
  }
}

export function downVote(id) {
  return function (dispatch) {
    return votePost(id, "downVote")
      .then(result => {
        dispatch({type:VOTE_COMMENT, data: result, postId: result.parentID});
        return result
      })
  }
}


export function deleteComment ({ commentID }) {
  return {
    type: DELETE_COMMENT,
    commentID
  }
}

