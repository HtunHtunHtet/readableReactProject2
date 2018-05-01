import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {fetchAllCategories} from "../actions/categories";
import {getPostsByCategory} from "../actions";
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';

class mainMenu extends Component {
    componentDidMount(){
        this.props.fetchAllCategories();
    }


    fetchPostsByCategory = cat => {
        console.log(cat);
        this.props.getPostsByCategory(cat)
    }

    render(){
        const { receiveCategories } = this.props;
        return(
         <div>
             <Navbar>
                 <Navbar.Header>
                     <Navbar.Brand>
                         <a href="#">
                             <Link to={`/`}>
                                React Readable
                             </Link>
                         </a>
                     </Navbar.Brand>
                 </Navbar.Header>
                 <Nav>

                     {receiveCategories.length > 0 &&
                     receiveCategories.map((category) => (
                         <NavItem href="#" eventKey={1} onClick={() => this.fetchPostsByCategory(category.name)}>
                             <Link to={`/${category.name}`}>
                                {category.name}
                             </Link>
                         </NavItem>

                     ))
                     }
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
    fetchAllCategories,getPostsByCategory
})(mainMenu)