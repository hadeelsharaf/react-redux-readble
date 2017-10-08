import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getCategories } from '../actions/categories';
import { sortPosts } from '../actions/posts';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

class CategoriesList extends Component {

  state = {
    value: null
  }


  componentDidMount() {
    this.props.getCategories()
  }

  handleSortChange = (event, index, value) => {
    this.setState({value});
    this.props.sortPosts(value)
  }

  render() {
    let sortItems = [<MenuItem value = 'category'
                        primaryText = 'category'/>,
                     <MenuItem value = 'timestamp'
                        primaryText = 'date'/>,
                      <MenuItem value = 'voteScore'
                        primaryText = 'score'/>,
                      <MenuItem value = 'title'
                        primaryText = 'title'/>,
                    ]
    let newLink =<Link to='new'> new </Link>
    return (
      <MuiThemeProvider>
      <div>
          {this.props.categories && this.props.categories.map(category => {
            let link = <Link to={category.path}/>
            return(<RaisedButton style={style}
            key={category.path}
            label={category.path}
            containerElement={ link } >
            </RaisedButton>)
        })
      }

      <RaisedButton style={style}
        label='new Post'
        containerElement={ newLink } 
        secondary={true}>
      </RaisedButton>

      < SelectField
        style={style}
        floatingLabelText = "Sort By"
        value = {this.state.value}
        onChange = {
            this.handleSortChange
        } >
        {
            sortItems
        }

      </SelectField>

      </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps ({ categories, posts}) {
  return { categories, posts }

}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getCategories : () => dispatch(getCategories()),
    sortPosts: (sort) =>  dispatch(sortPosts(sort)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList)
