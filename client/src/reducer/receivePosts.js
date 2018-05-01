import * as Types from '../actions/actionType';

const  receivePosts =  (state= {} , action) =>{
    switch(action.type){
        case Types.GET_POSTS_BY_CATEGORY:
        case Types.RETRIEVE_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case Types.ADDING_POSTS:
            return{
                ...state,
                post: action.post
            };
        case Types.VOT_ON_POST:
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
        case Types.DELETE_SINGLE_POST:
            const fetchUpdatedPosts = state.posts
                .filter(
                    post =>
                        post.id !== action.postId
                );
            return {
                ...state,
                posts: fetchUpdatedPosts
            };
        case Types.UPDATE_POST:
            console.log("update post reducer");
            return {
                ...state,
                ...action.details
            };
        case Types.GET_POST_DETAILS:
            console.log("getpostdetails")
            return {
                ...state,
                details: [action.details]
            };
        case Types.GET_SINGLE_POST_DETAILS:
            return {
                ...state,
                posts: [action.posts]
            }
        default:
            return state;
    }
}


export default receivePosts;