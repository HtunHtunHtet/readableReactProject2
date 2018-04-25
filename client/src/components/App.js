import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import AddNewPost from './add_new_post';
import '../App.css';

class App extends Component {
  render() {
    return (
     <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/addnewpost" component={AddNewPost} />
     </Switch>
    );
  }
}

export default App;
