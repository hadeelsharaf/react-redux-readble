import React , { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import { getPostAllComments } from '../actions/posts'

class Comment extends Component {


  render() {
    return (
      <div>
        <Card >
            <CardHeader
              title={this.props.comment.author}
              subtitle= {this.props.comment.timestamp}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <p>score:({this.props.comment.voteScore})</p>
              <p>{this.props.comment.body}</p>
            </CardText>
            <CardActions expandable={true}>
              <FlatButton label="upvote" />
              <FlatButton label="downvote" />
              <FlatButton label="edit" />
              <FlatButton label="delete" />
            </CardActions>
        </Card>
     </div>
    )
  }
}


export default Comment
