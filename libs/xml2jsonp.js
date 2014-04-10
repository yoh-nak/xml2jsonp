
var http = require('http');
var xmljson = require('xmljson');

exports.convert = function(req, res){

    var testUrl = 'http://wikipedia.simpleapi.net/api?keyword=HTTP&output=xml';

    var api = req.query.api ? req.query.api : testUrl;
    var callback = req.query.callback ? req.query.callback : 'callback';

    var xml = '';

    http.get(api, function(response) {

        response.setEncoding('utf8');
        response.on('data', function(str) {
            xml += str;

            xmljson.to_json(xml, function (error, data) {

                var jsonp = callback + '(' + JSON.stringify(data) + ')';
                
                res.header('Content-Type', 'text/javascript; charset=UTF-8');
                res.send(jsonp);

            });
        });
    }).on('error', function(e){
        console.log(e.message);
    });
}
