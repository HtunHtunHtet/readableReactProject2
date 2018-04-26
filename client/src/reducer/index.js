import { combineReducers } from "redux";
import { GET_CATEGORIES , RETRIEVE_POSTS,
        ADDING_POSTS, GET_POSTS_BY_CATEGORY,
        VOT_ON_POST
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
            }
        case ADDING_POSTS:
            return{
                ...state,
                post: action.post
            }
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

        default:
            return state;
    }
}


export default combineReducers({
    receiveCategories,posts
})