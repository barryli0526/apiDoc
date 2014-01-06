/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/4/13
 * Time: 4:27 AM
 * To change this template use File | Settings | File Templates.
 */


var models = require('../models');
var PhotoWithText = models.PhotoWithText;


/**
 * 新建图文信息
 * @param userId
 * @param photoId
 * @param quotesId
 * @param data
 * @param callback
 */
exports.newPhotoWithText = function(userId, photoId, quotesId, data, callback){

    var photoText = new PhotoWithText();

    photoText.author_id = userId;
    photoText.photo_id = photoId;
    photoText.desInfo = quotesId;

    for(var i in data){
        photoText[i] = data[i];
    }

    photoText.save(callback);

}

/**
 * 获取最新的图文内容
 * @param pageSize
 * @param pageIndex
 * @param callback
 */
exports.getLatestContent = function(pageSize, pageIndex, callback){

    var skip, limit;
    if(typeof(pageSize) === "function"){
        callback = pageSize;
        skip = {};
        limit = {};
    }else{
        var listCount = pageSize ? (pageSize) : 1;
        pageIndex = pageIndex > 0 ? (pageIndex): 0;
        skip = pageIndex*listCount;
        limit = listCount;
    }

    PhotoWithText.find({}).sort({date:'desc'}).skip(skip).limit(limit).exec(function(err, docs){
        if(err){
            return callback(err);
        }else if(docs.length === 0){
            return callback(null, []);
        }else{
            return callback(null, docs);
        }
    })
}