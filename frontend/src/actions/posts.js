const CREATE_POST = 'CREATE_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'
const VOTE_POST = 'VOTE_POST'
const GET_POSTS = 'GET_POST'


export function getPosts (data) {
  return {
    type: GET_POSTS,
    data
  }
}

export function createPost (data) {
  return {
    type: CREATE_POST,
    data
  }
}

export function updatePost (data) {
  return {
    type: UPDATE_POST,
    data
  }
}


export function votePost (data) {
  return {
    type: VOTE_POST,
    data
  }
}

export function deletePost (data) {
  return {
    type: DELETE_POST,
    data
  }
}

