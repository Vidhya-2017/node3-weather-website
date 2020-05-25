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
            const result =  " Current temperature is " + response.body.current.temperature +
                            " But Feels as if it is " + response.body.current.feelslike+
                            " in the Location " + response.body.location.name +
                            " Weather is " + response.body.current.weather_descriptions[0]
            callback(undefined,{
                currentTemperature: response.body.current.temperature,
                FeelsLike: response.body.current.feelslike,
                Weather: response.body.current.weather_descriptions[0],
                location: response.body.location.name,
                Composed: result
            });
        }
    });
}

module.exports = foreCast; 