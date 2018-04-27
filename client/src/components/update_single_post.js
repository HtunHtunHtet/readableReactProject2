import React, { Component } from 'react';
import {connect} from 'react-redux';
import { recievePostDetails , receiveUpdatePost } from '../actions';
import MainMenu from './mainMenu';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import uuid from 'uuid/v1'

class updateSinglePost extends Component {

    //initital state
    state ={
        id: "",
        categoryName: "",
        title: "",
        author: "",
        content: ""
    };

    //call post details
    componentDidMount() {
        const { singlePostId } = this.props.match.params;
        this.props.recievePostDetails(singlePostId).then(() => {
            const { id, title, author, body, category } = this.props.posts.details[0];
            this.setState({
                id: id,
                title: title,
                author: author,
                content: body,
                categoryName: category
            });


        });
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
        const {id, title, content, author,categoryName } = this.state
        const submitUpdateValues = {
            id: id,
            title: title,
            body: content,
            author: author,
            category: categoryName,
        };
        console.log ("Submit Values: ",submitUpdateValues);
        this.props.receiveUpdatePost(submitUpdateValues, id);
        this.props.history.push("/");
    }

    render() {
        //check props
       /* console.log("current state", this.state);*/
        return(
            <div>
                <MainMenu/>
                <div className="container">
                    <PageHeader>
                        Add New Post
                    </PageHeader>
                    <div className="row">
                        {/*Form Start*/}
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="Choose Category"
                                    onChange={this.handleChange}
                                    value={this.state.categoryName}
                                    name="categoryName"
                                    required="true"
                                >
                                    <option value="react">react</option>
                                    <option value="redux">redux</option>
                                    <option value="udacity">udacity</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Post Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Enter Post Title"
                                    name = "title"
                                    onChange={this.handleChange}
                                    required="true"
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Author Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.author}
                                    placeholder="Enter Author Name"
                                    name = "author"
                                    onChange={this.handleChange}
                                    required="true"
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Contents</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="content"
                                    name="content"
                                    onChange={this.handleChange}
                                    required="true"
                                    value = {this.state.content}
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <Button bsStyle="primary" type="submit">Add Post</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ posts }) => ({
    posts
});

export default connect(mapStateToProps,{recievePostDetails,receiveUpdatePost})(updateSinglePost);

