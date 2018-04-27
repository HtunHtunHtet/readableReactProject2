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
// console.log("Particular Comment",getCommentsFromPost("8xf0y6ziyjabvozdd253nd"));


//adding post to server
export const submitPost = post => fetch (`${ROOT_URL}/posts`, {
                                        method: "POST",
                                        headers: {
                                            ...headers,
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(post)
                                    }).then(data=>data.json());

//get got for categories
export const getPostByCategory = cat => fetch (`${ROOT_URL}/${cat}/posts`,{headers})
                                        .then(data => data.json());


//voting post
export const voteToPost = (id, option) => fetch(`${ROOT_URL}/posts/${id}`,
                                                {
                                                    method: `POST`,
                                                    headers: {
                                                        ...headers,
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({option}
                                                )}).then(data => data.json());

//Delete Post
export const deleteSinglePost = id => {return fetch(`${ROOT_URL}/posts/${id}`, {
                                                method: "DELETE", headers})
                                            .then(res => res);
};

//get post details
export const getPostDetails = id => fetch (`${ROOT_URL}/posts/${id}` ,{headers})
                                        .then(result=>result.json());

//update post details
export const updatePostDetails = (details, id ) => {
    return fetch(`${ROOT_URL}/posts/${id}`, {
        method: `PUT`,
        headers:{
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    }).then(result=>result.json())
}
