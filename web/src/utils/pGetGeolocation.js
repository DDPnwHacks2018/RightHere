import axios from 'axios';

const pGetGeolocation = () => {
    return axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAsPudtiItg4I-2s22XDH_jFbZjbg7orHs")
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
