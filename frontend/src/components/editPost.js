import React, {
    Component
} from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText
} from 'material-ui/Card';
import {
    connect
} from 'react-redux'
import {
    getPostById,
    editPost
} from '../actions/posts'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import serializeForm from 'form-serialize'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class NewPost extends Component {

    state = {
        value: null,
        open: false
    };

    handleChange = (event, index, value) => this.setState({ 
        ...this.state,
        value
    });

    componentWillMount() {
        this.props.getPostById(this.props.match.params.post_id)
    }


    submitPost = (e) => {
        e.preventDefault()
        let postData = serializeForm(e.target, {
            hash: true
        })
        console.log(postData)
        this.props.send(this.props.post.id,postData).then(data => {
            this.setState({
              ...this.state,
              open: true,
            });
        })
    }


    handleRequestClose = () => {
        this.setState({
            ...this.state,
            open: false,
        });
      };

    render() {
        let link = <Link to="/" />
        return ( < MuiThemeProvider >
            < div >
            <RaisedButton 
                        label="Home"
                        containerElement={ link } >
                    </RaisedButton>
                    <br />
            < Card >
            < CardHeader title = 'Add New Post' />
            < CardText >
            {this.props.post.title && < form onSubmit = {
                this.submitPost
            } >
            < TextField hintText = "Your name .. "
            defaultValue={this.props.post.author}
            name = "author" />
            < br / >
            <  TextField
            defaultValue={this.props.post.title}
            name = "title" />

            
            < br / >
            < TextField
            hintText = "Your post .. "
            name = "body"
            defaultValue={this.props.post.body}
            multiLine = {
                true
            }
            rows = {
                2
            }
            rowsMax = {
                4
            }
            /> 
            < div >
            < CardActions expandable = {
                true
            } >
            < FlatButton label = "submit"
            primary = {
                true
            }
            type = "submit" / >
            < FlatButton label = "reset"
            type = "reset"
            secondary = {
                true
            }
            / > 
            </CardActions>  
            </div> 
            </form> }
            </CardText>

            </Card>
            <Snackbar
          open={this.state.open}
          message="Post Saved"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
            </div>
            </MuiThemeProvider>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        send: (id,postData) => dispatch(editPost(id,postData)),
        getPostById: (id) => dispatch(getPostById(id)),
    }
}

function mapStateToProps({
    post
}) {
    return {
        post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
