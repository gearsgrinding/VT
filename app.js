// Modules
var express = require('express');
var path = require('path');
var request = require('request');

// Create app
var app = express();
var port = 3000;

// Cores data
cores = {
  servo_core: '53ff6e066667574810461267'
};

// Token
access_token = '11225f235b85585dff705aac098f240783d4a310';

// Base address
address = 'https://api.spark.io/v1/devices/';

// Set views
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Serve files
app.get('/', function(req, res){
  res.sendfile('views/interface.html')
});

// API access
app.get("/get", function(req, res){
	  
  // Request options
  var options = {timeout: 2000, json: true};
      
    // Make request
    command = address + cores[req.query['core']] + req.query['command'] + '?access_token=' + access_token ;
    request(command, options, function (error, response, body) {
    if (!error){
      console.log(body);
      res.json(body);  
    }
    else {
      console.log("Core offline");
      res.json({coreInfo: {connected: false}}); 
    }
  });
});

app.get("/post", function(req, res){

  // Command
  command = address + cores[req.query['core']] + req.query['command'];
	  
  // Make request
  request(command, 
    {headers: {'Content-type': 'application/x-www-form-urlencoded'},
      method: 'POST', 
      json: true,
      body: "access_token=" + access_token + "&args=" + req.query['params'],
      timeout: 2000}, function (error, response, body) {
    if (!error){
      console.log(body);
      res.json(body);  
    }
    else {
      console.log("Core offline");
      res.json({coreInfo: {connected: false}});
    }
  });
});

// Start server
app.listen(port);
console.log("Listening on port " + port);