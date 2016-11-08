var onoff = require("onoff");
var mc = require('node-mac-address');
var https = require('https');

var lastRequest = undefined;

// I/O
var Gpio = onoff.Gpio;
var button0 = new Gpio(18, 'in', 'rising');
var button1 = new Gpio(22, 'in', 'rising');
var button2 = new Gpio(23, 'in', 'rising');
var button3 = new Gpio(24, 'in', 'rising');

// device id
var deviceId = process.env.DEVICE_ID;
if (!deviceId)
    throw new Error("Please set the environment variable 'DEVICE_ID' to identify your device in cuppy!");

// watching buttons
function sendRequest(command) {
	if (isSleeping())
		return false;
	sleep();
    console.log("POST https://cuppy.io/api/devices/" + deviceId + "/" + command);
    try {
	    var req = https.request({
	        protocol: "https:",
	        path: "/api/" + deviceId + "/" + command,
	        hostname: "cuppy.io",
	        method: "POST"
	    }, function(res) {
		console.log("response: ", res);
	});
		req.on('error', function (error) {
		//console.error(error);
	});
	}
	catch (e) {
		console.error(e);
	}
}

function watchButton(command) {
    return function (err, value) {
        if (err)
            console.error(err);
        else {
		if (value === 1)
            		sendRequest(command);
	}
    }
}

function sleep() {
	lastRequest = new Date().getTime();
}

function isSleeping() {
	if (lastRequest === undefined)
		return false;
	var now = new Date().getTime();
	var isSleeping = (now - 500) < lastRequest;
	return isSleeping;
}
button0.watch(watchButton("0_up"));
button1.watch(watchButton("0_down"));
button2.watch(watchButton("1_up"));
button3.watch(watchButton("1_down"));

console.log("Listening...");

process.on('SIGINT', function () {
    button0.unexport();
    button1.unexport();
    button2.unexport();
    button3.unexport();
});
