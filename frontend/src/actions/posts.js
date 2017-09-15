const CREATE_POST = 'CREATE_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'
const VOTE_POST = 'VOTE_POST'

export function createPost (post) {
  return {
    type: CREATE_POST,
    ...post
  }
}

export function updatePost ({ postID, title, body }) {
  return {
    type: UPDATE_POST,
    id:postID,
    title,
    body
  }
}


export function votePost ({ postID, vote }) {
  return {
    type: VOTE_POST,
    option: vote,
    id:postID
  }
}

export function deletePost ({ postID }) {
  return {
    type: DELETE_POST,
    postID
  }
}

