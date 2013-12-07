/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/6/13
 * Time: 2:41 AM
 * To change this template use File | Settings | File Templates.
 */
var userService = require('../service/UserService');


/**
 * 关注用户
 * @param req
 * @param res
 * @param next
 */
exports.follow = function(req, res){
    var data = req.body;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(data.length == 0 || !data.UID || !data.FID){
           res.end('{status:"failure",err:"UID and FID must be needed!"}');
    }else{
        userService.FollowUser(data.UID, data.FID, function(err){
            if(err){
                res.end('{status:"failure",err:'+err+'}');
            }else{
                res.end('{status:"success"}');
            }
        })
    }

}


/**
 * 取消关注用户
 * @param req
 * @param res
 */
exports.unfollow = function(req, res){
    var data = req.body;
    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(data.length == 0 || !data.UID || !data.FID){
        res.end('{status:"failure",err:"UID and FID must be needed!"}');
    }else{
        userService.unFollowUser(data.UID, data.FID, function(err){
            if(err){
                res.end('{status:"failure",err:"unknown db error"}');
            }else{
                res.end('{status:"success"}');
            }
        })
    }
}


/**
 * 登陆
 * @param req
 * @param res
 */
exports.login = function(req, res){

    var data = req.body;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!data || !data.uName || !data.pwd){
        res.end('{status:"failure",err:"username and password must be needed!"}');
    }else{
        userService.SignIn(data.uName, data.pwd, function(err, user){
            if(err){
                res.end('{status:"failure",err:' + err + '}');
            }else{
                res.write(JSON.stringify(user));
                res.end();
            }
        })
    }
}

/**
 * 注册
 * @param req
 * @param res
 */
exports.register = function(req, res){


   // console.log(req);
   // console.log(req.body);
   // console.log(req);

    var data = req.body;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!data || !data.loginname || !data.pass){
        res.end('{status:"failure",err:"username and password must be needed!"}');
    }else{
        userService.SignUp(data, function(err, user){
            if(err){
                res.end('{status:"failure",err:' + err + '}');
            }else{
                res.write(JSON.stringify(user));
                res.end();
            }
        })
    }
}

/**
 * 获取粉丝列表
 * @param req
 * @param res
 */
exports.getFollowerList = function(req, res){
    var query = req.query;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!query || !query.UID){
        res.end('{status:"failure",err:"user id must be needed!"}');
    }else{
        var listSize = query.listSize ? query.listSize : 10000;
        var listIndex = query.listIndex ? query.listIndex : 0;

        userService.getFollowerList(query.UID, listIndex, listSize, function(err,users){
            if(err){
                res.end('{status:"failure",err:' + err + '}');
            }else{
                res.write(JSON.stringify(users));
                res.end();
            }
        })
    }
}

/**
 * 获取偶像列表
 * @param req
 * @param res
 */
exports.getFollowingList = function(req, res){
    var query = req.query;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!query || !query.UID){
        res.end('{status:"failure",err:"user id must be needed!"}');
    }else{
        var listSize = query.listSize ? query.listSize : 10000;
        var listIndex = query.listIndex ? query.listIndex : 0;

        userService.getFollowingList(query.UID, listSize, listIndex, function(err,users){
            if(err){
                res.end('{status:"failure",err:' + err + '}');
            }else{
                res.write(JSON.stringify(users));
                res.end();
            }
        })
    }
}


/**
 * 获取用户列表
 * @param req
 * @param res
 */
exports.getUserList = function(req, res){

    var query = req.query;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var listSize = query.listSize ? query.listSize : 10000;
    var listIndex = query.listIndex ? query.listIndex : 0;

    userService.getUserList(listSize, listIndex, function(err, users){
         if(err){
             res.end('{status:"failure",err:' + err + '}');
         }else{
             res.write(JSON.stringify(users));
             res.end();
         }
    })
}