const request = require('request');

// custom callback fn
// working with requests inside the callback
var weatherRequest = (lat, lng, callback) => {


    request({
        url: `https://api.darksky.net/forecast/f2cf1dcd0dc5f6541c729fbee6ff212/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        var json = JSON.stringify(body, undefined, 2); // Data format for analysis
        console.log(json);
        console.log(response.statusCode);

        if(error){
            callback('Error: request could not be completed');
        }else if(body.results.length > 0){
            callback(undefined, {
                temperature: body.currently.temperature
            })
        }else{
            callback('Error: Web service did not recognized lat or lng');
        }
    });
}

module.exports = {
    weatherRequest
}