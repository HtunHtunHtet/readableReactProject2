//import api
import *  as api from '../utils/api';

export const ADDING_POSTS    = 'ADDING_POSTS';
export const VOT_ON_POST = 'VOT_ON_POST';
export const DELETE_SINGLE_POST= 'DELETE_SINGLE_POST';
export const UPDATE_POST            = 'UPDATE_POST';
export const RETRIEVE_POSTS  = 'RETRIEVE_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS_BY_CATEGORY  = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_DETAILS       = 'GET_POST_DETAILS';
export const GET_SINGLE_POST_DETAILS = 'GET_SINGLE_POST_DETAILS';
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';

// all dispatch
export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});


export const retrievePost = posts => ({
    type: RETRIEVE_POSTS,
    posts
});

export const submittingPost = post => ({
    type: ADDING_POSTS,
    post
});

export const gettingPostsByCat = posts => ({
    type: GET_POSTS_BY_CATEGORY,
    posts
})

export const VoteOnPost = voteCount =>({
    type: VOT_ON_POST,
    payload: voteCount
})

//Delete Post
export const getDeleteSinglePost = postId => ({
    type: DELETE_SINGLE_POST,
    postId
});

//post details
export const getPostDetails = details => ({
    type: GET_POST_DETAILS,
    details
})

//post update
export const updatePost = (details, id) =>({
    type: UPDATE_POST,
    details, id
})

//get SinglePostDetails
export const getSinglePostDetails = posts => ({
    type: GET_SINGLE_POST_DETAILS,
    posts
})

//fetch all categories
export const fetchAllCategories = () => dispatch =>
    api
        .getAllCategoriesFromBackend()
        .then(categories => dispatch(getCategories(categories)));


//fetch posts along with comments as well
export const fetchAllPosts = () => dispatch =>
    api.getAllArticles().then(posts => Promise.all(
                posts.map(post => api
                        .getCommentsFromPost(post.id)
                        .then(comments => (post.comments = comments))
                        .then(() => post)
                ))).then(posts => dispatch(retrievePost(posts)));


//add post
export const retrieveSubmittingPost = post =>dispatch =>
    api.submitPost(post).then(post=>dispatch(submittingPost(post)))


//get posts base on categories
export const getPostsByCategory = cat => dispatch =>
    api.getPostByCategory(cat).then(posts => Promise.all(
                                                posts.map(post => api.getCommentsFromPost(post.id)
                                                                        .then(comments=>posts.comments = comments)
                                                                        .then(() => post)
                                                ))).then(posts => dispatch(gettingPostsByCat(posts)));

//get voting on the post
export const getVotePostOnVoting =  (id, option) =>dispatch =>
    api.voteToPost(id,option).then(count=> dispatch(VoteOnPost(count)));

//delete post
export const retrieveDeleteSinglePost = postId =>
        dispatch => api.deleteSinglePost(postId)
        .then(post => dispatch(getDeleteSinglePost(postId)));


//retrieve post details
export const recievePostDetails = id => dispatch =>
    api.getPostDetails(id).then(details => dispatch(getPostDetails(details)));


//update post
export const receiveUpdatePost = (details, id) => dispatch =>
    api.updatePostDetails(details,id)
        .then(details=>dispatch(updatePost(details,id)));

//getting single post details
export const receiveSinglePostDetails =  id  => dispatch =>
        api.getSinglePostDetails(id).then(details =>dispatch(getSinglePostDetails(details)));


//get All Comments for the selected post
export const getAllComments = comments => ({
    type: GET_ALL_COMMENTS,
    comments
})

export const receiveCommentForOnePostAction  = id =>dispatch =>
        api.getCommentsFromPost(id)
            .then(comments =>dispatch(getAllComments(comments)));


