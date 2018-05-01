//import api
import *  as api from '../utils/api';
import *  as Types from '../actions/actionType';


//get all comments
export const getAllComments = comments => ({
    type: Types.GET_ALL_COMMENTS,
    comments
})

export const receiveCommentForOnePostAction  = id =>dispatch =>
    api.getCommentsFromPost(id)
        .then(comments =>dispatch(getAllComments(comments)));

//vote on single comment
export const getVoteSingleComment = (comment) =>({
    type: Types.VOTE_SINGLE_COMMENT,
    comment
});

export const receiveVoteSingleComment = (id , option)=> dispatch =>
    api.voteSingleComment(id, option).then(comments => dispatch(getVoteSingleComment(comments)));

//recieveComment to single post
export const addingCommentToPost = comment  => ({
    type: Types.ADD_COMMENT_ON_POST,
    comment
});

export const receiveCommentToSinglePost = comment => dispatch  =>
    api.addCommentOnPost(comment).then(comment => dispatch (addingCommentToPost(comment)));

//delete comment from one post
export const deleteCommentFromPost = id  => {
    return {
        type: Types.DELETE_COMMENT_FROM_POST,
        id
    }
}

export const deleteSingleComment = id => dispatch =>
    api.deletePostComment(id)
        .then(comment => dispatch(deleteCommentFromPost(id)));


//get single result
export const getSingleComment = comment => ({
    type: Types.GET_SINGLE_COMMENT,
    comment
})

export const receiveSingleComment  = id => dispatch =>
    api.getSingleComment(id).then(comment =>dispatch(getSingleComment(comment)));

//update single comment
export const updateSingleComment  = (comment, id) => ({
    type: Types.UPDATE_SINGLE_COMMENT,
    comment, id
})

export const receiveUpdateSingleComment  = (comment, id) => dispatch =>
    api.updateComment(comment,id)
        .then(comment => dispatch(updateSingleComment(comment)));



