var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PhotoSchema = new Schema({
    photo_id: { type: ObjectId , index:true },
    author_id: {type: ObjectId},
    creator_name:{type: String},/*当此为空时，默认使用author_id*/
    photo_url:{type: String},
    tags:{type: Array},

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

mongoose.model('Photo', PhotoSchema);
