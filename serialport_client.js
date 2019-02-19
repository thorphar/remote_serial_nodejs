const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM17', {baudRate: 500000});
var dataseral;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
var net = require('net');
var client = new net.Socket();

port.on('open', showPortOpen);
parser.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

function showPortOpen() {
   console.log('port open. Data rate: ' + port.baudRate);
}
 
function readSerialData(data) {
	dataseral = data
   console.log(data);
   if(data.toString() == "END"){
   	console.log('END');
   	client.destroy();
   }
   else{
   client.write(data+'\n');
}
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}


client.connect(7070, '127.0.0.1', function() {
	console.log('Connected');
	//client.write(dataseral.toString());
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	//client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});