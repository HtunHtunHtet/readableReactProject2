import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import AddNewPost from './add_new_post';
import PostByCat from './post_by_categories';
import '../App.css';

class App extends Component {
  render() {
    return (
     <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/addnewpost" component={AddNewPost} />
         <Route exact path="/:category" component={PostByCat} />
     </Switch>
    );
  }
}

export default App;
