//root variable
const ROOT_URL = 'http://localhost:3001';

//token declaration
let tokenAccesss = localStorage.token;
if (!tokenAccesss) {
    tokenAccesss = localStorage.token = Math.random();
}

//header declaration
const header = {
    Authorization: tokenAccesss,
}

//fetch all categories api call
export const fetchAllCategories = ()=> fetch(`${ROOT_URL}/categories`,{header})
                                            .then(data => data.categories)
