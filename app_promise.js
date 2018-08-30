const yargs = require('yargs');
const axios = require('axios');

const geolocation = require('./geolocation/geolocation.js');
const weather = require('./weather/weather.js');

// Get data input
var argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Type your address',
        string: true
    }
}).help()
.alias('help', 'h')
.argv;

// Encoding Url and placing it
var encode = encodeURIComponent(argv.a);
var geolocationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encode;

// Axios http request
axios.get(geolocationUrl).then((response) => {
    if(response.data.results.length > 0){
        console.log(JSON.stringify(response.data.results, undefined, 2)); // Data format for analysis
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/f2cf1dcd0dc5f6541c729fbee6ff212/${lat},${lng}` // using latitude and longtude from GeoLocation to get weather information in DarkSky API
        return axios.get(weatherUrl); // Sending information for the next promise in chain
    }else{
        throw new Error('Address could not be recognized.');
    }
}).then((response) => { // Promise chain, very useful for treating many errors with just one catch
    console.log(response.data.currently.temperature);
}).catch((error) => {
    console.log(error);
});
   