import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import PostsList from '../components/postslist'

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
      <MuiThemeProvider>
         <PostsList/>
      </MuiThemeProvider>
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
