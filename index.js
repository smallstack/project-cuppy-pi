
var onoff = require("onoff");
var mc = require('node-mac-address');

// setup
var Gpio = onoff.Gpio;
var button = new Gpio(7, 'in', 'both');
var led1 = new Gpio(13, 'out');
var led2 = new Gpio(15, 'out');

// mac address stuff
mc.getMAC(function (err, MAC) {
    console.log(MAC);
});

// stuff
button.watch(function (err, value) {
    if (err) {
        throw err;
    }
    led.writeSync(value);
});
