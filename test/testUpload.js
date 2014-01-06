/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/11/13
 * Time: 1:43 AM
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
//var Buffer = require('Buffer');
var fs = require('fs');
//
//var testUpload = function(){
//
//    var boundaryKey = Math.random().toString(16);
//
//    var options = {
//        host: '127.0.0.1',
//        port: 3000,
//        path: '/photo/upload',
//        method: 'POST',
//        headers :{
//         //   'Content-length':100,
//     //       'Content-Type' : 'image/jpeg'
//            'Content-Type': 'application/x-www-form-urlencoded'
//          //  'Content-Length': post_data.length
//        }
//    };
//
//    var reqHttps = http.request(options, function(resHttps) {
//        console.log("statusCode: ", resHttps.statusCode);
//        console.log("headers: ", resHttps.headers);
//
//        resHttps.on('data', function(body1) {
//            console.log("body:"+body1);
//        });
//    });
//
//    var payload = '--' + boundaryKey + '\r\n'
//        // use your file's mime type here, if known
//        + 'Content-Type: image/jpeg\r\n'
//        // "name" is the name of the form field
//        // "filename" is the name of the original file
//        + 'Content-Disposition: form-data; name="media"; filename="10.jpg"\r\n'
//        + 'Content-Transfer-Encoding: binary\r\n\r\n';
//    console.log(payload.length);
//    var enddata  = '\r\n--' + boundaryKey + '--';
//    console.log('enddata:'+enddata.length);
//    reqHttps.setHeader('Content-Type', 'multipart/form-data; boundary='+boundaryKey+'');
//   // reqHttps.setHeader('Content-Length', Buffer.byteLength(payload)+Buffer.byteLength(enddata)+req.files.media.size);
//
//    reqHttps.write(payload);
//
//    var fileStream = fs.createReadStream("E:\\10.png", { bufferSize: 4 * 1024 });
//    fileStream.pipe(reqHttps, {end: false});
//    fileStream.on('end', function() {
//        // mark the end of the one and only part
//        reqHttps.end(enddata);
//
//    });
//
//    reqHttps.on('error', function(e) {
//        console.error("error:"+e);
//    });
//
//}

var testUpload = function(){
    var http = require("http");
    var fs = require("fs");
    //var configs = require("./configs");

    var fileName = "10.png";
    var filePath = 'E:\\10.png';
    var datas = fs.readFileSync(filePath);
    console.log(datas);

    var relativePath = 'sdfdsf';

    var boundary = "---------------------------leon";
    var formStr = '--' + boundary
        + '\r\n'
        + 'Content-Disposition: form-data; name="fileName"'
        + '\r\n\r\n'
        //+ '测试啊'
        + encodeURIComponent(fileName)
        + '\r\n'
        + '--' + boundary
        + '\r\n'
        + 'Content-Disposition: form-data; name="relativePath"'
        + '\r\n\r\n'
        + /*configs.relativePath*/  relativePath
        + '\r\n'
        + '--' + boundary
        + '\r\n'
        + 'Content-Disposition: form-data; name="upfile"; filename="' + encodeURIComponent(fileName) + '"'
        + '\r\n'
        + 'Content-Type: application/octet-stream'
        + '\r\n\r\n';

    var formEnd = '\r\n--' + boundary + '--\r\n';
    var options = {
        host : "127.0.0.1",
        port : 3000,
        method : "POST",
        path : "/photo/upload",
        headers : {
            "Content-Type" : "multipart/form-data; boundary=" + boundary,
            "Content-Length" : formStr.length + datas.length + formEnd.length
        }
    };

    var req = http.request(options, function(res) {
        res.on("data", function(data) {
            console.log("返回数据" + data);
        });
    });

    req.write(formStr);
    req.write(datas);
    req.write(formEnd);
    req.end();
}


testUpload();