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

  updateLocation: (loc) => {
    readySocket();

    const data = {
      loc: loc,
    };

    socket.emit('update_user_loc', data, (data) => { });
  },

  pGetPosts: (loc) => {
    const apiUrl = "/posts";
    const url = BASE_URL + apiUrl;
    const data = {
      loc: loc,
    };

    return axios.post(url, data)
      .then(function (response) {
        console.log(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  pCreatePost: (text, images, loc) => { // callback(data)
    const apiUrl = "/posts/create";
    const url = BASE_URL + apiUrl;
    const data = {
      text: text,
      images: images,
      loc: loc,
    };

    return axios.post(url, data)
      .then(function (response) {
        console.log(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  pReplyPost: (post_id, text) => {
    const apiUrl = "/posts/reply";
    const url = BASE_URL + apiUrl;
    const data = {
      post_id: post_id,
      text: text,
    };

    return axios.post(url, data)
      .then(function (response) {
        console.log(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

};

export default ServerAPI;


