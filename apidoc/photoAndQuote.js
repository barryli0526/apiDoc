/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/10/13
 * Time: 11:10 PM
 * To change this template use File | Settings | File Templates.
 */


var pAndQService = require('../service/PhotoQuotesService');


/**
 * 获取最新的图文信息
 * @param req
 * @param res
 */
exports.getLatestOne = function(req, res){

    var query = req.query ? req.query : {};

    var listSize = query.listSize ? query.listSize : 1;
    var listIndex = query.listIndex ? query.listIndex : 0;

    res.setHeader("Content-Type","application/json;charset='utf-8'");
    res.statusCode=200;

    pAndQservice.getLatestOne(listSie,listIndex, function(err, contents){
        if(err){
            res.end('{status:"failure", err:'+ err || '获取图文信息失败' +'');
        }else{
            res.write(JSON.stringify(contents));
            res.end();
        }
    });

}
