//import api
import *  as api from '../utils/api';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

//get all categories
export const getAllCategories   = allCategories =>({
    type    : GET_ALL_CATEGORIES,
    allCategories
});

//get al categories , action dispatch
export const fetchAllCategories = () => dispatch => api
    .fetchAllCategories().then(allCategories =>dispatch(getAllCategories(allCategories)))


