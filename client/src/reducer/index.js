import { combineReducers } from "redux";
import { GET_CATEGORIES } from '../actions/categories';

import {  RETRIEVE_POSTS, GET_POSTS_BY_CATEGORY,
          ADDING_POSTS, VOT_ON_POST , DELETE_SINGLE_POST,
          UPDATE_POST,  GET_POST_DETAILS, GET_SINGLE_POST_DETAILS} from '../actions/posts';


 import {GET_ALL_COMMENTS,
        VOTE_SINGLE_COMMENT , ADD_COMMENT_ON_POST,
        CHANGE_ORDER_BY_SORT, DELETE_COMMENT_FROM_POST,
        GET_SINGLE_COMMENT,UPDATE_SINGLE_COMMENT
} from '../actions';

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

function receiveComments(state = {} , action){
    switch (action.type){
        case GET_ALL_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case VOTE_SINGLE_COMMENT:
            //check comment state
            console.log("state comment id",state.comments);
            console.log("action comment id",action.comment);

            //get new state of comment and return
            const newCommentCount =state.comments.map(
                                        comments => {
                                            if(comments.id ===action.comment.id){
                                                comments.voteScore = action.comment.voteScore;
                                            }
                                            return comments;
                                        });
            return {
                ...state,
                comments: newCommentCount
            };
        case ADD_COMMENT_ON_POST:
            return {
                ...state,
                comments: state.comments.concat(action.comment)
            };
        case DELETE_COMMENT_FROM_POST:
            const remainingComments = state.comments.filter(
                comment =>
                    comment.id !== action.id
            );
            return {
                ...state,
                comments: remainingComments
            };
        case GET_SINGLE_COMMENT:
            return action.comment;
        case UPDATE_SINGLE_COMMENT:
            return {
                ...state,
                ...action.comment
            }
        default:
            return state;
    }
}


function sorting(state = { sort: "popular" }, action) {
    switch (action.type) {
        case CHANGE_ORDER_BY_SORT:
            console.log("detect");
            const newValue = action.value;
            return {
                ...state,
                sort: newValue
            };
        default:
            return state;
    }
}


export default combineReducers({
    receiveCategories, posts , receiveComments , sort: sorting
})