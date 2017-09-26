import React , { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { getPostAllComments } from '../actions/posts'

class Post extends Component {


    componentWillMount() {
        this.props.getPostAllComments()
    }

  render() {
    return (
      <div>
        <Card >
            <CardHeader
              title={this.props.post.title}
              subtitle={this.props.post.author}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>In category: {this.props.post.category} - comments:()</p>
              <p>{this.props.post.body}</p>
            </CardText>
            <CardActions expandable={true}>
              <FlatButton label="upvote" />
              <FlatButton label="downvote" />
              <FlatButton label="comment" />
              <FlatButton label="edit" />
              <FlatButton label="delete" />
            </CardActions>
        </Card>
     </div>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getPostAllComments: () => dispatch(getPostAllComments(ownProps.post.id)),
  }
}

function mapStateToProps ({ posts, categories, comments }) {
  return { posts, categories, comments }
}

export default connect(mapStateToProps, mapDispatchToProps
)(Post)
