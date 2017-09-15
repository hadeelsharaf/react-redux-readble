const CREATE_COMMENT = 'CREATE_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const VOTE_COMMENT = 'VOTE_COMMENT'

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
    option: vote
    id: commentID
  }
}

export function deleteComment ({ commentID }) {
  return {
    type: DELETE_COMMENT,
    commentID
  }
}

