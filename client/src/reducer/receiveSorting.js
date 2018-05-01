import * as Types from '../actions/actionType';


const  receiveSorting = (state = { sort: "popular" }, action) => {
    switch (action.type) {
        case Types.CHANGE_ORDER_BY_SORT:
            console.log("detect");
            const getInput = action.value;
            return {...state, sort: getInput};
        default:
            return state;
    }
}

export default receiveSorting;