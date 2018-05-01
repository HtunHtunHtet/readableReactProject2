import * as Type from './actionType';

export const changeSortAction = value => {
    return {
        type: Type.CHANGE_ORDER_BY_SORT,
        value: value
    };
};