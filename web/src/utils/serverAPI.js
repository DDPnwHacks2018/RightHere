import io from 'socket.io-client'
import axios from 'axios';


console.log("starting serverAPI.js");

//const BASE_URL = 'localhost:3001';
const BASE_URL = '';

let socket = null;

// ---------------------

const readySocket = () => {
  if (!socket) {
    socket = io(BASE_URL);
  }
};

const ServerAPI = {
  onNewPost: (callback) => { // callback(data)
    readySocket();

    socket.on('new_post', function (data) {
      console.log("new_post: ", data);
      callback(data);
    });
  },

  onNewReply: (callback) => {
    readySocket();

    socket.on('new_reply', function (data) {
      console.log("new reply: ", data);
      callback(data);
    });
  },

  pGetPosts: () => {
    const apiUrl = "/posts";
    const url = BASE_URL + apiUrl;
    const data = {};

    return axios.get(url, data)
      .then(function (response) {
        console.log(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getPosts: (callback) => {
    const apiUrl = "/posts";
    const url = BASE_URL + apiUrl;
    const data = {};

    axios.get(url, data)
      .then(function (response) {
        console.log(response.data);

        callback(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  createPost: (text, callback) => { // callback(data)
    const apiUrl = "/posts/create";
    const url = BASE_URL + apiUrl;
    const data = {
      text: text,
    };

    axios.post(url, data)
      .then(function (response) {
        console.log(response.data);

        callback(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  replyPost: (post_id, text, callback) => {
    const apiUrl = "/posts/reply";
    const url = BASE_URL + apiUrl;
    const data = {
      post_id: post_id,
      text: text,
    };

    axios.post(url, data)
      .then(function (response) {
        console.log(response.data);

        callback(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

};

export default ServerAPI;


