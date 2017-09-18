const CREATE_POST = 'CREATE_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'
const VOTE_POST = 'VOTE_POST'
const GET_POSTS = 'GET_POST'


export function getPosts (posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function createPost (post) {
  return {
    type: CREATE_POST,
    post
  }
}

export function updatePost ({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  }
}


export function votePost ({ id, vote }) {
  return {
    type: VOTE_POST,
    option: vote,
    id
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id
  }
}

