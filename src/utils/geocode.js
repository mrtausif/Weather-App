const request = require('request');

const geocode = (adress, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
        adress
    )}.json?access_token=pk.eyJ1IjoibXJvcGkiLCJhIjoiY2tlZW83dXlnMDVvcjJ6czRiaW5lNm9pbSJ9.PuHjJXRDTTqYFIhrc1a0AQ&limit=1`;
    request({ url: url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect', undefined);
        } else if (body.features.length === 0) {
            callback('No match found', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};
module.exports = geocode;
