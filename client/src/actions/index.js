//import api
import *  as api from '../utils/api';
export const GET_CATEGORIES = 'GET_CATEGORIES';

//get all categories
export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});

//fetch all categories
export const fetchAllCategories = () => dispatch =>
    api
        .getAllCategoriesFromBackend()
        .then(categories => dispatch(getCategories(categories)));
