// 添加数据到db库
exports.add = function (model, conditions) {
  console.log(model);
  return new Promise(function(resolve,reject){
    model.save(conditions, function(err, result) {
      if (err) {
        console.log("dbHelper add:", err);
        reject({success: 0, message: err, data: {} })
      } else {
        console.log("dbHelper add:", "add success")
        resolve({success: 1, message: "add data success", data: result});
      }
    })
  })
}
// 获取数据
exports.getList = function (model, conditions, fields, options) {
  return new Promise(function(resolve, reject) {
    model.find(conditions, fields, options, function(err, result) {
      if(err) {
          console.log("dbHelper getList", err);
          reject({success: 0, message: err, data: {} })
      } else {
        console.log("dbHelper getList", result);
        if(result.length !== 0 ) {
          resolve({success: 1, message: "find data success", data: result});
        } else {
          resolve({success: 0, message: "data is empty", data: result});
        }
      }
    })
  })
}