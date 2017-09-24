import React, { Component } from 'react';
import Post from './post'

class PostsList extends Component {
	render(){
		return(
			<div class='posts-lists'>
			<Post post={{}} />
			</div>
		)
	}
}
/*
{this.props.posts.map(post => (
				<Post post={post.id} />
				))
			}
*/
export default PostsList
