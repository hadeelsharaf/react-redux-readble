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


export function voteComment ({ commentID, vote }) {
  return {
    type: VOTE_COMMENT,
    option: vote,
    id: commentID
  }
}

export function deleteComment ({ commentID }) {
  return {
    type: DELETE_COMMENT,
    commentID
  }
}

