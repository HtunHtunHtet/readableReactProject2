import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MainMenu from './mainMenu';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon   from 'react-bootstrap/lib/Glyphicon';
import Timestamp from "react-timestamp";
import Sorting from "./sorting";

import { fetchAllPosts,getVotePostOnVoting ,retrieveDeleteSinglePost} from '../actions/posts';


class Home extends Component {

    //mount all posts
    componentDidMount(){
        this.props.fetchAllPosts();
    }

    voteScore = (id, option = "upVote") => {
        this.props.getVotePostOnVoting(id,option);
    }

    deletePost = id => {
        this.props.retrieveDeleteSinglePost(id);
    }


    render() {

        const {posts} = this.props.posts;
        const {sort} = this.props.sort;
        return(
            <div>
                <MainMenu/>

                <div className="container">
                    <div className="row">
                        <div className = "col-md-10">
                            <h3>Category: All</h3>
                        </div>

                        <div className="col-md-2">
                            <h4>Sort By</h4>
                            <Sorting/>
                        </div>
                    </div>
                    <div className="row">
                        {
                            posts && posts.length > 0 ? (
                                posts
                                    .filter(post => !post.deleted)
                                    .sort((a, b) => {
                                        switch (sort.value) {
                                            case "unpopular":
                                                console.log(a.voteScore);
                                                return a.voteScore - b.voteScore;
                                            case "oldest":
                                                return a.timestamp - b.timestamp;
                                            case "newest":
                                                return b.timestamp - a.timestamp;
                                            default:
                                                return b.voteScore - a.voteScore;
                                        }
                                    })
                                .map(
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
                                                                <Link to={`/editpost/${post.id}`} >
                                                                    Update Post
                                                                </Link>
                                                            </Button>
                                                            <Button bsStyle="danger" bsSize="lg"  onClick={()=>this.deletePost(post.id)}>
                                                                Delete Post
                                                            </Button>
                                                            <Button bsStyle="primary" bsSize="lg">
                                                                <Link to={`/${post.category}/${post.id}`}>
                                                                        View
                                                                </Link>
                                                            </Button>
                                                        </ButtonToolbar>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                            )
                        )):(
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

const mapStateToProps = ({posts,sort}) => ({posts,sort});

export default connect(mapStateToProps,{fetchAllPosts,getVotePostOnVoting ,retrieveDeleteSinglePost})(Home);

