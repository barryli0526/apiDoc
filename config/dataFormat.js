/**
 * Created with JetBrains WebStorm.
 * User: bli111
 * Date: 12/3/13
 * Time: 4:29 AM
 * To change this template use File | Settings | File Templates.
 */
exports.JSON = {
    photoText:{
        photo:{
            url:'',
            title:'',
            category:'',
            author:{name:''}
        },
        text:{
            content:'',
            category:'',
            from:''
        },
        date:''
    },
    Post:{
        author:{
            name:'',position:'',weibo:''
        },
        date:'',
        title:'',
        content:'',
        editor:{name:''},
        like:0
    },
    QA:{
        author:{name:''},
        question:'',
        reply:[
            {replayName:'',replyContent:''}
        ],
        like:123
    }
}

exports.TestData = {
    photoText:{
        photo:{
            url:'http://barryli0526.u.qiniudn.com/95735408.jpg?token=CxylTiHK2DVpGH0_JHWe9VDoQ3KPUqVrfZlvQC_I:6pJ5zAJ2JZMrhTWChXlK6kdGw2E=:eyJTIjoiYmFycnlsaTA1MjYudS5xaW5pdWRuLmNvbS85NTczNTQwOC5qcGciLCJFIjoxMzg2MTU2NjUxfQ==',
            title:'翡冷翠的书亭老板',
            category:'摄影',
            author:{name:'桃米水'}
        },
        text:{
            content:'生活和电影不一样，生活难多了。',
            category:'名著',
            from:'天堂电影院'
        },
        date:'2013/12/03'
    },
    Post:{
        author:{
            name:'姚瑶',position:'作家,翻译',weibo:'姚瑶vagrancy'
        },
        date:'2013/12/03',
        title:'病人',
        content:'<p><p style="font-family:Georgia, "Times New Roman", Times, "Songti SC", SimSun, serif;font-size:18px;background-color:#F2F2F2;">   \
        在我决定要同石琢做朋友的时候，并不会想到，若干年之后，我可能会是最了解她的人，却永远也不会成为她的朋友。<br />                                               \
我说不上来石琢有哪儿不太一样，但就是，不太一样。<br />                                                                                                        \
我曾很认真地思考过这个问题，她的脸没有什么特点，平坦柔和，身材没有什么特点，略高且婴儿肥，性格也没有什么特点，没有脾气，如果一定要说她有些什么的话，大概就是，没有朋友。<br />  \
她像空气里的一团影子，你不能说她不存在，也不能肯定她存在。                                                                                                       \
</p>                                                                                                                                                      ',
        editor:{name:'贺伊曼'},
        like:100
    },
    QA:{
        author:{name:'耿圣凯'},
        question:'不同人眼中的世界有多么不同',
        reply:[
            {replayName:'知乎用户君',replyContent:'<p><br /></p>    \
                <p>自然不一样。<br /><br />住在拉各斯的印度商人，开着一家工厂，聘了一百多个黑人工人。他觉得西非是地狱，老家旁遮普是世界上最文明最美的地方，中国人都长得一样，文化全是打打杀杀。他叨叨絮絮的印度口音很快很难懂，我模糊地听出他要在这片野蛮的土地上赚够钱</p> \
<p><br /></p>'},

{replayName:'知乎用户君',replyContent:'<p><br /></p>    \
                <p>自然不一样。<br /><br />住在拉各斯的印度商人，开着一家工厂，聘了一百多个黑人工人。他觉得西非是地狱，老家旁遮普是世界上最文明最美的地方，中国人都长得一样，文化全是打打杀杀。他叨叨絮絮的印度口音很快很难懂，我模糊地听出他要在这片野蛮的土地上赚够钱</p> \
<p><br /></p>'}
        ],
        like:123
    }

}