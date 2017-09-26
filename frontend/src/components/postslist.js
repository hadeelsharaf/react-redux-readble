import React, { Component } from 'react';
import Post from './post'
import { connect } from 'react-redux'

class PostsList extends Component {
	
	componentdidMount() {
    	// this.props.getCategories()
    	this.props.getPosts()
  	}

	render(){
		return(
			<div className='posts-lists'>
			{this.props.posts.allPosts && this.props.posts.allPosts.map(post => (
				<Post post={post} />
				))
			}
			</div>
		)
	}
}

function mapStateToProps ({ posts, categories, comments }) {
  return { posts, categories, comments }

}

export default connect(mapStateToProps
)(PostsList)
