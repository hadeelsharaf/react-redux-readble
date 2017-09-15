import React, { Component } from 'react';
import logo from '../css/logo.svg';
import '../css/App.css';

class App extends Component {
  state = {
    books:null,
    categories:null,
    comments:null
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React-Redux</h2>
        </div>
        <p className="App-intro">
          A content and comment web app.
        </p>
        <div className="Post">
          fggsfsds
        </div>
        <div className="Comment">
          fggsfsds
        </div>

      </div>
    );
  }
}

export default App;
// function mapStateToProps ({ books, categories, comments }) {
//   normalize categoties if needed
//   return { books, categories, comments }

// }

// function mapDispatchToProps (dispatch) {
//   return {
//     selectRecipe: (data) => dispatch(addRecipe(data)),
//     remove: (data) => dispatch(removeFromCalendar(data))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)