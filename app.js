const yargs = require('yargs');
const geolocation = require('./geolocation/geolocation.js');
const weather = require('./weather/weather.js');

var argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Digite um endereço',
        string: true
    }
}).help()
.alias('help', 'h')
.argv;

// Example of treating http requets with callbacks
geolocation.geocodeRequest(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        weather.weatherRequest(results.lat, results.lng, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(JSON.stringify(weatherResults, undefined, 2));
            }
        });
    }
});


console.log('Main() app.js'); // After the main() ends, callbacks that are in the queue begin to execute.
                              // Besides, any variable who was set in the main escope, will be also avaiable inside the callbacks