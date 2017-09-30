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
    deleteCommentById
} from '../actions/comments'



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
            }) < /p> <
            p > {
                this.props.comment.body
            } < /p> <
            /CardText> <
            CardActions expandable = {
                true
            } >
            <
            FlatButton label = "upvote" primary={true}
              onClick={this.upVoteClick}/ >
            <
            FlatButton label="downvote" primary={true}
              onClick={this.downVoteClick}/ >
            <
            FlatButton label = "edit" / >
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
