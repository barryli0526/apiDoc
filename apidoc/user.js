/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/6/13
 * Time: 2:41 AM
 * To change this template use File | Settings | File Templates.
 */
var userService = require('../service/UserService');
var apiSchema = require('../apidoc/apiReturnType/user');
var util = require('../lib/util');


/**
 * 关注用户
 * @param req
 * @param res
 * @param next
 */
exports.follow = function(req, res){

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!req.session.user){
        res.send(util.combineFailureRes('Forbidden! You do not have permission or you do not sign in...'));
        return;
    }
    var user = req.session.user ? req.session.user : {};

    var data = req.body;



    if(data.length == 0 || !data.UID){
           res.end(util.combineFailureRes("UID and FID must be needed!"));
    }else{
        userService.FollowUser(data.UID, user._id, function(err){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                res.end(util.combineSuccessRes([]));
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

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!req.session.user){
        res.send(util.combineFailureRes('Forbidden! You do not have permission or you do not sign in...'));
        return;
    }
    var user = req.session.user ? req.session.user : {};


    var data = req.body;

    if(data.length == 0 || !data.UID){
        res.end(JSON.stringify({status:"failure",err:"UID and FID must be needed!"}));
    }else{
        userService.unFollowUser(data.UID, user._id, function(err){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                res.end(util.combineSuccessRes([]));
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

    if(!data || !data.loginname || !data.pass){
        res.end(util.combineFailureRes("username and password must be needed!"));
    }else{
        userService.SignIn(data.loginname, data.pass, function(err, user){
            if(err || !user){
                res.end(util.combineFailureRes(err));
            }else{
                //write cookie

                util.gen_session(user, res);
                var target = [] ;
                target = util.fetchJSON(target, user,apiSchema.USER);
              //  console.log(target);
                res.write(util.combineSuccessRes(target));
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

    var data = req.body;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    if(!data || !data.loginname || !data.pass){
        res.end(util.combineFailureRes('username and password must be needed!'));
    }else{
        userService.SignUp(data, function(err, user){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                var target = [] ;
                target = util.fetchJSON(target, user,apiSchema.USER);
                res.write(util.combineSuccessRes(target));
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
    var query = req.query ? req.query : {};

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var user = req.session.user ? req.session.user : {};

    var uid =  query.UID ? query.UID : user._id;

    if(!uid){
        res.end(util.combineFailureRes("user id must be needed!"));
    }else{
        var listSize = query.listSize ? query.listSize : 10000;
        var listIndex = query.listIndex ? query.listIndex : 0;

        userService.getFollowerList(uid, listSize, listIndex, function(err,users){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                var target = [] ;
                target = util.fetchJSON(target, users,apiSchema.USERLIST);

                res.write(util.combineSuccessRes(target));
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
    var query = req.query ? req.query : {};

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var user = req.session.user ? req.session.user : {};

    var uid =  query.UID ? query.UID : user._id;

    if(!uid){
        res.end(util.combineFailureRes("user id must be needed!"));
    }else{
        var listSize = query.listSize ? query.listSize : 10000;
        var listIndex = query.listIndex ? query.listIndex : 0;

        userService.getFollowingList(uid, listSize, listIndex, function(err,users){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                var target = [] ;
                target = util.fetchJSON(target, users,apiSchema.USERLIST);
                res.write(util.combineSuccessRes(target));
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

    var query = req.query ? req.query : {};

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var user = req.session.user ? req.session.user : {};

    var uid =  query.UID ? query.UID : user._id;

    var listSize = query.listSize ? query.listSize : 10000;
    var listIndex = query.listIndex ? query.listIndex : 0;

    if(!uid){
        userService.getUserList(listSize, listIndex, function(err, users){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                res.write(util.combineSuccessRes(users));
                res.end();
            }
        })
    }else{
        userService.getUserListByUID(user._id, listSize, listIndex, function(err, users){
            if(err){
                res.end(util.combineFailureRes(err));
            }else{
                var target = [] ;
                target = util.fetchJSON(target, users,apiSchema.USERLIST);
                res.write(util.combineSuccessRes(target));
                res.end();
            }
        })
    }
}



/**
 * 查看是否follow某个用户
 * @param req
 * @param res
 */
exports.isFollow = function(req, res){
    var query =req.query;

    if( !query || !query.UID || !query.FID){
        res.end(util.combineFailureRes("UID and FID must be needed!"));
    }else{
        userService.checkIfFollowed(data.UID, data.FID, function(err){
            if(err){
                res.end( util.combineFailureRes(err));
            }else{
                res.end(util.combineSuccessRes([]));
            }
        })
    }
}


exports.getUserInfo = function(req, res){
    var query = req.query ? req.query : {};

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    var user = req.session.user ? req.session.user : {};

    var uid =  query.UID ? query.UID : user._id;

    if(!uid){
        res.end( JSON.stringify({status:"failure",err:"user id must be needed!"}));
    }else{
        userService.getUserDetailByUids(uid, function(err, docs){
            if(err){
                res.end( JSON.stringify({status:"failure",err:err}));
            }else{

                var target = [] ;
                util.fetchJSON(target, docs,apiSchema.USER);
                res.end(util.combineSuccessRes(target));
                //res.end(JSON.stringify(target));
            }
        })
    }

}