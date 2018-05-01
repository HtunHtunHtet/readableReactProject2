//import api
export const CHANGE_ORDER_BY_SORT = "CHANGE_ORDER_BY_SORT";

export const changeSortAction = value => {
    return {
        type: CHANGE_ORDER_BY_SORT,
        value: value
    };
};