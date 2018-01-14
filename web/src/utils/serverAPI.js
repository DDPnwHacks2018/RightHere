console.log('starting serverAPI.js');

const BASE_URL = 'localhost:3000';

const socket = io(BASE_URL);

// ---------------------

const getTime = function() {
  return null;
}

const getLocation = function() {
  return null;
}

const postCreate = function(text, pic, callback) { // callback(data)
  const apiUrl = "/post/create";

  const url = BASE_URL + apiUrl;

  const time = getTime();
  const locationm = getLocation();

  const data = {
    time: time,
    location: location,
    text: text,
    pic: pic,
  };

  $.post(url, data, (data, status) => {
    console.log(data, status);
    callback(data);
  });
};

const triggerUpdate = function(key) {
  socket.emit(key);
};

const SOCKET_KEY = 'update'; 
const registerUpdateListener = function(callback) { // callback(data)
  socket.on(SOCKET_KEY, function(data) {
    console.log("socket update: ", data);
    callback(data);
  });
};
('hello: ', data);
});



ServerAPI = {
  postCreate: postCreate,
  triggerUpdate: triggerUpdate,
  registerUpdateListener: registerUpdateListener,
};

export default ServerAPI;


