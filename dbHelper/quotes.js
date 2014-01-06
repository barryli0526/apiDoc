/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/4/13
 * Time: 4:34 AM
 * To change this template use File | Settings | File Templates.
 */


var models = require('../models');
var Quotes = models.Quotes;


exports.newQuotes = function(userId, data, callback){
    var quotes = new Quotes();
    quotes.creator_id = userId;
    for(var i in data){
        quotes[i] = data[i];
    }
    quotes.save(callback);
}

exports.getQuotesById = function(quotesId, callback){
    quotes.find({_id:quotesId}, callback);
}