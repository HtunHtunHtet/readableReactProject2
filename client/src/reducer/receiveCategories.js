import * as Types from '../actions/actionType';

const receiveCategories = (state = {} , action) =>{
    switch(action.type){
        case Types.GET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

export default receiveCategories;