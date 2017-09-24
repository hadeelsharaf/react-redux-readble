import React, { Component } from 'react';
import Post from './post'
import { getAllPosts } from '../apis/posts'


class Posts extends Component {
	componentDidMount() {
    getAllPosts().then((posts) => {
      this.setState({ posts })
    	})
	}

	return(
		<div class='posts-lists'>
		{this.props.posts.map(post => (
			<Post post=post/>))
		</div>
		)
}
