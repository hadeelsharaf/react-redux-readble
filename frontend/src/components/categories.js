import React, {Component} from 'react';
import { connect } from 'react-redux'
import { getCategories } from '../actions/categories'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: 12,
};

class CategoriesList extends Component {


  componentDidMount() {
    this.props.getCategories()
  }

  render() {
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

      </div>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps ({ categories}) {
  return { categories }

}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getCategories : () => dispatch(getCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList)
