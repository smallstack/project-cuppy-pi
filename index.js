var onoff = require("onoff");
var mc = require('node-mac-address');
var https = require('https');

// I/O
var Gpio = onoff.Gpio;
var button0 = new Gpio(23, 'in', 'both');
var button1 = new Gpio(24, 'in', 'both');
var button2 = new Gpio(17, 'in', 'both');
var button3 = new Gpio(27, 'in', 'both');

// device id
var deviceId = process.env.DEVICE_ID;
if (!deviceId)
    throw new Error("Please set the environment variable 'DEVICE_ID' to identify your device in cuppy!");

// watching buttons
function sendRequest(command) {
    console.log("POST https://cuppy.io/api/" + deviceId + "/" + command);
    https.request({
        protocol: "https:",
        path: "/api/" + deviceId + "/" + command,
        hostname: "cuppy.io",
        method: "POST"
    });
}

function watchButton(command) {
    return function (err, value) {
        if (err)
            console.error(err);
        else
            sendRequest(command);
    }
}
button0.watch(watchButton("0_up"));
button1.watch(watchButton("0_down"));
button2.watch(watchButton("1_up"));
button3.watch(watchButton("1_down"));


process.on('SIGINT', function () {
    button0.unexport();
    button1.unexport();
    button2.unexport();
    button3.unexport();
});
