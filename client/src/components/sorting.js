import React, { Component } from 'react';
import {connect} from 'react-redux';
import { changeSortAction } from '../actions';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';

class Sorting extends Component {

    //initital state
    state ={value:""};

    handleChange = e =>{
        const target = e.target;
        const value = target.value;

        this.setState({value : value});
        this.props.changeSortAction({value});
    };

    render() {
        return(
                <FormGroup controlId="formControlsSelect">
                    <FormControl
                        componentClass="select"
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="sort"
                    >
                        <option value="popular">popular</option>
                        <option value="unpopular">unpopular</option>
                        <option value="oldest">oldest</option>
                        <option value="newest">newest</option>
                    </FormControl>
                </FormGroup>

        )
    }

}

const mapStateToProps = ({ sort }) => ({sort});

export default connect(mapStateToProps,{ changeSortAction })(Sorting);

