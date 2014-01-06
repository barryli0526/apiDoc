/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/30/13
 * Time: 8:47 AM
 * To change this template use File | Settings | File Templates.
 */

var article = {
    articleId : '',
    article_title: { type: String},
    article_content: { type: String },
    user:{
        nickname:'',
        user_id:'',
        avatar:''
    },
    categoryname:'',
    tag:[],
    createtime:'',
    reply_count: 0,
    visit_count: 0,
    collect_count: 0,
    up_count: 0,
    down_count: 0
}