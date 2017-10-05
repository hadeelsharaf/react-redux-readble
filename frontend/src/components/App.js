import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import PostsList from '../components/postslist'
import FullPost from "../components/expandedPost";
import NewPost from "../components/new";
import EditPost from "../components/editPost";

import CategoriesList from '../components/header'
import { BrowserRouter as Router,Route } from 'react-router-dom'



class App extends Component {

  componentDidMount() {
    this.props.getPosts()

  }

  render() {

    return (
      <Router>
        <div>
        <Route exact path='/' render={() => (
          <div>
            <CategoriesList />
            <PostsList/>
          </div>
        )}/>
        <Route exact path='/new' component={NewPost}/>
        <Route exact path='/:category/:post_id/edit' component={EditPost} />
        <Route exact path='/:category/:post_id' component={FullPost}/>
        <Route exact path='/:category' component={PostsList}/>
        </div>
      </Router>
     
      
    );
  }
}


function mapStateToProps ({ posts, categories, comments }) {
  return { posts, categories, comments }

}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getPosts: () => dispatch(getPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
