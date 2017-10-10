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
    getPostById,
    deletePostById
} from '../actions/posts'
import {addComment} from "../actions/comments";

import Comment from './comment'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import serializeForm from 'form-serialize'
import {newId} from "../utils/helper";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router-dom';


const customContentStyle = {
  hieght: '80%',
  maxHeight : '95% !important'
};



class FullPost extends Component {

    componentDidMount() {
        if (this.props.match && this.props.match.params.post_id)
            this.props.getPostById(this.props.match.params.post_id).then(
                data =>{
                    this.props.getPostAllComments(data.id)
                })
    }
    
    state = {
        modalIsOpen : false,
        openSnack: false
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
      this.props.upVote(this.props.post.id)
    }

    downVoteClick = () => {
      this.props.downVote(this.props.post.id)
    }

    deleteClick = () =>{
        this.props.delete(this.props.post.id).then(
            ()=>{
                this.setState({...this.state,
                    openSnack: true
                })
            })
    }

    showCommentModal = () => {
        this.setState({...this.state,
            modalIsOpen: true})
    }

    handleRequestClose = () => {
        this.setState({
            ...this.state,
            openSnack: false,
        });
      };
    
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
        let link = <Link to="/" />
        let postComments =this.props.post.id !== undefined ?this.props.comments[this.props.post.id]:[]
        let editLink = <Link to={`/${this.props.post.category}/${this.props.post.id}/edit`}/>
        let noPostDom = <div> Post does not exist</div>
        let postDom = (          
          <div>
            <Card>
            <CardHeader title = { this.props.post.title }
            subtitle = { 
                this.props.post.author +' - '+ this.props.post.timestamp
            }
            /> 
            < CardText >
            < p > In category: { this.props.post.category } - 
            comments: ({ postComments && postComments.length }) < /p> 
            <p>score:({this.props.post.voteScore})</p>
            <p > {
                this.props.post.body
            }
            < /p>
            < FlatButton label = "edit" containerElement={ editLink }/ >
             {
                postComments && postComments.map(postcomment =>
                    <
                    Comment comment = {
                        postcomment
                    }
                    />
                )
            } </CardText>
            < CardActions expandable = { true && !this.props.match} >
            < FlatButton label = "upvote" primary={true}
              onClick={this.upVoteClick} / >
            < FlatButton label = "downvote" primary={true}
              onClick={this.downVoteClick} / >
            < FlatButton label = "comment" 
              onClick={this.showCommentModal} / >
            < FlatButton label = "delete" secondary={true}
              onClick={this.deleteClick}/ >
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
            <Snackbar
          open={this.state.openSnack}
          message="Post Removed return to Home"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />        
        </div>
        )
        return(<MuiThemeProvider>
        <div>
        <RaisedButton 
            label="Home"
            containerElement={ link } >
        </RaisedButton>
        <br />
         {this.props.post.id !== undefined? postDom: noPostDom}
         </div>
         </MuiThemeProvider> )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostAllComments: (id) => dispatch(getPostAllComments(id)),
        upVote: (id) => dispatch(upVote(id)),
        downVote: (id) => dispatch(downVote(id)),
        comment: (commentData) =>  dispatch(addComment(commentData)),
        getPostById: (id) => dispatch(getPostById(id)),
        delete: (id) => dispatch(deletePostById(id))
        
    }
}

function mapStateToProps({
    posts,
    post,
    comments
}) {
    return {
        posts,
        post,
        comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost)
