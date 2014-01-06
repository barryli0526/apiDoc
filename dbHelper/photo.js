/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/4/13
 * Time: 4:26 AM
 * To change this template use File | Settings | File Templates.
 */
var models = require('../models');
var Photo = models.Photo;


exports.newPhoto = function(userId, data, callback){
    var photo = new Photo();
    photo.author_id = userId;
    for(var i in data){
        photo[i] = data[i];
    }
    photo.save(callback);
}


exports.getPhotoById = function(photoId, callback){
    photo.find({_id:photoId}, callback);
}