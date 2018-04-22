import React, { Componenet } from 'react';
import { connect } from 'react-redux';
import {fetchAllCategories} from "../actions/indexAction";


class mainMenu extends Componenet {
    componentDidMount(){
        this.props.getAllCategories();
    }

    render(){
        return(
         <div>
            <div>test</div>
         </div>
        )
    }

}

const mapStateToProps = ({allCategories}) =>({
    allCategories
})

export default connect(mapStateToProps, {
    fetchAllCategories
})(mainMenu)