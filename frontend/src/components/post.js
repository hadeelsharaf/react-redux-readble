import React, { Component } from 'react';
import logo from '../css/logo.svg';
import '../css/App.css';

class Post extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Post Title</h2>
        </div>
        <p className="App-intro">
          By poster at date.
        </p>
        
      </div>
    );
  }
}

export default Post;
