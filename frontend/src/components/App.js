import React, { Component } from 'react';
import logo from '../css/logo.svg';
import '../css/App.css';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import PostsList from '../components/postslist'

class App extends Component {

  state = {
    loadingPosts:true
  }

  componentDidMount() {
    // this.props.getCategories()
    this.props.getPosts().then(
      posts => this.setState({posts})
      )

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React-Redux</h2>
        </div>
        <p className="App-intro">
          A content and comment web app.
        </p>
        <PostsList/>
        <div className="Post">
          fggsfsds
        </div>
        <div className="Comment">
          fggsfsds
        </div>

      </div>
    );
  }
}

//export default App;
function mapStateToProps ({ posts, categories, comments }) {
  //normalize categoties if needed
  return { posts, categories, comments }

}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    //getCategories : () => dispatch(getCategories()),
    getPosts: () => dispatch(getPosts()),
    //changeSort: (sortBy) => dispatch({type:'SORT_BY_SOMETHING', payload: sortBy})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
