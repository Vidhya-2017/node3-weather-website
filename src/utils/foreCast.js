const request = require('request');

const foreCast = (area, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=fd8539f28b909b7d3526ca869dc22c05&query="
                +encodeURIComponent(area);
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Fetch the API', undefined);
        }else if(response.body.error){
            callback('Unable to Fetch the Temperature ', undefined);
        }else{
            callback(undefined,{
                currentTemperature: response.body.current.temperature,
                FeelsLike: response.body.current.feelslike,
                Weather: response.body.current.weather_descriptions[0],
                location: response.body.location.name
            });
        }
    });
}

module.exports = foreCast;