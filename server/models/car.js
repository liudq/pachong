var mongoose = require('mongoose');
var uri = 'mongodb://username:password@hostname:port/databasename';
uri = "mongodb://localhost/list";
var db = mongoose.connection;
 
mongoose.Promise = global.Promise;  
mongoose.connect(uri,{ useNewUrlParser: true });
 

//监听是否有异常
db.on('error', function callback() { 
  console.log("Connection error！");
});
 
  //创建模式和模型
  console.log('connected!');
  const CarSchema = mongoose.Schema({
    carId: Number,
    title:String,
    url:String,
    src:String,
    price: Number
  });
  const _getModel = function () {
    const carModel = mongoose.model("Car", CarSchema);
    return carModel;
  }
  module.exports = {
    getModel: function() {
      return _getModel();
    }
  }

