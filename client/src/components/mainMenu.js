import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchAllCategories} from "../actions";
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class mainMenu extends Component {
    componentDidMount(){
        this.props.fetchAllCategories();
    }

    render(){
        const { receiveCategories } = this.props;
        return(
         <div>
             <Navbar>
                 <Navbar.Header>
                     <Navbar.Brand>
                         <a href="#">React Readable</a>
                     </Navbar.Brand>
                 </Navbar.Header>
                 <Nav>

                     {receiveCategories.length >0 &&
                        receiveCategories.map((category) =>(
                            <NavItem eventKey={1} href="#">
                                {category.name}
                            </NavItem>
                        ))
                     }
                     <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                         <MenuItem eventKey={3.1}>Action</MenuItem>
                         <MenuItem eventKey={3.2}>Another action</MenuItem>
                         <MenuItem eventKey={3.3}>Something else here</MenuItem>
                         <MenuItem divider />
                         <MenuItem eventKey={3.4}>Separated link</MenuItem>
                     </NavDropdown>
                 </Nav>
             </Navbar>
         </div>
        )
    }

}

const mapStateToProps = ({ receiveCategories }) => ({
    receiveCategories
});
export default connect(mapStateToProps, {
    fetchAllCategories
})(mainMenu)