# homebridge-chacon
Homebridge plugin to control Chacon power plugs.
Includes on/off control. Reading power plug state is not possible.

### Configuration:

```json
"accessories": [
   {
       "accessory": "chacon",
       "name": "Huisje",
       "device": "/dev/ttyUSB0",
       "baudrate": 9600,
       "zone": "1",
       "point": "1"
   }
]
```

#### Default values:
 * baudrate: 9600

### Dependencies:
 * Homebridge: https://github.com/nfarina/homebridge
 * node-serialport: https://github.com/voodootikigod/node-serialport

### Usage:
 - *Siri, turn Huisje on*
 - *Siri, turn Huisje off*