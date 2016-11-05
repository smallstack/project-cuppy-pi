
var gpio = require("pi-gpio");

module.export = function () {


    gpio.open(7, "input", function (err) {
        while (true)
            gpio.read(7, 1, function (err, val) {
                if (err)
                    console.error("val was", val);
                else
                    console.log("val was", val);
            });
    });
}
