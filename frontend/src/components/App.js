import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import PostsList from '../components/postslist'
import FullPost from "../components/expandedPost";
import CategoriesList from '../components/categories'
import { BrowserRouter as Router,Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


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
            <Link to='new'> new </Link>
            <PostsList/>
          </div>
        )}/>
        <Route exact path='/:category' component={PostsList}/>
        <Route path='/:category/:post_id' component={FullPost}/>
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
