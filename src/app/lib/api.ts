import axios from "axios"

// get all post
export const getPosts = async () => {
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return posts
}

// get single post by id
export const getPostById = async (postId:string) => {
    const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return posts
}

// get comments based on post id
export const getCommentsByPostId = async (postId:string) => {
    const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    return posts
}