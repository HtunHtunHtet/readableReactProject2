import React, { Component } from 'react';
import {connect} from 'react-redux';
import { retrieveSubmittingPost } from '../actions';
import MainMenu from './mainMenu';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import uuid from 'uuid/v1'

class addNewPost extends Component {

    //initital state
    state ={
        categoryName: "react",
        title: "",
        author: "",
        content: ""
    };


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
        const submitValues = {
            id: uuid(),
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.content,
            author: this.state.author,
            category: this.state.categoryName,
            deleted: false,
            voteScore: 1
        };
        console.log (submitValues);
        this.props.retrieveSubmittingPost(submitValues);
        this.props.history.push("/");
    }

    render() {
        //check props
        console.log("current state", this.state);
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
                                    value={this.state.value}
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
                                    value={this.state.value}
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

export default connect(null,{retrieveSubmittingPost})(addNewPost);

