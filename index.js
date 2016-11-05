
var onoff = require("onoff");
var mc = require('node-mac-address');

// setup
var Gpio = onoff.Gpio;
var button1 = new Gpio(18, 'in', 'both');
var led1 = new Gpio(14, 'out');

// mac address stuff
mc.getMAC(function (err, MAC) {
    console.log(MAC);
});

// stuff


button1.watch(function (err, value) {
	led1.writeSync(value);
	console.log("button1: " + value);
	    if (err) {
	        throw err;

    }
});


process.on('SIGINT', function() {
	led1.unexport();
	button1.unexport();
});