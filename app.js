var path = require('path');
var express = require('express');
var app = express();
var df = require('./config/dataFormat');
var testData = df.TestData;

var config = require('./config/base').config;
var service = require('./service').ArticleService;

var user = require('./apidoc/user');
var upload = require('./apidoc/upload');
var post = require('./apidoc/article');
var pAndQ = require('./apidoc/photoAndQuote');


app.configure(function(){
        var viewsRoot = path.join(__dirname, 'views');
        app.set('view engine', 'html');
        app.set('views', viewsRoot);
        app.engine('html', require('ejs').renderFile);

        app.use(express.static(__dirname + '/public'));
        app.use(express.bodyParser({uploadDir : './uploads'}));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.cookieParser());
        app.use(express.session({ secret: config.session_secret}));

      //  app.use(express.session({
      //      secret: config.session_secret
     //   }));

        app.use(require('./lib/util').auth_user);
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
//取消关注
app.post('/user.unFollow', user.unfollow);
//登陆
app.post('/user.signIn', user.login);
//注册
app.post('/user.register', user.register);

//获取粉丝列表
app.get('/user/getFollowers', user.getFollowerList);
//获取偶像列表
app.get('/user/getFollowings', user.getFollowingList);

//获取所有用户
app.get('/user/getAll', user.getUserList);
//查看是否关注某用户
app.get('/user/isFollow', user.isFollow);

//上传图片
app.post('/photo/upload', upload.uploadImage);

//获取个人信息
app.get('/user.detail', user.getUserInfo);

/**
 * 文章相关api
 */

//新建文章
app.post('/post', post.newPost);
//删除
app.delete('/post', post.Delete);
//更新
app.put('/post', post.Update);
//获取最新
app.get('/post/latest', post.getLatestArticles);
//获取某个用户的文章
app.get('/:userId/post', post.getArticleListOfUser);
//更具query条件获取文章列表
app.get('/post/query', post.getArticles);

/**
 * 图文api
 */
//app.get('/');
app.get('/photoAndText', pAndQ.getLatestOne);

app.listen(3000);
console.log('Listening on port 3000');