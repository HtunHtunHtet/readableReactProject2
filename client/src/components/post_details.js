import React, { Component } from 'react';
import {receiveSinglePostDetails, receiveCommentForOnePostAction,getVotePostOnVoting,retrieveDeleteSinglePost }  from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MainMenu from './mainMenu';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon   from 'react-bootstrap/lib/Glyphicon';
import Timestamp from "react-timestamp";

class PostDetails extends Component {


    //mount all posts
    componentDidMount() {
        this.props.receiveSinglePost (this.props.match.params.postId);
    }

    voteScore = (id, option = "upVote") => {
        this.props.votingOnPost(id,option);
    }

    deletePost = id => {
        console.log("deleteTest");
        this.props.deletePost(id);
    }


    render() {
        const {posts} = this.props.posts;
        const {comments} = this.props.receiveComments;

        //check props
        console.log("comment list",  {comments});
        return(
            <div>
                <MainMenu/>
                <div className="container">
                    {/*add posts button*/}
                        <div className="row">
                            {
                                posts && posts.length > 0 ? posts.map(
                                post => (
                                    <div>
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
                                                                <Button bsStyle="danger" bsSize="lg" onClick={()=>this.deletePost(post.id)}>
                                                                    Delete Post
                                                                </Button>
                                                            </ButtonToolbar>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel.Body>
                                        </Panel>
                                        <Panel>
                                            {
                                                comments && comments
                                                    .map(comment => (
                                                        <Panel.Body className="panel-comment-body">
                                                            <div className="row">
                                                                <div className="col-md-10">
                                                                    {comment.body}
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <ButtonToolbar>
                                                                        <ButtonGroup>
                                                                            <Button>
                                                                                <Glyphicon glyph="thumbs-up" />
                                                                            </Button>
                                                                            <Button>
                                                                                <div>{comment.voteScore}</div>
                                                                            </Button>
                                                                            <Button>
                                                                                <Glyphicon glyph="thumbs-down" text="2" />
                                                                            </Button>
                                                                        </ButtonGroup>
                                                                    </ButtonToolbar>
                                                                </div>
                                                            </div>
                                                        </Panel.Body>
                                                    )
                                                )
                                            }
                                        </Panel>
                                    </div>

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

const mapStateToProps = ({posts , receiveComments}) => ({posts,receiveComments});

const mapDispatchToProps = dispatch  =>({
    receiveSinglePost : postId =>
                            dispatch(receiveSinglePostDetails(postId))
                                /*dispatch for comment*/
                                .then(()=>dispatch(receiveCommentForOnePostAction(postId))),
    /*dispatch vote posts*/
    votingOnPost: (id,option) =>
                            dispatch(getVotePostOnVoting(id,option)),

    /*dispatch delete post*/
    deletePost:(id) =>
                dispatch(retrieveDeleteSinglePost(id))

    /**/
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);

