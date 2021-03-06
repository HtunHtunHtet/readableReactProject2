import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import AddNewPost from './add_new_post';
import PostByCat from './post_by_categories';
import updateSinglePost from './update_single_post';
import updateSingleComment from './update_single_comment';
import postDetails from './post_details';
import '../App.css';

class App extends Component {
  render() {
    return (
     <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/addnewpost" component={AddNewPost} />
         <Route exact path="/editPost/:singlePostId" component={updateSinglePost} />
         <Route exact path ="/updateComment/:commentId" component={updateSingleComment} />
         <Route exact path="/:category/:postId" component={postDetails} />
         <Route exact path="/:category" component={PostByCat} />
     </Switch>
    );
  }
}

export default App;
