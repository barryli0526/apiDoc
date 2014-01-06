var dbHelper = require('../dbHelper');
var User = dbHelper.User;
var UserInfo = dbHelper.UserInfo;
var Relation = dbHelper.Relation;
var Message = require('../config/message').Message;
var labels = require('../config/labels').labels;
var EventProxy = require('EventProxy');
var util = require('../lib/util');
var ObjectId = require('mongoose').Types.ObjectId;


/**
 * user sign in
 * @param loginname
 * @param pass
 * @param callback
 * @constructor
 */
exports.SignIn = function(loginname, pass, callback){
    User.getUserByLoginInfo(loginname, pass, function(err, user){

        if(err){
            return callback(Message.Db.default);
        }

        if(!user || user.length == 0){
            return callback(Message.User.signin_error,null);
        }

        //不处理更新成功或失败
        User.UpdateLoginTime(user);

        //直接返回信息,不需要等待更新完成
        return callback(null, user);
    })
}

/**
 * get user profile through provided loginname
 * @param loginname
 * @param callback
 */
exports.getUserProfileByName = function(loginname, callback){
    User.getUserByLoginName(loginname, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null,null,Message.User.not_exsits);
        }

        return callback(null, user);
    })
}

/**
 * 通过uid或者一组uid获取用户的详细信息
 * @param uid
 * @param callback
 */
exports.getUserDetailByUids = function(uids, callback){
   if(typeof (uids) === 'string'){
       uids = new ObjectId(uids);
   }
   if(!(uids instanceof Array)){
       uids = [uids];
   }

    var proxy = new EventProxy();
    var events = ['user','userInfo'];

    proxy.assign(events, function(users,userInfos){
        var infos = {};
        for(var i=0;i<userInfos.length;i++){
           infos[userInfos[i].user_id] = userInfos[i];
        }
        var us = [];

        for(var i=0;i<users.length;i++){

            us[i] = util.extend(true,users[i],infos[users[i]._id]);
        }
        return callback(null, us);
    }).fail(callback);


   User.getUsersByIds(uids, proxy.done('user'));

   UserInfo.getByUidS(uids, proxy.done('userInfo'));


}

/**
 * update user profile
 * @param loginname
 * @param data
 * @param callback
 * @returns {*}
 * @constructor
 */
exports.UpdateUserProfile = function(loginname, data, callback){
    if(typeof(data) === "string"){
        data = eval('('+data+')');
    }

    if(Object.keys(data).length === 0){
        return callback(null);
    }

    User.getUserByLoginName(loginname, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null,null,Message.User.not_exsits);
        }
        User.UpdateUserProfile(user,data, function(err, newuser){
            if(err){
                return callback(Message.Db.default);
            }
            if(!user){
                return callback(null,null,Message.User.update_error);
            }
            return callback(null, newuser);
        })
    })
}


/**
 * check the provided {filedname:value} is exsists
 * @param filedname
 * @param value
 * @param callback
 * @constructor
 */
exports.CheckFiledIsExist = function(filedname, value, callback){
    var query = util.transformToJSON(filedname, value);
    User.getOneByQuery(query,function(err, user){
        if(err){
            return callback(Message.Db.default);
        }

        if(!user){
            return callback(null, false);
        }else{
            return callback(null, true);
        }

    });
}

/**
 * new user regist
 * @param nickname
 * @param loginname
 * @param pass
 * @param email
 * @param avatar_url
 * @param callback
 * @constructor
 */
/*exports.SignUp = function(nickname, loginname, pass, email, avatar_url, callback){
    var query = {$or:[{'loginname':loginname},{'email':email}]};
    User.getOneByQuery(query, function(err, user){
        if(err){
            return callback(Message.Db.default);
        }
        if(user){
           return callback(Message.User.is_exsits);
        }else{
            if(!avatar_url){
                avatar_url = labels.default_avatar_url;
            }
            User.newAndSave(nickname, loginname, pass, email, avatar_url, function(err, user){
                if(err){
                    return callback(Message.Db.default);
                }
                if(!user){
                    return callback(Message.User.signup_error);
                }

                //创建userInfo数据条目
                UserInfo.newAndSave(user._id,function(err){
                    if(err){
                        //log error
                    }
                })

                return callback(null, user);
            })
        }
    })
}*/

exports.SignUp = function(data, callback){
 // var query = {$or:[{'loginname':data.loginname},{'email':data.email}]};
    var query = {'loginname':data.loginname};
    User.getOneByQuery(query, function(err, user){

        if(err){
            return callback(Message.Db.default);
        }
        if(user){
           return callback(Message.User.is_exsits);
        }else{
            if(!data.avatar_url){
                data.avatar_url = labels.default_avatar_url;
            }
            if(!data.nickname)
            	data.nickname = data.loginname;
            User.newAndSave(data, function(err, user){
                console.log(err);
                if(err){
                    return callback(Message.Db.default);
                }
                if(!user){
                    return callback(Message.User.signup_error);
                }

                //创建userInfo数据条目
                UserInfo.newAndSave(user._id,function(err){
                    if(err){
                        //log error
                    }
                })

                return callback(null, user);
            })
        }
    })

}

/**
 * 关注用户
 * @param userid
 * @param followerid
 * @param callback
 * @constructor
 */
exports.FollowUser = function(userid, followerid, callback){
    if(typeof(userid) === "string"){
        userid =  new ObjectId(userid);
    }

    if(typeof(followerid) === "string"){
        followerid =  new ObjectId(followerid);
    }

    var proxy = new EventProxy();
    var events = ['addFollowing','addFollower'];

    proxy.assign(events, function(){
        return callback();
    })

    Relation.newAndSave(userid, followerid, function(err){

        if(!err){
            UserInfo.addFollowingCount(followerid, proxy.done('addFollowing'));
            UserInfo.addFollowerCount(userid, proxy.done('addFollower'));
        }else{
            return callback(err);
        }
    });

}

/**
 * 取消关注用户
 * @param userid
 * @param followerid
 * @param callback
 */
exports.unFollowUser = function(userid, followerid, callback){
    if(typeof(userid) === "string"){
        userid =  new ObjectId(userid);
    }

    if(typeof(followerid) === "string"){
        followerid =  new ObjectId(followerid);
    }

    var proxy = new EventProxy();
    var events = ['deleteFollowing','deleteFollower'];

    proxy.assign(events, function(){
        return callback(null);
    })

    Relation.remove(userid, followerid, function(err){
        if(!err){
            UserInfo.deleteFollowingCount(followerid, proxy.done('deleteFollowing'));
            UserInfo.deleteFollowerCount(userid, proxy.done('deleteFollower'));
        }else{
            return callback(err);
        }
    });
}

/**
 * 获取所有粉丝信息,支持分页
 * @param userid
 * @param callback
 */
exports.getFollowerList = function(userid,pageSize, pageIndex, callback){
    if(typeof(userid) === "string"){
        userid =  new ObjectId(userid);
    }

    Relation.getFollowers(userid, pageSize, pageIndex, function(err, docs){
        if(err){
            return callback(err);
        }

        if(docs.length <=0){
            return callback(null, []);
        }

        var proxy = new EventProxy();

        var users = [];

        //文章内容填充完毕，返回
        proxy.after('user_ready',docs.length,function(){
          //  return callback(null, users);

            return FillUserWithRelation(userid, users, callback);
        });

        docs.forEach(function(doc, i){

            User.getOneById(doc.follow_id, function(err, user){
                if(err){
                    users[i] = {status:'failure',error:err};

                }else{
                    users[i] = user;
                }
                proxy.emit('user_ready');
            })

        })

    })
}


/**
 * 获取偶像信息，支持分页
 * @param userid
 * @param pageSize
 * @param pageIndex
 * @param callback
 */
exports.getFollowingList = function(userid,pageSize, pageIndex, callback){
    if(typeof(userid) === "string"){
        userid =  new ObjectId(userid);
    }
    Relation.getFollowings(userid, pageSize, pageIndex, function(err, docs){
        if(err){
            return callback(err);
        }

        if(docs.length <=0){
            return callback(null, []);
        }

        var proxy = new EventProxy();

        var users = [];

        //文章内容填充完毕，返回
        proxy.after('user_ready',docs.length,function(){
            return callback(null, users);
        });

        docs.forEach(function(doc, i){
          //   console.log(doc);
            User.getOneById(doc.user_id, function(err, user){
                if(err){
                    users[i] = {status:'failure',error:err};

                }else{
                    users[i] = user;
                }
                proxy.emit('user_ready');
            })

        })

    })
}

/**
 * 获取用户列表
 * @param pageIndex
 * @param pageSize
 * @param callback
 */
exports.getUserList = function(pageIndex, pageSize, callback){
    User.getUserList(pageSize, pageIndex, callback);
}

function FillUserWithRelation(userId, users, callback){
    if(typeof(userId) === 'string'){
        userId = new ObjectId(userId);
    }

    exports.getFollowingList(userId, function(err, docs){

        function checkIsExist(uid){
            for(var j=0;j<docs.length;j++){
                if(uid.toString() == docs[j].user_id.toString()){
                    return true;
                }
            }
            return false;
        }

        var arr = [];

        var proxy = new EventProxy();

        proxy.after('user_ready', users.length, function(){
            return callback(null, arr);
        })

        users.forEach(function(user, i){
            var info = {};

            info.user = user;

            if(checkIsExist(user._id)){
                info.following = true;
            }else{
                info.following = false;
            }

            arr[i] = info;

            proxy.emit('user_ready');
        });


    })

}



exports.getUserListByUID = function(userId, pageIndex, pageSize, callback){
    if(typeof(userId) === 'string'){
        userId = new ObjectId(userId);
    }

    var proxy = new EventProxy();

    User.getUserList(pageSize, pageIndex, function(err, users){

        exports.getFollowingList(userId, function(err, docs){

            var arr = [];

           // console.log(docs);

            function checkIsExist(uid){
                for(var j=0;j<docs.length;j++){
                    if(uid.toString() == docs[j].user_id.toString()){
                        return true;
                    }
                }
                return false;
            }

            proxy.after('user_ready', users.length, function(){
                return callback(err, arr);
            })


            users.forEach(function(user, i){

                var info = {};

                info.user = user;

                if(checkIsExist(user._id)){
                    info.following = true;
                }else{
                    info.following = false;
                }

                arr[i] = info;

                proxy.emit('user_ready');
            });

        })
    });




}



/**
 * 判断是否已经follow了用户,false为未关注，true已关注
 * @param userid
 * @param followid
 * @param callback
 */
exports.checkIfFollowed = function(userid, followid, callback){

    if(typeof(userid) === "string"){
        userid =  new ObjectId(userid);
    }

    if(typeof(followid) === "string"){
        followid =  new ObjectId(followid);
    }

    Relation.getRelationShip(userid, followid, function(err, user){
        if(err){
            return callback(err);
        }
        if(!user){
            return callback(null,false);
        }else{
            return callback(null,true);
        }
    });
}