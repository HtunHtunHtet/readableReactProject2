import React, { Component } from 'react';
import * as action from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MainMenu from './mainMenu';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon   from 'react-bootstrap/lib/Glyphicon';
import Timestamp from "react-timestamp";

class Home extends Component {

    //mount all posts
    componentDidMount(){
        this.props.fetchAllPosts();
    }

    voteScore = (id, option = "upVote") => {
        this.props.getVotePostOnVoting(id,option);
    }



    render() {
        const {posts} = this.props.posts;
        //check props
        console.log({posts});
        return(
            <div>
                <MainMenu/>
                <div className="container">
                    <div className="row">
                        <div className = "col-md-6">
                            <h3>Category: All</h3>
                        </div>
                    </div>
                    <div className="row">
                        {posts && posts.length > 0 ? posts.map(
                            post => (
                                <Panel bsStyle="primary">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">{post.title}</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <div>{post.body}</div>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-3 col-sm-3">
                                                    <ButtonToolbar>
                                                        <ButtonGroup>
                                                            <Button  onClick={() => this.voteScore(post.id, "upVote")}>
                                                                <Glyphicon glyph="thumbs-up" />
                                                            </Button>
                                                            <Button>
                                                                <div>{post.voteScore}</div>
                                                            </Button>
                                                            <Button onClick={() => this.voteScore(post.id, "downVote")}>
                                                                <Glyphicon glyph="thumbs-down" text="2" />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </div>
                                                <div className="col-md-3 col-sm-3">
                                                    <ButtonToolbar>
                                                        <ButtonGroup>
                                                            <Button>
                                                                <Glyphicon glyph="comment" />
                                                            </Button>
                                                            <Button>
                                                                <div>{post.commentCount}</div>
                                                            </Button>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </div>

                                                <div className="col-md-3 col-sm-3">
                                                    <ButtonToolbar>
                                                        <ButtonGroup>
                                                            <Button>
                                                                <div>Posted on:</div>
                                                            </Button>
                                                            <Button>
                                                                <Timestamp
                                                                    time={post.timestamp / 1000}
                                                                    format="full"
                                                                />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </div>

                                                <div className="col-md-3 col-sm-3">
                                                    <ButtonToolbar>
                                                        <ButtonGroup>
                                                            <Button>
                                                                <Glyphicon glyph="user" />
                                                            </Button>
                                                            <Button>
                                                                <div>{post.author}</div>
                                                            </Button>
                                                        </ButtonGroup>
                                                    </ButtonToolbar>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div className="col-md-offset-8 col-md-4">
                                                    <ButtonToolbar>
                                                        <Button bsStyle="info" bsSize="lg" >
                                                            Update Post
                                                        </Button>
                                                        <Button bsStyle="danger" bsSize="lg" >
                                                            Delete Post
                                                        </Button>
                                                    </ButtonToolbar>
                                                </div>
                                            </div>
                                        </div>
                                    </Panel.Body>
                                </Panel>
                            )
                        ):(
                        <Panel>
                            <Panel.Body>Nothing To show</Panel.Body>
                        </Panel>
                        )}
                    </div>

                    {/*add posts button*/}
                    <Link to="/addnewpost">
                        <div className="row">
                            <Button bsStyle="primary">Add New Post</Button>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({posts}) => ({posts});

export default connect(mapStateToProps,action)(Home);

