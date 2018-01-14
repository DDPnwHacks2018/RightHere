import io from 'socket.io-client'
import axios from 'axios';


console.log("starting serverAPI.js");

//const BASE_URL = 'localhost:3001';
const BASE_URL = '';

const socket = io(BASE_URL);

// ---------------------

const ServerAPI = {
  //postCreate: postCreate,
  triggerUpdate: () => {
    console.log("serverAPI:triggerUpdate");

    socket.emit('update', "hello from web");
  },

  registerUpdateListener: (callback) => { // callback(data)
    socket.on('update', function(data) {
      console.log("socket on update: ", data);
      callback(data);
    });
  },

  postCreate: (text, pic, callback) => { // callback(data)
    const apiUrl = "/post/create";

    const url = BASE_URL + apiUrl;

    const data = {
      text: text,
      pic: pic,
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

};

export default ServerAPI;


