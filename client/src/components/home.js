import React, { Component } from 'react';
import * as action from '../actions';
import {connect} from 'react-redux';
import MainMenu from './mainMenu';
import Panel from 'react-bootstrap/lib/Panel'

class Home extends Component {
    componentDidMount(){
        this.props.fetchAllPosts();
    }
    render() {
        //check props
        const {posts} = this.props.posts;
        console.log({posts});
        return(
            <div>
                <MainMenu/>
                <div className="container">
                    <div className="row">
                        {posts && posts.length > 0 ? posts.map(
                            post => (
                                <Panel bsStyle="primary">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">{post.title}</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>Panel content</Panel.Body>
                                </Panel>
                            )
                        ):(
                        <Panel>
                            <Panel.Body>Nothing To show</Panel.Body>
                        </Panel>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({posts}) => ({posts});

export default connect(mapStateToProps,action)(Home);

