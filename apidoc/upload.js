var fs = require('fs');
var path = require('path');
var ndir = require('ndir');
var config = require('../config/base').config;
var EventProxy = require('eventproxy');
var multipart = require("multipart");
var util = require('../lib/util');



exports.uploadImage = function(req, res, next){
   // console.log('begin upload');
    if (!req.session || !req.session.user) {
        res.send({ status: 'forbidden' });
        return;
    }

    var files = req.files.files ;

    if (!files) {
        res.send(util.combineFailureRes('no files'));
        return;
    }
    var uid = req.session.user._id.toString();
    var userDir = path.join(config.upload_dir, uid);
    ndir.mkdir(userDir, function (err) {
        if (err) {
            return next(err);
        }

        var proxy = new EventProxy();

        var urls = [];

        proxy.after('filesave_ready',files.length,function(){

            res.send(util.combineSuccessRes(urls));

        }).fail(next);


        files.forEach(function(file){
            var filename = Date.now() + '_' + file.name;
            var savepath = path.resolve(path.join(userDir, filename));
            if (savepath.indexOf(path.resolve(userDir)) !== 0) {
                return res.send({status: 'forbidden'});
            }
            fs.rename(file.path, savepath, function (err) {
                if (err) {
                    return next(err);
                }
                var url = '/upload/' + uid + '/' + encodeURIComponent(filename);

                urls.push(url);

                proxy.emit('filesave_ready');
            });
        })
    });

}


//
//exports.uploadImage = function(req, res, next){
//    //req.setBodyEncoding("binary");
//
//   // var stream = new multipart.Stream(req);
//
//    console.log(req.body);
//
//   // stream.addListener("part", function(part) {
//   //    console.log(part);
//
//   // });
//
//}