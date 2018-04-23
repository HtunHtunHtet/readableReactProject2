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
//  console.log (getAllCategoriesFromBackend());


//retrieve all posts from the api
export const getAllArticles = () => fetch (`${ROOT_URL}/posts`,{
        headers}).then (result => result.json());

//get All Comment Form A Post
export const getCommentsFromPost = postId =>
    fetch(`${ROOT_URL}/posts/${postId}/comments`, { headers }).then(response =>
        response.json().then(data => data)
    );

//check comment can retrieve or not
console.log("Particular Comment",getCommentsFromPost("8xf0y6ziyjabvozdd253nd"));
