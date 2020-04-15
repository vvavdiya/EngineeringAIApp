/* @flow */

import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE
} from '../actions'


const initalState = {
  posts: [],
  pagination: {
    page: 0
  },
  ds: []
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: true
        }
      }
    case GET_POSTS_SUCCESS:
      const { posts = [] } = action
      return {
        ...state,
        posts: [...state.posts, ...posts],
        pagination: {
          ...action.pagination,
          loading: false
        }
      }
    case GET_POSTS_FAILURE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: false
        }
      }
    default:
      return state
  }

}

export default reducer
