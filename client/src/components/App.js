import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import '../App.css';

class App extends Component {
  render() {
    return (
     <Switch>
         <Route exact path="/" component={Home} />
     </Switch>
    );
  }
}

export default App;
