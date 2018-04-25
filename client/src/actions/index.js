//import api
import *  as api from '../utils/api';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RETRIEVE_POSTS  = 'RETRIEVE_POSTS';
export const ADDING_POSTS    = 'ADDING_POSTS';
export const GET_POSTS_BY_CATEGORY  = 'GET_POSTS_BY_CATEGORY';

//get all categories
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

