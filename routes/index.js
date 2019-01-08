// const express = require('express');
var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
var express = require('express');
var baseUrl = 'https://www.xin.com'; 
const cheerio = require('cheerio');
const carController = require("../server/controller/carController");

var app = express();
app.use(express.static('static'))
const routes = (app) => {
  /* 获取车列表路由 */
  app.get('/carlist', function(req, res) {
    //设置请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // 参数
    console.log("参数---",req.query)
    // 所在城市
    const city = req.query.city || "beijing";
    // 车品牌
    const type = req.query.type || "baoma";
    // 页码
    const page = req.query.page || 1;
    // 请求路径
    const route = `/${city}/${type}/i${page}`;
    console.log(baseUrl + route);  
    superagent.get(baseUrl + route)
        .charset('utf-8')
        .end(function(err, sres) {
            const items = [];
            if (err) {
                console.log('ERR: ' + err);
                res.render('error', { data: res.json({code: 400, msg: err, sets: items}) })
                return;
            }
            const $ = cheerio.load(sres.text);
            $('div.carlist-show div.list-con ul li.con div.across a').each(function(idx, element) {
                const $element = $(element);
                const $subElement = $element.find('img');
                const thumbImgSrc = $subElement.attr('src');
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    thumbSrc: thumbImgSrc
                });
            });
            items.forEach(element => {
              carController.addCarAction(element); 
            });
            carController.getCarListAction();
            // fs.access(path.join(__dirname, '/img.json'), fs.constants.F_OK, err => {
            //   // 文件不存在
            //     if (err) { 
            //         fs.writeFile(path.join(__dirname,'/img.json'), JSON.stringify([
            //             {
            //                 route,
            //                 items
            //             }
            //         ]), err => {
            //             if(err) {
            //                 console.log(err)
            //                 return false
            //             }
            //             console.log('保存成功')
            //         })
            //     } else {
            //         fs.readFile(path.join(__dirname, '/img.json'), (err, data) => {
            //             if (err) {
            //                 console.log(err)
            //                 return false
            //             }
            //             data = JSON.parse(data.toString())
            //             let exist = data.some((page, index) => {
            //                 return page.route == route
            //             })
            //             if (!exist) {
            //                 fs.writeFile(path.join(__dirname, 'img.json'), JSON.stringify([
            //                     ...data,
            //                     {
            //                         route,
            //                         items
            //                     },
            //                 ]), err => {
            //                     if (err) {
            //                         console.log(err)
            //                         return false
            //                     }
            //                 })
            //             }
            //         })
            //     }
            //     // res.json({ code: 200, msg: "", data: items });
            //     res.render('index', { data: res.json({code: 200, msg: "", data: items}) })
            // })
            // console.log(items)
        });
  });
}
module.exports = routes;
