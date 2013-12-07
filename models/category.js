/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/3/13
 * Time: 3:56 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
    parent_id: { type: ObjectId},
    category_name: { type: String},
    category_searchname:{type: String},
    category_description:{ type: String},
    author_id:{type:ObjectId},

    category_imgpath:{ type: String},
    create_at:{ type: Date, default: Date.now},
    update_at:{ type: Date, default: Date.now}
});

mongoose.model('Category', CategorySchema);