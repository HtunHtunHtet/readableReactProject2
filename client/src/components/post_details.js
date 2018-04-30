import React, { Component } from 'react';
import {
    receiveSinglePostDetails,
    receiveCommentForOnePostAction,
    getVotePostOnVoting,
    retrieveDeleteSinglePost,
    receiveVoteSingleComment ,
    receiveCommentToSinglePost
} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import MainMenu from './mainMenu';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon   from 'react-bootstrap/lib/Glyphicon';
import Timestamp from "react-timestamp";
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import uuid from "uuid/v1";
import Sorting from "./sorting";

class PostDetails extends Component {
   //initial state for comment
    state = {
        commentAuthor: "",
        commentContent: ""
    };

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

    votingSingleComment = (id , option) => {
        this.props.voteOnComment(id,option);
    }


    handleCommentSubmit  = e => {
        e.preventDefault();
        const data = {
            id: uuid(),
            timestamp: Date.now(),
            body: this.state.commentContent,
            author: this.state.commentAuthor,
            parentId: this.props.match.params.postId,
            deleted: false,
            parentDeleted: false,
            voteScore: 1
        };
        console.log (data);

        this.props.addCommentToPost (data);
        this.setState({
            commentAuthor: "",
            commentContent: ""
        });
    };


    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };



    render() {
        const {posts} = this.props.posts;
        const {comments} = this.props.receiveComments;

        //check props
        console.log("comment list",  {comments});
        return(
            <div>
                <MainMenu/>
                <div className="container">
                        <div className="row">
                            <Sorting/>
                            {
                                posts && posts.length > 0 &&
                                posts.filter(
                                    post => !post.deleted && Object.keys(post).length > 0 && !post.error
                                ).map(post => (
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
                                                posts &&
                                                posts.length > 0 &&
                                                posts.filter(post => !post.deleted && Object.keys(post).length > 0).length > 0 &&
                                                comments &&
                                                comments
                                                    .filter(comment => !comment.deleted)
                                                    .filter(comment => !comment.parentDeleted)
                                                    .sort((a, b) => {
                                                        switch (this.props.sort.sort.value) {
                                                            case "unpopular":
                                                                return a.voteScore - b.voteScore;
                                                            case "oldest":
                                                                return a.timestamp - b.timestamp;
                                                            case "newest":
                                                                return b.timestamp - a.timestamp;
                                                            default:
                                                                return b.voteScore - a.voteScore;
                                                        }
                                                    })
                                                    .map(comment => (

                                                        <Panel.Body className="panel-comment-body">
                                                            <div className="row">
                                                                <div className="col-md-10">
                                                                    {comment.body}
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <ButtonToolbar>
                                                                        <ButtonGroup>
                                                                            <Button onClick={() => this.votingSingleComment(comment.id, "upVote")}>
                                                                                <Glyphicon glyph="thumbs-up"/>
                                                                            </Button>
                                                                            <Button>
                                                                                <div>{comment.voteScore}</div>
                                                                            </Button>
                                                                            <Button onClick={() => this.votingSingleComment(comment.id, "downVote")}>
                                                                                <Glyphicon glyph="thumbs-down" text="2" />
                                                                            </Button>
                                                                        </ButtonGroup>
                                                                    </ButtonToolbar>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <ButtonToolbar>
                                                                        <ButtonGroup>
                                                                            <Button>
                                                                                <Glyphicon glyph="user" />
                                                                            </Button>
                                                                            <Button>
                                                                                <div>{comment.author}</div>
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
                            )}

                            {
                                posts &&
                                posts.length > 0 &&
                                posts.filter(
                                    post =>
                                        !post.deleted && Object.keys(post).length > 0 && !post.error
                                ).length > 0 ? (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2>Add Comments</h2>

                                            <form onSubmit={this.handleCommentSubmit}>
                                                <FormGroup controlId="formBasicText">
                                                    <ControlLabel>Author:</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Author Name"
                                                        name = "commentAuthor"
                                                        value={this.state.commentAuthor}
                                                        onChange={this.handleInputChange}
                                                        required="true"
                                                    />
                                                    <FormControl.Feedback />
                                                </FormGroup>

                                                <FormGroup controlId="formBasicText">
                                                    <ControlLabel>Author:</ControlLabel>
                                                    <FormControl
                                                        componentClass="textarea"
                                                        placeholder="Content"
                                                        name = "commentContent"
                                                        value={this.state.commentContent}
                                                        onChange={this.handleInputChange}
                                                        required="true"
                                                    />
                                                    <FormControl.Feedback />
                                                </FormGroup>

                                                <Button bsStyle="primary" type="submit">Add Comment</Button>
                                            </form>

                                        </div>

                                    </div>
                                    ) :(
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

const mapStateToProps = ({posts , receiveComments,sort}) => ({posts,receiveComments,sort});

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
                dispatch(retrieveDeleteSinglePost(id)),

    /*dispatch voting posts */
    voteOnComment:(commentId , option) =>
                dispatch(receiveVoteSingleComment(commentId,option)),

    /*add comment */
    addCommentToPost: comment =>
                dispatch(receiveCommentToSinglePost(comment))
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);

