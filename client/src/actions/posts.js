//import api
import *  as api from '../utils/api';
import * as Types from '../actions/actionType'


//fetch posts along with comments as well
export const retrievePost = posts => ({
    type: Types.RETRIEVE_POSTS,
    posts
});

export const fetchAllPosts = () => dispatch =>
    api.getAllArticles().then(posts => Promise.all(
        posts.map(post => api
            .getCommentsFromPost(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        ))).then(posts => dispatch(retrievePost(posts)));

//get posts base on categories
export const gettingPostsByCat = posts => ({
    type: Types.GET_POSTS_BY_CATEGORY,
    posts
})

export const getPostsByCategory = cat => dispatch =>
    api.getPostByCategory(cat).then(posts => Promise.all(
        posts.map(post => api.getCommentsFromPost(post.id)
            .then(comments=>posts.comments = comments)
            .then(() => post)
        ))).then(posts => dispatch(gettingPostsByCat(posts)));

//add post
export const submittingPost = post => ({
    type: Types.ADDING_POSTS,
    post
});

export const retrieveSubmittingPost = post =>dispatch =>
    api.submitPost(post).then(post=>dispatch(submittingPost(post)))

//get voting on the post
export const VoteOnPost = voteCount =>({
    type: Types.VOT_ON_POST,
    payload: voteCount
})

export const getVotePostOnVoting =  (id, option) =>dispatch =>
    api.voteToPost(id,option).then(count=> dispatch(VoteOnPost(count)));

//Delete Post
export const getDeleteSinglePost = postId => ({
    type: Types.DELETE_SINGLE_POST,
    postId
});

export const retrieveDeleteSinglePost = postId =>
    dispatch => api.deleteSinglePost(postId)
        .then(post => dispatch(getDeleteSinglePost(postId)));

//post update
export const updatePost = (details, id) =>({
    type: Types.UPDATE_POST,
    details, id
})

export const receiveUpdatePost = (details, id) => dispatch =>
    api.updatePostDetails(details,id)
        .then(details=>dispatch(updatePost(details,id)));


//retrieve post details
export const getPostDetails = details => ({
    type: Types.GET_POST_DETAILS,
    details
})

export const recievePostDetails = id => dispatch =>
    api.getPostDetails(id).then(details => dispatch(getPostDetails(details)));

//get single post
export const getSinglePostDetails = posts => ({
    type: Types.GET_SINGLE_POST_DETAILS,
    posts
})

export const receiveSinglePostDetails =  id  => dispatch =>
    api.getSinglePostDetails(id).then(details =>dispatch(getSinglePostDetails(details)));

