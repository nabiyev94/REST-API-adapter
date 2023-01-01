const axios = require("axios");
const { response } = require("express");
const res = require("express/lib/response");
const config = require("./config");

endpointUrl = config.placeholderApi.url;


async function getPostsByUserId(userId) {
  return axios.get(`${endpointUrl}/posts`)
    .then(response => {
      return response.data.filter(post => post.userId == parseInt(userId));
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}


async function getCommentsForPost(post) {
  await axios.get(`${endpointUrl}/posts/${post.id}/comments`)
    .then(response => {
      post["comments"] = response.data.slice(0, 5);
    })
    .catch(err => {
      console.log(err);
      post["comments"] = [];
    })
  
  return post;
}


async function getPostsWithCommentsForUserId(userId) {
  posts = await getPostsByUserId(userId);
  
  // Fetch comments for all posts in parallel. This results in much faster response times
  return Promise.all(posts.map(post => getCommentsForPost(post)));
}


module.exports = { getPostsWithCommentsForUserId };
