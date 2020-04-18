const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoidml2ZWt0aXdhcmkwNjEyIiwiYSI6ImNrOTFld21uNDBhMmszb3M2d2dqNHlyem8ifQ.5nLO0kHOxITUge_4SotEpQ";
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect with mapbox service.', undefined);
            // console.log('Unable to connect with service.')
        } else if(body.features.length == 0) {
            callback('Unable to find location.', undefined);
            // console.log('Unable to find location.')
        } else {
            const latitude = body.features[0].center[0];
            const longitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            console.log(latitude, longitude);
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            });
        }
    }); 
}

module.exports = geoCode;
