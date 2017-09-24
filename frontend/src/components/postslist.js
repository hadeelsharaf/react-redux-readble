import React, { Component } from 'react';
import Post from './post'

class PostsList extends Component {
	render(){
		return(
			<div className='posts-lists'>
			{this.props.posts ? this.props.posts.map(post => (
				<Post post={post.id} />
				)):<div>Loading posts...</div>
			}
			</div>
		)
	}
}




export default PostsList
