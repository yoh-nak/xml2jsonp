
/*
 * GET home page.
 */

exports.index = function(req, res){

    var xml2jsonp = require('../libs/xml2jsonp');
    xml2jsonp.convert(req, res);

};