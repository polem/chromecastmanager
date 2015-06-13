var ChromecastManager = function() {
  this.devices = new Map();
};

ChromecastManager.prototype.add = function(chromecast) {
  this.devices.set(chromecast.getUdn(), chromecast);
};

ChromecastManager.prototype.remove = function(udn) {
  this.devices.delete(udn);
};

ChromecastManager.prototype.getDevices = function() {
  return this.devices;
};

module.exports = ChromecastManager;

