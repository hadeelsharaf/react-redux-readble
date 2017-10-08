import React, {
    Component
} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
    connect
} from 'react-redux'
import {
    getPostAllComments,
    upVote,
    downVote,
    deletePostById
} from '../actions/posts'
import {addComment} from "../actions/comments";

import Comment from './comment'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import serializeForm from 'form-serialize'
import {newId} from "../utils/helper";
import { Link } from 'react-router-dom';

const customContentStyle = {
  hieght: '80%',
  maxHeight : '95% !important'
};

class Post extends Component {

    componentWillMount() {
        this.props.getPostAllComments()
        
    }

    state = {
        modalIsOpen : false
    }

    closeModal = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            modalIsOpen: false
        });
    }

    submitComment = (e) =>{
        e.preventDefault()
        let data = serializeForm(e.target, { hash: true })

        let commentData = {
            ...data,
            id:newId(),
            parentId:this.props.post.id,
            delete:false,
            timestamp:Date.now()
        }
        this.props.comment(commentData).then(() => 
            this.setState({
            modalIsOpen: false
        })
        )
    }


    upVoteClick = () => {
      this.props.upVote()
    }

    downVoteClick = () => {
      this.props.downVote()
    }

    deleteClick = () =>{
        this.props.delete()
    }
    showCommentModal = () => {
        this.setState({...this.state,
            modalIsOpen: true})
    }

    render() {
        const modalActions = [
          <FlatButton
            label="Cancel"
            onClick={this.closeModal}
          />,
          <FlatButton
            label="Submit"
            type="submit"
            primary={true}
          />,
        ];
        let postComments = this.props.comments[this.props.post.id]
        let editLink = <Link to={`${this.props.post.category}/${this.props.post.id}/edit`}/>
        let moreLink = <Link to={`${this.props.post.category}/${this.props.post.id}`}/>
        return ( 
          <div >
            <Card>
            <CardHeader title = { this.props.post.title }
            subtitle = { 
                this.props.post.author +' - '+ new Date(this.props.post.timestamp).toISOString()
            }
            actAsExpander = { true }
            showExpandableButton = { true }
            /> 
            < CardText expandable = { true } >
            < p > In category: { this.props.post.category } - 
            comments: ({ postComments && postComments.length }) < /p> 
            <p>score:({this.props.post.voteScore})</p>
            <p > { this.props.post.body }
            < /p>
                < FlatButton label = "more .." containerElement={ moreLink }/ >
                < FlatButton label = "edit" containerElement={ editLink }/ >
              {
                postComments && postComments.map(postcomment =>
                    <
                    Comment comment = { postcomment }
                    key={postcomment.id}
                    />
                )
            } </CardText>
            < CardActions expandable = { true } >
            < FlatButton label = "upvote" primary={true}
              onClick={this.upVoteClick} / >
            < FlatButton label = "downvote" primary={true}
              onClick={this.downVoteClick} / >
            < FlatButton label = "comment" 
              onClick={this.showCommentModal} / >

            < FlatButton label = "delete" onClick= {this.deleteClick}
              secondary={true}/ >
            < /CardActions> 
            </Card> 
            <Dialog
              title="Add Comment"
              open={this.state.modalIsOpen}
              contentStyle={customContentStyle}

            >
              <form onSubmit={this.submitComment}>
                <TextField
                  hintText="Your name .. "
                  name = "author"
                />
                <br/>
                <TextField
                  hintText="Your Comment .. "
                  name = "body"
                  multiLine={true}
                  rows={2}
                  rowsMax={4}
                />
                <div>
                {modalActions}
                </div>
              </form>
            </Dialog>
            </div>


        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPostAllComments: () => dispatch(getPostAllComments(ownProps.post.id)),
        upVote: () => dispatch(upVote(ownProps.post.id)),
        downVote: () => dispatch(downVote(ownProps.post.id)),
        comment: (commentData) =>  dispatch(addComment(commentData)),
        delete: () => dispatch(deletePostById(ownProps.post.id))
    }
}

function mapStateToProps({
    posts,
    comments
}) {
    return {
        posts,
        comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
