//root variable
const ROOT_URL = 'http://localhost:3001';

//token declaration
let tokenAccesss = '12312312313';

//header declaration
const headers = {
    Authorization: tokenAccesss,
}

//fetch all categories api call
export const getAllCategoriesFromBackend = () => fetch(`${ROOT_URL}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);

//check all categories is coming in or not
 console.log (getAllCategoriesFromBackend());
