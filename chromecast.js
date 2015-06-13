var parseString = require('xml2js').parseString;
var request = require('request');

var Chromecast = function(udn, urlBase, deviceInfos) {
  this.udn = udn;
  this.urlBase = urlBase;
  this.deviceInfos = deviceInfos;
};

Chromecast.prototype.getUdn = function() {
  return this.udn;
};

Chromecast.prototype.getDeviceInfo = function() {
  return this.deviceInfos;
};

Chromecast.prototype.launchApp = function(appId, parameters) {
  request.post(this.urlBase + '/apps/' + appId, {'content-type': 'application/json', body: parameters});
};

Chromecast.prototype.killApp = function(appId) {
  request.del(this.urlBase + '/apps/' + appId);
};

Chromecast.prototype.getInfos = function() {
  return this.infos;
};

module.exports = Chromecast;
