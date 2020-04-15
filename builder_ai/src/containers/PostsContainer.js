/* @flow */
import Posts from '../components/Posts'
import { getPosts } from '../actions'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import type, { PostsState } from '../reducers'

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  pagination: state.pagination,
  ds: state.ds
})

const mapDispatchToProps = (dispatch) => ({
  getPosts: (page) => dispatch(getPosts(page))
})

const PostsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPosts(0)
    }
  })
)(Posts)

export default PostsContainer
