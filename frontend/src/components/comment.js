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
    upVote,
    downVote,
    editComment,
    deleteCommentById
} from '../actions/comments'
import { RIETextArea } from 'riek';



class Comment extends Component {


    upVoteClick = () => {
        this.props.upVote()
    }

    downVoteClick = () => {
        this.props.downVote()
    }

    deleteClick = () => {
        this.props.delete()
    }

    handleEdit = (data) => {
        this.props.edit(data)
    }

    render() {
        return ( <
            div >
            <
            Card >
            <
            CardHeader title = {
                this.props.comment.author
            }
            subtitle = {
                new Date(this.props.comment.timestamp).toISOString()
            }
            actAsExpander = {
                true
            }
            showExpandableButton = {
                true
            }
            /> <
            CardText expandable = {
                true
            } >
            <
            p > score: ({
                this.props.comment.voteScore
            }) < /p> 
            <RIETextArea
              value={
                    this.props.comment.body
                }
              change={this.handleEdit}
              propName="body"/>

            < /CardText> 
            < CardActions expandable = {
                true
            } >
            <
            FlatButton label = "upvote" primary={true}
              onClick={this.upVoteClick}/ >
            <
            FlatButton label="downvote" primary={true}
              onClick={this.downVoteClick}/ >

            <
            FlatButton label = "delete" secondary={true}
                onClick={this.deleteClick}
            / >
            <
            /CardActions> <
            /Card> <
            /div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        upVote: () => dispatch(upVote(ownProps.comment.id)),
        downVote: () => dispatch(downVote(ownProps.comment.id)),
        delete: () => dispatch(deleteCommentById(ownProps.comment.parentId,ownProps.comment.id)),
        edit: (data) => dispatch(editComment(ownProps.comment.id,data))
    }
}

function mapStateToProps({
    posts,
    categories,
    comments
}) {
    return {
        posts,
        categories,
        comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
