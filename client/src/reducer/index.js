import { combineReducers } from "redux";
import receiveCategories from './receiveCategories';
import receiveComments from './receiveComments';
import receivePosts from './receivePosts';


import { CHANGE_ORDER_BY_SORT } from '../actions/sorting';

const  sorting = (state = { sort: "popular" }, action) => {
    switch (action.type) {
        case CHANGE_ORDER_BY_SORT:
            console.log("detect");
            const getInput = action.value;
            return {...state, sort: getInput};
        default:
            return state;
    }
}


export default combineReducers({
    receiveCategories,
    posts: receivePosts ,
    receiveComments , sort: sorting
})