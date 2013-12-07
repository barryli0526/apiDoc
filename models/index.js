var mongoose = require('mongoose');
var config = require('../config/base').config;

mongoose.connect(config.db, function(err){
	if(err){
		console.error('connect to %s error: ', config.db, err.message);
		process.exit(1);
	}
});

require('./article');
require('./articleInfo');
require('./category');
require('./categoryInfo');
require('./categoryRelation');
require('./user');
require('./photo');
require('./photoWithText');
require('./quotes');
require('./comment');
require('./commentInfo');
require('./relation');
require('./tag');
require('./user');
require('./userInfo');

exports.User = mongoose.model('User');
exports.Article = mongoose.model('Article');
exports.Category = mongoose.model('Category');
exports.CategoryRelation = mongoose.model('CategoryRelation');
exports.Photo = mongoose.model('Photo');
exports.PhotoWithText = mongoose.model('PhotoWithText');
exports.Quotes = mongoose.model('Quotes');
exports.Relation = mongoose.model('Relation');
exports.Comment = mongoose.model('Comment');
exports.ArticleInfo = mongoose.model('ArticleInfo');
exports.CategoryInfo = mongoose.model('CategoryInfo');
exports.CommentInfo = mongoose.model('CommentInfo');
exports.Tag = mongoose.model('Tag');
exports.UserInfo = mongoose.model('UserInfo');