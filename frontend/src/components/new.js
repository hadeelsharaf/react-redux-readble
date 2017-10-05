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
    createNewPost
} from '../actions/posts'

import serializeForm from 'form-serialize'
import {
    getCategories
} from '../actions/categories'
import {
    newId
} from "../utils/helper";
import { Link } from 'react-router-dom'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class NewPost extends Component {

    state = {
        value: null,
        open: false
    };

    handleChange = (event, index, value) => this.setState({ 
        ...this.state,
        value
    });

    componentDidMount() {
        this.props.getCategories()
    }

    submitPost = (e) => {
        e.preventDefault()
        let data = serializeForm(e.target, {
            hash: true
        })
        console.log(data)
        let postData = {
            ...data,
            id: newId(),
            category: this.state.value,
            timestamp: Date.now()
        }
        this.props.send(postData).then(data => {
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
            const items = this.props.categories.map(category => {
                    return ( < MenuItem value = {
                            category.path
                        }
                        key = {
                            category.path
                        }
                        primaryText = {
                            category.name
                        }
                        />)
                    }) 
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
                    < form onSubmit = {
                        this.submitPost
                    } >
                    < TextField hintText = "Your name .. "
                    name = "author" />
                    < br / >
                    <  TextField hintText = "post title .. "
                    name = "title" />

                    < br / > {
                        this.props.categories && < SelectField
                        floatingLabelText = "category"
                        value = {
                            this.state.value
                        }
                        onChange = {
                            this.handleChange
                        } >
                        {
                            items
                        }

                        </SelectField>} 
                        < br / >
                        < TextField
                        hintText = "Your post .. "
                        name = "body"
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
                        </form> 
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
                    send: (postData) => dispatch(createNewPost(postData)),
                    getCategories: () => dispatch(getCategories()),
                }
            }

            function mapStateToProps({
                categories
            }) {
                return {
                    categories
                }
            }

            export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
