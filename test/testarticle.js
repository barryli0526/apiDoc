/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/4/13
 * Time: 4:49 AM
 * To change this template use File | Settings | File Templates.
 */

var service = require('../service').ArticleService;

var http = require('http');
var querystring = require('querystring');

//service.CreateArticle

//service.getLatestArticles(1, function(err , article){

  //  console.log(article);

//})

var testRegister = function(){


    var post_data = JSON.stringify({
        nickname:'user23',
        loginname:'user23',
        email:'sf@df.com',
        pass:123
    });



    var options = {
        host: '127.0.0.1',
        port: 3000,
        path: '/user.register',
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
        host: '127.0.0.1',
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


testFollow();