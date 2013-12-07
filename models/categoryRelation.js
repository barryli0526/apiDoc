/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/3/13
 * Time: 4:06 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategoryRelationSchema = new Schema({
    category_id: { type: ObjectId ,index: true},
    content_id: { type: ObjectId }
});

mongoose.model('CategoryRelation', CategoryRelationSchema);
