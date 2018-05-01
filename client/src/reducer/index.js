import { combineReducers } from "redux";
import receiveCategories from './receiveCategories';
import receiveComments from './receiveComments';

import {  RETRIEVE_POSTS, GET_POSTS_BY_CATEGORY,
          ADDING_POSTS, VOT_ON_POST , DELETE_SINGLE_POST,
          UPDATE_POST,  GET_POST_DETAILS, GET_SINGLE_POST_DETAILS} from '../actions/posts';

import { CHANGE_ORDER_BY_SORT } from '../actions/sorting';

const  posts =  (state= {} ,action) =>{
    switch(action.type){
        case GET_POSTS_BY_CATEGORY:
        case RETRIEVE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case ADDING_POSTS:
            return{
                ...state,
                post: action.post
            };
        case VOT_ON_POST:
            const updateVoteOnPosts = state.posts.map(
                post => {
                        if (post.id === action.payload.id) {
                            post.voteScore = action.payload.voteScore;
                        }
                    return post;
            });
            return {
                ...state,
                posts: updateVoteOnPosts
            };
        case DELETE_SINGLE_POST:
            const fetchUpdatedPosts = state.posts
                    .filter(
                        post =>
                            post.id !== action.postId
                    );
            return {
                ...state,
                posts: fetchUpdatedPosts
            };
        case UPDATE_POST:
            console.log("update post reducer");
            return {
                ...state,
                ...action.details
            };
        case GET_POST_DETAILS:
            console.log("getpostdetails")
            return {
                ...state,
                details: [action.details]
            };
        case GET_SINGLE_POST_DETAILS:
           return {
               ...state,
               posts: [action.posts]
           }
        default:
            return state;
    }
}

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
    receiveCategories, posts , receiveComments , sort: sorting
})