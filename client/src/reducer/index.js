import { combineReducers } from "redux";
import { GET_CATEGORIES , RETRIEVE_POSTS } from '../actions';

function receiveCategories (state = {} , action){
    switch(action.type){
        case GET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}
function posts (state= {} ,action){
    switch(action.type){
        case RETRIEVE_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state;
    }
}

export default combineReducers({
    receiveCategories,posts
})