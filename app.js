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
  
//console.log(argv);

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


console.log('Fim main() app.js'); // Esse é o fim da main, após ele todas as funções de callback em fila são executadas.
                          // Entrentanto, não siginifica que o main() foi encerrado, mas sim q ele chegou ao final
                          // Qualquer variável de escopo do main ainda está disponível para utilização nas callbacks 