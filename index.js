
var onoff = require("onoff");
var mc = require('node-mac-address');
var https = require('https');

// setup
var Gpio = onoff.Gpio;
var button0 = new Gpio(18, 'in', 'both');
// var button1 = new Gpio(18, 'in', 'both');
var led1 = new Gpio(14, 'out');

// mac address stuff
var mac = undefined;
mc.getMAC(function (err, MAC) {
    console.log(MAC);
	mac = MAC;
});

// stuff


button0.watch(function (err, value) {
	led1.writeSync(value);
	https.request({
		protocol: "https:",
		path: "/api/" + mac + "/0/up",
		hostname: "cuppy.io",
		method: "POST"
	});
});


process.on('SIGINT', function() {
	led1.unexport();
	button1.unexport();
});