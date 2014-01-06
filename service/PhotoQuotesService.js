/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/10/13
 * Time: 10:49 PM
 * To change this template use File | Settings | File Templates.
 */


var PhotoWithText = require('../dbHelper/photoWithText');
var photo = require('../dbHelper/photo');
var quotes = require('../dbHelper/quotes');
var EventProxy = require('EventProxy');
var ObjectId = require('mongoose').Types.ObjectId;

exports.newPhotoWithText = function(userId, data, callback){

    if(typeof(userId) === 'string'){
        userId = new ObjectId(userId);
    }

    var proxy = new EventProxy();
    var events = ['photo','quotes'];

    proxy.assign(events, function(photo, quotes){
       var photoWithText = new PhotoWithText();
       var photoId = photo ? photo._id : null;
       var quotesId = quotes ? quotes._id : null;
       PhotoWithText.newPhotoWithText(userId, photoId, quotesId, {},callback);
    }).fail(callback);

    if(data && data.photo){
        photo.newPhoto(userId, data.photo, proxy.done);
    }else{
        proxy.emit('photo',{});
    }

    if(data && data.quotes){
        quotes.newQuotes(userId, data.quotes, proxy.done);
    }else{
        proxy.emit('quotes',{});
    }
}


/**
 * 获取最新的图文信息
 * @param pageSize
 * @param pageIndex
 * @param callback
 */
exports.getLatestOne = function(pageSize, pageIndex, callback){

    PhotoWithText.getLatestContent(pageSize, pageIndex, function(err, docs){

        if(err || docs.length == 0){
            return callback(err,[]);
        }else{

            var proxy = new EventProxy();
            var contents = [];
            proxy.after('content_ready',docs.length, function(){
                return callback(null, contents);
            }).fail(callback);

            docs.forEach(function(doc,i){
                var et = new EventProxy();
                var events = ['photo','quotes'];
                et.assign(events, function(photo, quotes){
                    doc.photo = photo;
                    doc.qutoes = quotes;
                    contents[i] = doc;
                    proxy.emit('content_ready');
                })
                if(doc && doc.photo_id){
                   var photoId = (typeof(doc.photo_id) === 'string') ? (new ObjectId(doc.photo_id)) : doc.photo_id;
                   photo.getPhotoById(photoId, proxy.done);
                }else{
                    proxy.emit('photo',{});
                }

                if(doc && doc.quotes_id){
                    var quotesId = (typeof(doc.quotes_id) === 'string') ? (new ObjectId(doc.quotes_id)) : doc.quotes_id;
                    quotes.getQuotesById(quotesId, proxy.done);
                }else{
                    proxy.emit('quotes',{});
                }
            })
        }
    })
}

