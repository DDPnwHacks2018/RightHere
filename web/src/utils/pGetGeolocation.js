import axios from 'axios';

const pGetGeolocation = () => {
    return axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC1uF9z1i0vTK9nlTX7kHgiCQJmqB9kqeY")
        .then((res) => {
            return res.data.location;
            /* 
                {
                "location": {
                    "lat": 51.0,
                    "lng": -0.1
                },
                "accuracy": 1200.4
                }
            */
        });
};

export default pGetGeolocation;
