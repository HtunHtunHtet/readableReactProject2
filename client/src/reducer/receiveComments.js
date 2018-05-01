import * as Types from '../actions/actionType';


const receiveComments = (state = {} , action) =>{
    switch (action.type){
        case Types.GET_ALL_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case Types.VOTE_SINGLE_COMMENT:
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
        case Types.ADD_COMMENT_ON_POST:
            return {
                ...state,
                comments: state.comments.concat(action.comment)
            };
        case Types.DELETE_COMMENT_FROM_POST:
            const remainingComments = state.comments.filter(
                comment =>
                    comment.id !== action.id
            );
            return {
                ...state,
                comments: remainingComments
            };
        case Types.GET_SINGLE_COMMENT:
            return action.comment;
        case Types.UPDATE_SINGLE_COMMENT:
            return {
                ...state,
                ...action.comment
            }
        default:
            return state;
    }
}

export default receiveComments;