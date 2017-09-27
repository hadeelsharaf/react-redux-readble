import { getAllPosts, getPost, getPostComments, votePost } from '../apis/posts'

export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const GET_POSTS = 'GET_POSTS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

export function getPostById(id) {
  return function (dispatch) {
    return getPost(id)
      .then(result => {
        dispatch({type:GET_POST, data: result});
        return result
      })
  }
}

export function getPostAllComments(id) {
  return function (dispatch) {
    return getPostComments(id)
      .then(result => {
        dispatch({type:GET_POST_COMMENTS, data: result, id});
        return result
      })
  }
}


export function getPosts() {
  return function (dispatch) {
    return getAllPosts()
      .then(result => {
        dispatch({type:GET_POSTS, data: result});
        return result
      })
  }
}

export function upVote(postId) {
  return function (dispatch) {
    return votePost(postId, "upVote")
      .then(result => {
        dispatch({type:VOTE_POST, data: result});
        return result
      })
  }
}

export function downVote(postId) {
  return function (dispatch) {
    return votePost(postId, "downVote")
      .then(result => {
        dispatch({type:VOTE_POST, data: result});
        return result
      })
  }
}

// export function votePost (data) {
//   return {
//     type: VOTE_POST,
//     data
//   }
// }


export function createPost (data) {
  return function (dispatch) {
    return createPost(data)
      .then(result => {
        dispatch({type:CREATE_POST, data: result});
        return result
      })
  }
}

// export function updatePost (data) {
//   return {
//     type: UPDATE_POST,
//     data
//   }
// }




// export function deletePost (data) {
//   return {
//     type: DELETE_POST,
//     data
//   }
// }

