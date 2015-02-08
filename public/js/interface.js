// Refresh sensor data
setInterval(function() {

  // Update light level & core status
  $.get('/get', {command: '/light', core: 'sensor_core'}, function(json_data) {
    // Core status
    if (json_data.coreInfo['connected'] == true){
      $("#sensorsCoreStatus").html("Core Online");
      $("#sensorsCoreStatus").css("color","green");    
    }
    else {
      $("#sensorsCoreStatus").html("Core Offline");
      $("#sensorsCoreStatus").css("color","red");     
    }
  });

}, 1000);

setInterval(function() {

 // Update relay Core status
 $.get('/get', {command: '', core: 'servo_core'}, function(json_data) {
  if (json_data.connected == true){
    $("#relayCoreStatus").html("Core Online");
    $("#relayCoreStatus").css("color","green");    
  }
  else {
    $("#relayCoreStatus").html("Core Offline");
    $("#relayCoreStatus").css("color","red");     
  }
 });

}, 1000);

// Function to control the lamp
function buttonClick(clicked_id){

  if (clicked_id == "1"){
    $.get('/post', {command: '/servo', core: 'servo_core', params: '1'});
  } 

}