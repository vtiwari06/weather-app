const request = require('request');

const foreCast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=cb5b0e9d5d69d614e87cd3bf06c4808c&query="+long+","+lat;
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Unable to connect with weather service.", undefined);
        } else if(!body.current) {
            callback("Unable to fetch results from weather service.", undefined);
        } else {
            callback(undefined, body)
        }
    }); 
}

module.exports = foreCast;
