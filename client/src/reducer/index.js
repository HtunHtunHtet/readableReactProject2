import { combineReducers } from "redux";
import receiveCategories from './receiveCategories';
import receiveComments from './receiveComments';
import receivePosts from './receivePosts';
import receiveSorting  from './receiveSorting';
export default combineReducers({
    receiveCategories,
    posts: receivePosts ,
    receiveComments , sort: receiveSorting
})