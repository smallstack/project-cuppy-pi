# Rasbperry Pi Cuppy Project
A Raspberry Pi integration for the cuppy live tournament mode. The API is simple: 

https://cuppy.io/api/devices/DEVICE_ID/COMMAND

This sample project implements four buttons which send the related rest commands, score up/down for 2 teams. The cuppy.io UI helps you to map them to changing the score, see https://cuppy.io/devices

# How-to run
- export a deviceId, e.g. ```SET DEVICE_ID=smallstackOfficePi```
- run ```npm install```
- run ```npm run start``` or ```node index.js```

If you want to use more or less buttons or if you want to use different pins, feel free to change the index.js
