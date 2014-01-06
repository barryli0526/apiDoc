/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/4/13
 * Time: 4:49 AM
 * To change this template use File | Settings | File Templates.
 */

//var service = require('../service').ArticleService;

var http = require('http');
var querystring = require('querystring');
var userService = require('../service').UserService;
var util = require('../lib/util');

//service.CreateArticle

//service.getLatestArticles(1, function(err , article){

  //  console.log(article);

//})

var testRegister = function(){


    var post_data = JSON.stringify({
        nickname:'user1',
        loginname:'user1',

        pass:123
    });



    var options = {
        host: 'apidoc.ap01.aws.af.cm',
        port: 80,
        path: '/user.register',
        method: 'POST',
        headers :{
            'Content-length':100,
            'Content-Type' : 'application/json'
        }
    };
  //  console.log(options);
  //  console.log(post_data);
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

  //  console.log(post_data);

    req.write(post_data);
    //req.write("sdfsdf");

    req.end();
    console.log("tes11t");

}

var testLogin = function(){
    var post_data = JSON.stringify({
        uName:'user23',
        pwd:123
    });



    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: '/user.signIn',
        method: 'POST',
        headers :{
            'Content-Type' : 'application/json'
        }
    };


    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    //  console.log(post_data);

    req.write(post_data);

    req.end();
}

var testFollow = function(){
    var post_data = JSON.stringify({
        UID:'52a1df0f7a28cff430000001',
        FID:'52a1e1277516ac9033000002'
    });



    var options = {
        host: '121.199.58.200',
        port: 3000,
        path: '/user.follow',
        method: 'POST',
        headers :{
            'Content-Type' : 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    //  console.log(post_data);

    req.write(post_data);

    req.end();
}

userService.getUserDetailByUids('529eedcf7ea8157c28000001',function(err,docs){
  //  console.log(docs[0]);
    var target = [] ;
    util.fetchJSON(target, docs, require('../apidoc/apiReturnType/user').USER);
    console.log(target);
})
