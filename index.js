var Client = require('node-ssdp').Client;
var client = new Client();
var Chromecast = require('./chromecast');
var ChromecastManager = require('./manager');
var Factory = require('./factory');
var express = require('express');
var app = express();


// init
var chromecastManager = new ChromecastManager();
var factory = new Factory();

var chromecastDevices = [];

client.on('response', function (headers) {
  factory.createFromSsdpHeaders(headers).then(function(chromecast) {
    chromecastManager.add(chromecast);
  });
});

client.on('advertise-alive', function (headers) {
  factory.createFromSsdpHeaders(headers).then(function(chromecast) {
    chromecastManager.add(chromecast);
  });
});

client.on('advertise-bye', function (headers) {
  chromecastManager.remove(headers.USN.split('::')[0]);
});

// search for a service type
client.search('urn:dial-multiscreen-org:service:dial:1');

app.get('/', function(req, res) {
  res.json({ message: chromecastManager.getDevices() });
});

app.get('/launch', function(req, res) {
  chromecastManager.getDevices().forEach(function(chromecast) {
    chromecast.launchApp('YouTube', 'v=oHg5SJYRHA0');
  });
  res.json('ok');
});

app.get('/kill', function(req, res) {
  chromecastManager.getDevices().forEach(function(chromecast) {
    chromecast.killApp('YouTube');
  });
  res.json('ok');
});

var port = process.env.PORT || 8080;
app.listen(port);

