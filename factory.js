var Chromecast = require('./chromecast');
var parseString = require('xml2js').parseString;
var request = require('request');
var Promise = require('promise');

var Factory = function() {
};

Factory.prototype.createFromSsdpHeaders = function(headers) {
  return new Promise(function (resolve, reject) {
    request(headers.LOCATION, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parseString(body, {trim: true, explicitArray: false, explicitRoot: false}, function (err, result) {
          resolve(new Chromecast(result.device.UDN, result.URLBase, result.device));
        });
      }
    });
  });
};

module.exports = Factory;

