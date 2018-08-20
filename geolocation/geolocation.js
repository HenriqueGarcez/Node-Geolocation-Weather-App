const request = require('request');

var geocodeRequest = (address, callback) => {

    var encode = encodeURIComponent(address);
// request, podendo passar o objeto options e um callback opcional
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encode,
        json: true
    }, (error, response, body) => {

        var json = JSON.stringify(body, undefined, 2); // transformando em JSON para visualizar todas as propriedades do objeto --> Bom para visualização apenas
        console.log(json);
        console.log(response.statusCode);

        if(error){
            callback('Erro no sistema de envio');
        }else if(body.results.length > 0){
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            })
        }else{
            callback('Erro de retorno do web service');
        }
        //console.log(encode); Funciona pois o main ainda estará ativo durante as execuções das callbacks
    });
}

module.exports = {
    geocodeRequest
}
