const car = require("../models/car");

exports.addCar = function(conditions, dbHelpers, callback) {
    const carModal = car.getModel();
    dbHelpers.add(carModal, conditions).then(function(result){
        callback(result);
    })
}

exports.getCarList = function(conditions, dbHelpers, callback) {
    const carModal = car.getModel();
    const fields   = {};
    const options  = {};
    dbHelpers.getList(carModal, conditions, fields, options).then(function(result){
        callback(result);
    })
}