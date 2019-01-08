const dbHelper = require("../dbHelper/dbHelper");
const carDao = require("../dbSql/carDao");

exports.addCarAction = function(carobj) {
  console.log("carobj111",carobj);
  carDao.addCar(carObj,dbHelper);
}

exports.getCarListAction = function() {
  
  return function (req, res) {
    const conditions = {};
    carDao.getCarList(conditions, dbHelper, function(result) {
      res.json(result);
    })
  }
}