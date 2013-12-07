/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/3/13
 * Time: 4:02 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PhotoWithTextSchema = new Schema({
    photo_id: { type: ObjectId , index:true },
    author_id: {type: ObjectId},
    desInfo:{type: ObjectId},


    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

mongoose.model('PhotoWithText', PhotoWithTextSchema);