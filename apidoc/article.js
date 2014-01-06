/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/6/13
 * Time: 4:19 AM
 * To change this template use File | Settings | File Templates.
 */

var ArticleServicde = require('../service/articleService');


/**
 * 新建一篇文章
 * @param req
 * @param res
 */
exports.newPost = function(req, res){

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if (!req.session || !req.session.user) {
        res.send({ status: 'forbidden' });
        return;
    }

    var user = req.session.user;

    var article = req.body;

    article.top = article.top ? true : false;
    article.enable_comment = article.enable_comment ? true : false;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    ArticleService.CreateArticle(user._id, article, function(err, article){
        if(err || !article){
            res.end('{status:"failure",err:' + err || "添加失败" + '}');
        } else{
            res.write(JSON.stringify(article));
            res.end();
        }
    })
}


/**
 * 删除文章
 * @param req
 * @param res
 * @constructor
 */
exports.Delete = function(req, res){

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!req.session.user){
        res.send({ status: 'forbidden' });
        return;
    }

    var user = req.session.user;
    var articleIds = req.body.articleIds;

    ArticleService.deleteMultiArticlesOfUser(articleIds, user._id, function(err){
        if(err){
            res.end('{status:"failure",err:' + err + '}');
        }else{
            res.end('{status:"success"');
        }

    })

}


/**
 * 更新文章
 * @param req
 * @param res
 * @constructor
 */
exports.Update = function(req, res){

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!req.session.user){
        res.send({ status: 'forbidden' });
        return;
    }
    var user = req.session.user;
    var articleid = req.params.articleid;

    var article = req.body;


    article.top = article.top ? true : false;
    article.enable_comment = article.enable_comment ? true : false;

    ArticleService.UpdateArticle(articleid,article, function(err, article){
        if(err || !article){
            res.end('{status:"failure",err:' + err || "更新失败" + '}');
        }else{
            res.write(JSON.stringify(article));
            res.end();
        }
    })

}

/**
 * 获取用户文章
 * @param req
 * @param res
 */
exports.getArticleListOfUser = function(req, res){
    var params = req.params;
    var user = req.session.user;
    var userId = query ? query.userId : (user ? user._id : null);

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!userId){
        res.end('{status:"failure",err:"user id must specified!"}');
    }

    var listSize = query.listSize ? query.listSize : 10000;
    var listIndex = query.listIndex ? query.listIndex : 0;

    ArticleService.getAritleListOfUserId(userId, listSize, listIndex, function(err, articles){
        if(err || !articles || articles.length == 0){
            res.end('{status:"failure", err:'+ err || '获取列表失败' +'');
        }else{
            res.write(JSON.stringify(articles));
            res.end();
        }

    })
}

/**
 * 获取最新文章
 * @param req
 * @param res
 */
exports.getLatestArticles = function(req, res){

    var query = req.query ? req.query : {};
    var count = query.count ? query.count : 1;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    ArticleServicde.getLatestArticles(count, function(err, articles){
        if(err || !articles){
            res.end('{status:"failure",err:' + err || "获取失败" + '}');
        }else{
           // console.log(articles[0]);
            res.write(JSON.stringify(articles));
            res.end();
        }
    })
}

/**
 * 获取文章列表,通过文章id数组或者目录id或者标签数
 * @param req
 * @param res
 */
exports.getArticles = function(req, res){
     var query = req.query;


    var listSize = query.listSize ? query.listSize : 10000;
    var listIndex = query.listIndex ? query.listIndex : 0;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var result = function(err, articles){
        if(err || !articles || articles.length == 0){
            res.end();
        }else{
            res.write(JSON.stringify(articles));
            res.end();
        }
    }

    if(query && query.articleId){
        var ids = (typeof(query.articleId) == 'Array' ? query.articleId : [].push(query.articleId));
        ArticleService.getArticlesByIds(ids, result);
    }else if(query && query.CategoryId){
        ArticleService.getArticlesByCategory(query.CategoryId, listSize, listIndex);
    }else if(query && query.Tags){
        ArticleService.getArticlesByTag(query.Tags, result);
    }
}

