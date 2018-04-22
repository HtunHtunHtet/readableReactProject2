import { combineReducers } from "redux";
import { GET_ALL_CATEGORIES } from '../actions';

function getAllCategories (state = {} , action ){
    switch(action.type){
        case GET_ALL_CATEGORIES:
            return state.categories
        default:
            return state;
    }
}

export default combineReducers({
    getAllCategories
})