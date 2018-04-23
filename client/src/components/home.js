import React, { Component } from 'react';
import {connect} from 'react-redux';
import MainMenu from './mainMenu';
import * as action from '../actions';

class Home extends Component {

    componentDidMount(){
        this.props.fetchAllPosts();
    }
    render() {
        //check props
        const {posts} = this.props.posts;
        console.log("props",this.props);
        return(
            <div>
                <MainMenu/>
            </div>
        )
    }

}

const mapStateToProps = ({posts}) => ({posts});

export default connect(mapStateToProps,action)(Home);

