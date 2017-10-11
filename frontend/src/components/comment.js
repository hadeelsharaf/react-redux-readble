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
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import serializeForm from 'form-serialize'
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


const customContentStyle = {
  hieght: '80%',
  maxHeight : '95% !important'
};


class Comment extends Component {

    state = {
        modalIsOpen: false
    }


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

    showModal = () => {
        this.setState({
            modalIsOpen: true 
        });
    }

    submitComment = (e) =>{
        e.preventDefault()
        let data = serializeForm(e.target, { hash: true })

        let commentData = {
            ...data,
            parentId:this.props.comment.parentId,
        }
        this.props.edit(commentData).then(() => 
            this.setState({
            modalIsOpen: false
        })
        )
    }

    render() {
        const modalActions = [
          <FlatButton
            label="Cancel"
            onClick={this.closeModal}
            key="CancelEdit"
          />,
          <FlatButton
            label="Submit"
            type="submit"
            primary={true}
            key="submitEdit"
          />,
        ];
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
            FlatButton label="edit" 
              onClick={this.showModal}/ >

            <
            FlatButton label = "delete" secondary={true}
                onClick={this.deleteClick}
            / >
            <
            /CardActions> <
            /Card> 
            <Dialog
              title="edit Comment"
              open={this.state.modalIsOpen}
              contentStyle={customContentStyle}

            >
              <form onSubmit={this.submitComment}>
                <TextField
                  hintText="Your Comment .. "
                  name = "body"
                  multiLine={true}
                  rows={2}
                  rowsMax={4}
                  defaultValue={this.props.comment.body}
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
