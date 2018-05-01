import React, { Component } from 'react';
import {connect} from 'react-redux';
import { receiveSingleComment , getSingleComment, receiveUpdateSingleComment} from '../actions/comment';
import MainMenu from './mainMenu';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class updateSingleComment extends Component {

    //initital state
    state ={
       commentAuthor: "",
       commentContent:""
    };

    componentDidMount(){
        const commentId = this.props.match.params.commentId;
        // console.log ("commentId",commentId);
        this.props.receiveSingleComment(commentId).then(result=>{
                let author  =  result.comment.author;
                let body    = result.comment.body;

                this.setState({
                    commentAuthor: author,
                    commentContent: body
                });
        }
        );
    }


    handleChange = e =>{
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    };

    handleSubmit = e =>{
      e.preventDefault();
      const { commentAuthor , commentContent } = this.state;
      //construct data
      const updateData ={
            id: this.props.match.params.commentId,
            body: commentContent,
            author: commentAuthor
      }

      //submit data
      this.props.receiveUpdateSingleComment(updateData,updateData.id);
      this.props.history.goBack();

    }

    render() {
        //check current state
        console.log("current state", this.state);
        return(
            <div>
                <MainMenu/>
                <div className="container">
                    <PageHeader>
                       Update Comment
                    </PageHeader>
                    <div className="row">
                        {/*Form Start*/}
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Author Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.commentAuthor}
                                    placeholder="Enter Author Name"
                                    name = "commentAuthor"
                                    onChange={this.handleChange}
                                    required="true"
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Contents</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="comment Content"
                                    name="commentContent"
                                    onChange={this.handleChange}
                                    required="true"
                                    value = {this.state.commentContent}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <Button bsStyle="primary" type="submit">Update Comment</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ getSingleComment }) => ({
    getSingleComment
});

export default connect(mapStateToProps,{getSingleComment,receiveSingleComment,receiveUpdateSingleComment})(updateSingleComment);

