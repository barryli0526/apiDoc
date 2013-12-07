/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/3/13
 * Time: 3:51 AM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var QuotesSchema = new Schema({
    quotes_id: { type: ObjectId , index:true, unique:true },
    creator_id: {type: ObjectId},
    content:{type: String},
    from:{type: String},
    category:{type: String},

    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});

mongoose.model('Quotes', QuotesSchema);