var crypto = require('crypto');
var ObjectId = require('mongoose').Types.ObjectId;
var config = require('../config/base').config;
var UserService = require('../service/UserService');
//var fs = require('fs');
//var childProcess = require('child_process');

/**
 * 验证用户
 */
exports.auth_user = function(req, res, next){
    if(req.session && req.session.user){
       // res.local('current_user', req.session.user);
        return next();
    }else{
        var cookie = req.cookies ? req.cookies[config.auth_cookie_name] : null;
        if(!cookie){
            return next();
        }

        var auth_token = exports.decrypt(cookie, config.session_secret);
        var auth = auth_token.split('\t');

        var loginname = auth[1];
        var password = auth[2];
        UserService.getUserProfileByName(loginname, function(err, user){
            if(err){
                return next(err);
            }

            if(!user || (user.pass != password)){
                return next();
                //  return res.redirect('/login');
            }

            req.session.user = user;
        //    res.local('current_user', req.session.user);
            return next();
        })
    }
}


exports.gen_session = function(user, res){
    var auth_token = exports.encrypt(user._id+'\t'+user.loginname+'\t'+user.pass+'\t'+user.email, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token,{path:'/', maxAge:1000*60*60*24*30});
}



exports.format_date = function (date, friendly) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (friendly) {
    var now = new Date();
    var mseconds = -(date.getTime() - now.getTime());
    var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
    if (mseconds < time_std[3]) {
      if (mseconds > 0 && mseconds < time_std[1]) {
        return Math.floor(mseconds / time_std[0]).toString() + ' ??';
      }
      if (mseconds > time_std[1] && mseconds < time_std[2]) {
        return Math.floor(mseconds / time_std[1]).toString() + ' ???';
      }
      if (mseconds > time_std[2]) {
        return Math.floor(mseconds / time_std[2]).toString() + ' ???';
      }
    }
  }

  //month = ((month < 10) ? '0' : '') + month;
  //day = ((day < 10) ? '0' : '') + day;
  hour = ((hour < 10) ? '0' : '') + hour;
  minute = ((minute < 10) ? '0' : '') + minute;
  second = ((second < 10) ? '0': '') + second;

 // var thisYear = new Date().getFullYear();
  //year = (thisYear === year) ? '' : (year + '-');
    year =  year + '-';
  return year + month + '-' + day + ' ' + hour + ':' + minute;
};


/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html) {
    return String(html)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};


exports.transformToJSON = function(filedname, value){

    var fileds = filedname.split(',');
    var values = value.split(',');

    var len = fileds.length > values.length ? (values.length) : (fileds.length);

    var jsonstr = '{';

    for(var i=0;i<len;i++){
        if(i > 0)
            jsonstr += ',';
        jsonstr += '"' + fileds[i] + '":"' + values[i] +'"';
    }
    jsonstr += '}';

    try{
        return JSON.parse(jsonstr);
    }catch(e){
        return jsonstr;
    }

}

exports.encrypt = function(str, secret){
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

exports.decrypt = function(str, secret){
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

exports.transToArray = function(str){
    if(typeof(str) === 'string')
        return str.split(',');
    return str;
}

exports.transtoObjectArray = function(str){
    var arr = [];
    if(typeof(str) === 'string'){
       arr = str.split(',');
       return exports.transToObjectId(arr);
    }else{
        return str;
    }
}

exports.transToObjectId = function(param){
    if(!param){
        return null;
    }
    if(typeof(param) === 'string')
        return new ObjectId(param);
    else if(param instanceof Array){
        var arr = new Array();

        for(var i=0;i<param.length;i++){
            var id = param[i];
            if(typeof(id) === 'string' && id !== ''){
                arr[i] = new ObjectId(id);
            }else if(id !== ''){
                arr[i] = id;
            }
        }
        return arr;
    }
    return param;
}

exports.isImage = function(str){
    var ext = str.split('.');
    ext = ext[ext.length-1];
    return /^(jpg|png|jpeg|gif)$/i.test(ext);
}


exports.parseCookie = function(cookie){
    var cookies = {};
    cookie.split(';').forEach(function(cookie){
        var parts = cookie.split('=');
        cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    return cookies;
}

/**
 * 拷贝json对象
 * @param deep  是否进行深拷贝
 * @param target
 * @param options
 * @returns {*}
 */
exports.extend = function(deep, target, options){

    var target1 = target._doc ? target._doc : target;
    for (var name in options._doc) {
        copy = options[name];

        if (deep && copy instanceof Array) {
            target1[name] = exports.extend(deep, [], copy);
        } else if (deep && copy instanceof Object) {

            target1[name] = exports.extend(deep, {}, copy);

        } else {
            target1[name] = options[name];
        }
    }
    return target;
}

/**
 * 根据指定schema从src源数据里提取需要的数据
 * @param src
 * @param schema
 * @returns {*}
 */
exports.fetchJSON =  function(target, src, schema){

    if(src instanceof Array){
        for(var i=0;i<src.length; i++){
            target.push(exports.fetchJSON([],src[i],schema));
        }
    }else if(src instanceof Object){
        target = {};
        src = src._doc ? src._doc : src;
        var defValue = '';
        for(var name in schema){
            if(typeof target[name] !== 'undefined'){
                defValue = target[name];
            }else{
                defValue = schema[name];
            }
            target[name] = (typeof src[name] !== 'undefined') ? src[name] : defValue;
        }
    }else{

        target = src;
    }

    return target;
}