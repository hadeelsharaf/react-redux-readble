import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import PostsList from '../components/postslist'
import CategoriesList from '../components/categories'
import { BrowserRouter as Router,Route } from 'react-router-dom'

class App extends Component {

  state = {
    loadedPosts:false
  }

  componentDidMount() {
    // this.props.getCategories()
    this.props.getPosts().then(
      posts => this.setState({loadedPosts:true})
      )

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
        <Route path='/:category' component={PostsList}/>
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
    //getCategories : () => dispatch(getCategories()),
    getPosts: () => dispatch(getPosts()),
    //changeSort: (sortBy) => dispatch({type:'SORT_BY_SOMETHING', payload: sortBy})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
