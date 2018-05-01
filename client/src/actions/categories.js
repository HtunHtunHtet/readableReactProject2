//import api
import *  as api from '../utils/api';
import *  as Types from '../actions/actionType';

// all dispatch
export const getCategories = categories => ({
    type: Types.GET_CATEGORIES,
    categories
});

//fetch all categories
export const fetchAllCategories = () => dispatch =>
    api
        .getAllCategoriesFromBackend()
        .then(categories => dispatch(getCategories(categories)));