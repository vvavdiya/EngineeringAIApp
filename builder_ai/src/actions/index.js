/* @flow */
import API from '../api/postsAPI'

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'

export const getPostsRequest = (page) => {
  return {
    type: GET_POSTS_REQUEST,
    page: page
  }
}

export const getPostsSuccess = (response) => {
  const { records, pagination } = response
  return {
    type: GET_POSTS_SUCCESS,
    posts: records,
    pagination: pagination
  }
}

export const getPostsFailure = (error) => {
  return {
    type: GET_POSTS_FAILURE,
    error: error
  }
}

export const getPosts = (page) => {
  return (dispatch) => {
    dispatch(getPostsRequest(page))

    API.getPosts(page)
      .then((result) => dispatch(getPostsSuccess(result)))
      .catch((error) => dispatch(getPostsFailure(error)))
  }
}
