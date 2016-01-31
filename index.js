var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-chacon", "chacon", ChaconAccessory);
}

function ChaconAccessory(log, config) {
  this.log          = log;
  this.zone         = config['zone'];
  this.point        = config['point'];
  this.device       = config["device"];
  this.baudrate     = config["baudrate"] || 9600;

  this.sp = new SerialPort(this.device, {
    parser: serialport.parsers.readline("\n"),
    baudrate: this.baudrate
  });
}

ChaconAccessory.prototype = {
  setPowerState: function(powerOn, callback) {
    var that        = this;
    var command     = powerOn ? this.zone + "," + this.point + ",1 k" : this.zone + "," + this.point + ",0 k";
    that.sp.open(function (error) {
      if (error) {
        that.log('failed to open: '+error);
      } else {
        that.log('open');
        that.sp.write(command, function(err, results) {
          if(err){
            that.log('err ' + err);
          } else {
            that.log('results ' + results);
          }
          callback(null);
        });
      }
    });
  },
  
  getServices: function() {
    var switchService = new Service.Switch(this.name);
    var informationService = new Service.AccessoryInformation();

    informationService
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model_name)
      .setCharacteristic(Characteristic.SerialNumber, this.id);

    switchService
      .getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this));

    return [informationService, switchService];
  }
}

module.exports.accessory = ChaconAccessory;