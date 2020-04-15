import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Posts from './src/containers/PostsContainer';
import store from './src/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Posts />
      </Provider>
    );
  }
}