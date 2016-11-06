var onoff = require("onoff");
var mc = require('node-mac-address');
var https = require('https');

// I/O
var Gpio = onoff.Gpio;
var button0 = new Gpio(23, 'in', 'both');
var button1 = new Gpio(24, 'in', 'both');
var button2 = new Gpio(17, 'in', 'both');
var button3 = new Gpio(27, 'in', 'both');

// mac address stuff
var mac = undefined;
mc.getMAC(function (err, MAC) {
    console.log("DeviceID: " + MAC);
    mac = MAC;
});

// watching buttons
function sendRequest(teamId, direction) {
    console.log("POST https://cuppy.io/api/" + mac + "/" + teamId + "/" + direction);
    https.request({
        protocol: "https:",
        path: "/api/" + mac + "/" + teamId + "/" + direction,
        hostname: "cuppy.io",
        method: "POST"
    });
}

function watchButton(teamId, direction) {
    return function (err, value) {
        if (err)
            console.error(err);
        else
            sendRequest(teamId, direction);
    }
}
button0.watch(watchButton(0, "up"));
button1.watch(watchButton(0, "down"));
button2.watch(watchButton(1, "up"));
button3.watch(watchButton(1, "down"));


process.on('SIGINT', function () {
    button0.unexport();
    button1.unexport();
    button2.unexport();
    button3.unexport();
});
