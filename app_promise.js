const yargs = require('yargs');
const axios = require('axios');

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

var encode = encodeURIComponent(argv.a);
var geolocationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encode;

axios.get(geolocationUrl).then((response) => {
    if(response.data.results.length > 0){
        console.log(JSON.stringify(response.data.results, undefined, 2));
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/f2cf1dcd0dc5f6541c729fbee6ff212/${lat},${lng}`
        return axios.get(weatherUrl); // poderia fazer a promise aqui, porém o tratamento de erro seria específico a cada requisição
    }else{
        throw new Error('Erro na passagem de dados para o web server');
    }
}).then((response) => {
    console.log(response.data.currently.temperature);
}).catch((error) => {
    console.log(error);
});
   