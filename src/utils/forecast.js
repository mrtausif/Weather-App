const request = require('request');
const forecast = (lat, long, callback) => {
    url = `http://api.weatherstack.com/current?access_key=ae729f0fb5ef2c2cd36341369729c526&query=${encodeURI(
        lat
    )},${encodeURI(long)}&units=m`;
    request({ url, json: true }, (err, {body} = {}) => {
        if (err) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Not found', undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}  . Current tempareture is ${body.current.temperature} and its feel like ${body.current.feelslike} `
            );
        }
    });
};

module.exports = forecast;
