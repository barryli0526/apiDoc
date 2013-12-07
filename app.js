var path = require('path');
var express = require('express');
var app = express();
var df = require('./config/dataFormat');
var testData = df.TestData;

var service = require('./service').ArticleService;

var user = require('./apidoc/user');


app.configure(function(){
        var viewsRoot = path.join(__dirname, 'views');
        app.set('view engine', 'html');
        app.set('views', viewsRoot);
        app.engine('html', require('ejs').renderFile);

        app.use(express.static(__dirname + '/public'));
       // app.use(express.bodyParser());
        app.use(express.json());
        app.use(express.urlencoded())
    }


);

//var restify = require('restify');
//var service = require('./service').ArticleService;
////
//var user = require('./apidoc/user');
//
//function respond(req, res, next) {
//    res.send('hello ' + req.params.name);
//}
//
//var app = restify.createServer();
//
//app.use(restify.queryParser());
//app.use(restify.bodyParser());
//
//app.listen(3000, function() {
//    console.log('%s listening at %s', app.name, app.url);
//});

app.get('/', function(req, res){
    console.log('sdf');
   res.render('index');
});

app.get('/photo.list.get', function(req, res){

    console.log(req.query);


})

app.get('/post.get', function(req, res){

})

app.get('/post.list.get', function(req, res){

    var query = req.query;

    query.count = query.count ? query.count : 1;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;
    service.getLatestArticles(2, function(err , articles){
        var s = {
            posts:[]
        };
        s.posts = articles;
        res.write(JSON.stringify(s));
        res.end();
    })
})

app.get('/qa.get', function(req, res){

})

//关注用户api
app.post('/user.follow', user.follow);
app.post('/user.unFollow', user.unfollow);
app.post('/user.signIn', user.login);
app.post('/user.register', user.register);

//获取粉丝列表
app.get('/user/getFollowers', user.getFollowerList);
//获取偶像列表
app.get('/user/getFollowings', user.getFollowingList);

app.get('/user/getAll', user.getUserList);

app.listen(3000);
console.log('Listening on port 3000');