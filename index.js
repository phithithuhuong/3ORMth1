"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var upload = (0, multer_1.default)();
// import express from 'express';
// import bodyParser from 'body-parser';
var data_source_1 = require("./src/data-source");
// thiết lập kết nối với cơ sở dữ liệu
data_source_1.AppDataSource
    .initialize()
    .then(function () {
    console.log('data source has been initialize !');
})
    .catch(function (err) {
    console.log('err');
});
//# sourceMappingURL=index.js.map