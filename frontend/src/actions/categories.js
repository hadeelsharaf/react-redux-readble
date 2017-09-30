import { getAllCategories, getCategoryPosts } from '../apis/categories'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'

export function getCategories() {
  return function (dispatch) {
    return getAllCategories()
      .then(result => {
        dispatch({type:GET_CATEGORIES, data: result});
        return result
      })
  }
}


export function getCategoryAllPosts(category) {
  return function (dispatch) {
    return getCategoryPosts(category)
      .then(result => {
        dispatch({type:GET_CATEGORY_POSTS, data: result});
        return result
      })
  }
}
