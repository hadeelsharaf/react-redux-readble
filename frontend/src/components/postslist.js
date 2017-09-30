import React, { Component } from 'react';
import Post from './post'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'

class PostsList extends Component {
	
	componentdidMount() {
    	// this.props.getCategories()
    	this.props.getPosts()
  	}

	render(){
		let category = null
		if(this.props.match && this.props.match.params.category)
		{
			category = this.props.match.params.category
		}
		let link = <Link to="/" />
		return(
			<MuiThemeProvider>
			<div className='posts-lists'>
			{category !==null && 
				<RaisedButton 
	            label="Home"
	            containerElement={ link } >
            </RaisedButton>
            }
            <br/>
			{this.props.posts.allPosts && this.props.posts.allPosts.map(post => {
				if(!category)
					return(<Post post={post} />)
				else if(category && post.category===category)
					return(<Post post={post} />)
				})
			}
			</div>
			</MuiThemeProvider>
		)
	}
}

function mapStateToProps ({ posts, categories, comments }) {
  return { posts, categories, comments }

}

export default connect(mapStateToProps
)(PostsList)
