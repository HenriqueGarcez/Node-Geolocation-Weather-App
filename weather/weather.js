const request = require('request');

var weatherRequest = (lat, lng, callback) => {

// request, podendo passar o objeto options e um callback opcional
    request({
        url: `https://api.darksky.net/forecast/f2cf1dcd0dc5f6541c729fbee6ff212/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        var json = JSON.stringify(body, undefined, 2); // transformando em JSON para visualizar todas as propriedades do objeto --> Bom para visualização apenas
        console.log(json);
        console.log(response.statusCode);

        if(error){
            callback('Erro no sistema de envio');
        }else if(body.results.length > 0){
            callback(undefined, {
                temperature: body.currently.temperature
            })
        }else{
            callback('Erro de retorno do web service');
        }
        //console.log(encode); Funciona pois o main ainda estará ativo durante as execuções das callbacks
    });
}

module.exports = {
    weatherRequest
}