var express = require('express');
var router = express.Router();

router.get('/goods/head', function (req, res, next) {
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470036971089,
    "data" : [ {
      "id" : 22,
      "sort" : 1,
      "type" : 1,
      "searchContent" : "",
      "url" : "http://1.kugou.com/api/activity/newRedEnvelope/mobile.html",
      "uniqueId" : 0,
      "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T11lA5BsCj1RCvBVdK.jpg"
    }, {
      "id" : 17,
      "sort" : 3,
      "type" : 1,
      "searchContent" : "",
      "url" : "http://1.kugou.com/api/activity/signin/index.html",
      "uniqueId" : 0,
      "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1FfbmBmW_1RCvBVdK.jpg"
    }, {
      "id" : 19,
      "sort" : 4,
      "type" : 1,
      "searchContent" : "",
      "url" : "http://1.kugou.com/api/h5/100/index.html",
      "uniqueId" : 0,
      "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1i1E5BQJ_1RCvBVdK.jpg"
    }, {
      "id" : 13,
      "sort" : 8,
      "type" : 2,
      "searchContent" : "",
      "url" : "",
      "uniqueId" : 2405,
      "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1uiK5BTAT1RCvBVdK.jpg"
    }, {
      "id" : 14,
      "sort" : 13,
      "type" : 2,
      "searchContent" : "",
      "url" : "",
      "uniqueId" : 2356,
      "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1qvW5BbKv1RCvBVdK.jpg"
    } ]
  };
  res.json(json);
  next();
})
//中奖名单公告
router.get('/goods/announce', function (req, res, next) {
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470036971089,
    "data" : [ {
      "id" : 12,
      "username" : "了我的1",
      "prize" : "iPhone6s 64G 港版"
    },{
      "id" : 22,
      "username" : "了我的2",
      "prize" : "iPhone6s 64G 港版"
    },{
      "id" : 32,
      "username" : "了我的3",
      "prize" : "iPhone6s 64G 港版"
    },{
      "id" : 42,
      "username" : "了我的4",
      "prize" : "iPhone6s 64G 港版"
    },{
      "id" : 52,
      "username" : "了我的5",
      "prize" : "iPhone6s 64G 港版"
    }]
  };
  res.json(json);
  next();
})
//商品列表
router.post('/goods/list',function(req, res, next){
  var json = {
      "status" : 1,
      "errorCode" : 0,
      "errorMessage" : null,
      "servertime" : 1470295333888,
      "data" : {
        "total" : 232,
        "goodsList" : [ {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1nEA5BgYv1RCvBVdK.jpg",
          "id" : 100144410,
          "goodsId" : 2332,
          "goodsName" : "【泰国进口】大米 孟乍隆苏吝府茉莉香米 10KG",
          "goodsDesc" : "",
          "price" : 145.0,
          "needNumber" : 145,
          "surplusNumber" : 123,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1ZFDKB5Lj1RCvBVdK.jpg",
          "id" : 100144419,
          "goodsId" : 2444,
          "goodsName" : "公牛插座（带USB接口）1.8米 GN-B303U带儿童保护门",
          "goodsDesc" : "微动电子轻触开关 双极驱动安全儿童保护门",
          "price" : 69.0,
          "needNumber" : 69,
          "surplusNumber" : 68,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1zzbKBgZv1RCvBVdK.jpg",
          "id" : 100144412,
          "goodsId" : 2443,
          "goodsName" : "【七夕礼物推荐】永生花玻璃罩",
          "goodsDesc" : "款式随机发货",
          "price" : 269.0,
          "needNumber" : 269,
          "surplusNumber" : 240,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1qXAKBybT1RCvBVdK.jpg",
          "id" : 100144403,
          "goodsId" : 2442,
          "goodsName" : "【七夕礼物推荐】金箔玫瑰花（非黄金材质）",
          "goodsDesc" : "【注：本产品材质非黄金！】",
          "price" : 119.0,
          "needNumber" : 119,
          "surplusNumber" : 81,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1kzKKB4W_1RCvBVdK.jpg",
          "id" : 100144365,
          "goodsId" : 2439,
          "goodsName" : "【七夕礼物推荐】香皂玫瑰花彩盒",
          "goodsDesc" : "速递，永不凋谢的玫瑰 情人节礼物",
          "price" : 199.0,
          "needNumber" : 199,
          "surplusNumber" : 170,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1ythKB5Jg1RCvBVdK.jpg",
          "id" : 100144220,
          "goodsId" : 2438,
          "goodsName" : "小米 平板电脑2 WIFI版 7.9英寸 ",
          "goodsDesc" : "颜色随机发货 Intel Z8500 2G/16G 500W/800W",
          "price" : 1199.0,
          "needNumber" : 1199,
          "surplusNumber" : 437,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1HBx5BCZg1RCvBVdK.jpg",
          "id" : 100143324,
          "goodsId" : 2435,
          "goodsName" : "外星人 水冷游戏电脑主机ALWA51R-2838S",
          "goodsDesc" : "i7-5930K 16G 128G SSD+2T GTX980 8G独显 Win8.1银，9区域AlienFX灯光技术，与游戏深入联动！",
          "price" : 47299.0,
          "needNumber" : 47299,
          "surplusNumber" : 2420,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1usJ5ByWj1RCvBVdK.jpg",
          "id" : 100144176,
          "goodsId" : 2434,
          "goodsName" : "DJI大疆\"悟\" Inspire 1 可变形无人机 专业智能遥控航拍飞机",
          "goodsDesc" : "4K高清拍摄 Inspire 1 V2.0+CARE一年版",
          "price" : 20799.0,
          "needNumber" : 20799,
          "surplusNumber" : 12260,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1uA_5Bgxg1RCvBVdK.jpg",
          "id" : 100144452,
          "goodsId" : 2353,
          "goodsName" : "荣耀8 4GB+32GB 全网通版",
          "goodsDesc" : "颜色随机，双镜头，双2.5D玻璃，双功能指纹！美得与众不同！",
          "price" : 2799.0,
          "needNumber" : 2799,
          "surplusNumber" : 2630,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        }, {
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1qBx5ByCv1RCvBVdK.jpg",
          "id" : 100144085,
          "goodsId" : 2431,
          "goodsName" : "酷车e族 锂电池电动滑板车 带座椅 60KM续航",
          "goodsDesc" : "",
          "price" : 3699.0,
          "needNumber" : 3699,
          "surplusNumber" : 1016,
          "status" : 0,
          "hotSort" : 100000,
          "lastStage" : 0
        } ]
      }
    };
    res.json(json);
    next();
})
//商品详情
router.post('/goods/detail',function(req, res, next){
  var json = {
      "status" : 1,
      "errorCode" : 0,
      "errorMessage" : null,
      "servertime" : 1470652267998,
      "data" : {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1lNKCBybj1RCvBVdK.jpg",
        "id" : 100076783,
        "goodsId" : 79,
        "goodsName" : "飞利浦（PHILIPS）空气净化器 AC4076",
        "goodsDesc" : "颜色随机",
        "price" : 3298.0,
        "needNumber" : 3298,
        "surplusNumber" : 2423,
        "status" : 0,
        "hotSort" : 100000,
        "lastStage" : 0,
        "goodsImgList" : [ {
          "goodsImgId" : 1211,
          "goodsImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1lNKCBybj1RCvBVdK.jpg",
          "goodsImgSort" : 1
        }, {
          "goodsImgId" : 1212,
          "goodsImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1UzVCB_Av1RCvBVdK.jpg",
          "goodsImgSort" : 2
        }, {
          "goodsImgId" : 1213,
          "goodsImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T18XVCBbVg1RCvBVdK.jpg",
          "goodsImgSort" : 3
        }, {
          "goodsImgId" : 1214,
          "goodsImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1.X_CBbLQ1RCvBVdK.jpg",
          "goodsImgSort" : 4
        }, {
          "goodsImgId" : 1215,
          "goodsImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T15F_CBbWj1RCvBVdK.jpg",
          "goodsImgSort" : 5
        } ],
        "winner" : null,
        "beginTime" : 1470618085000,
        "startTime" : 0,
        "openTime" : 0
      }
    }
    res.json(json);
    next();
})
//参与者列表
router.post('/goods/joiner',function(req, res, next){
  var json = {
      "status" : 1,
      "errorCode" : 0,
      "errorMessage" : null,
      "servertime" : 1470652350976,
      "data" : {
        "total" : 0,
        "userList" : [ {
          "id" : 25058612,
          "kgUid" : 1200284902,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1ikC4B5Cj1RCvBVdK.jpeg",
          "nickname" : "开心就好",
          "ip" : "222.78.226.94",
          "address" : "福建省南平市",
          "joinTime" : 1470652347903,
          "joinNumber" : 15
        }, {
          "id" : 25058577,
          "kgUid" : 1204602223,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1VkV4BsDj1RCvBVdK.jpeg",
          "nickname" : "83039104",
          "ip" : "14.18.29.147",
          "address" : "广东省广州市",
          "joinTime" : 1470652342693,
          "joinNumber" : 15
        }, {
          "id" : 25058573,
          "kgUid" : 1209189556,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1lkK4BbLg1RCvBVdK.jpeg",
          "nickname" : "该我了",
          "ip" : "113.57.182.120",
          "address" : "湖北省武汉市",
          "joinTime" : 1470652341846,
          "joinNumber" : 7
        }, {
          "id" : 25058571,
          "kgUid" : 1205312189,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "让我中一次吧谢谢",
          "ip" : "60.180.179.96",
          "address" : "浙江省温州市",
          "joinTime" : 1470652341752,
          "joinNumber" : 8
        }, {
          "id" : 25058563,
          "kgUid" : 1201762548,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "啥就不中呢",
          "ip" : "106.118.220.53",
          "address" : "河北省衡水市",
          "joinTime" : 1470652340199,
          "joinNumber" : 15
        }, {
          "id" : 25058544,
          "kgUid" : 1209957333,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1WhV5B_CT1RCvBVdK.jpeg",
          "nickname" : "不中我就破产了",
          "ip" : "110.80.101.141",
          "address" : "福建省厦门市",
          "joinTime" : 1470652338030,
          "joinNumber" : 5
        }, {
          "id" : 25058519,
          "kgUid" : 1209881895,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "5***5@qq.com",
          "ip" : "36.46.227.211",
          "address" : "陕西省西安市",
          "joinTime" : 1470652335098,
          "joinNumber" : 7
        }, {
          "id" : 25058478,
          "kgUid" : 1207101560,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1e5V4BKDj1RCvBVdK.jpeg",
          "nickname" : "精神领袖",
          "ip" : "117.136.40.21",
          "address" : "广东省广州市",
          "joinTime" : 1470652328144,
          "joinNumber" : 36
        }, {
          "id" : 25058435,
          "kgUid" : 1206272764,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1Vob4BbAQ1RCvBVdK.jpeg",
          "nickname" : "158****3693",
          "ip" : "59.38.232.226",
          "address" : "广东省佛山市",
          "joinTime" : 1470652321707,
          "joinNumber" : 3
        }, {
          "id" : 25058368,
          "kgUid" : 1205618461,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1gmE4BmCv1RCvBVdK.jpeg",
          "nickname" : "胖熊该我中了吧",
          "ip" : "223.74.139.10",
          "address" : "广东省潮州市",
          "joinTime" : 1470652309135,
          "joinNumber" : 5
        }, {
          "id" : 25058334,
          "kgUid" : 1209199455,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "小胖熊石石石石石石石石",
          "ip" : "106.226.14.89",
          "address" : "江西省赣州市",
          "joinTime" : 1470652302911,
          "joinNumber" : 5
        }, {
          "id" : 25058321,
          "kgUid" : 1201132569,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1YmJ4ByWj1RCvBVdK.jpeg",
          "nickname" : "给个电脑",
          "ip" : "113.110.241.173",
          "address" : "广东省深圳市",
          "joinTime" : 1470652300885,
          "joinNumber" : 3
        }, {
          "id" : 25058275,
          "kgUid" : 1205802584,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "中了个毛",
          "ip" : "211.97.129.228",
          "address" : "福建省厦门市",
          "joinTime" : 1470652292764,
          "joinNumber" : 6
        }, {
          "id" : 25058260,
          "kgUid" : 1202453100,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1AmE4B5Vv1RCvBVdK.jpeg",
          "nickname" : "在不中直播放弃一元买",
          "ip" : "112.96.168.99",
          "address" : "广东省广州市",
          "joinTime" : 1470652289975,
          "joinNumber" : 1
        }, {
          "id" : 25058256,
          "kgUid" : 1202836618,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1roW4BvW_1RCvBVdK.jpeg",
          "nickname" : "156****6333",
          "ip" : "120.34.19.132",
          "address" : "福建省漳州市",
          "joinTime" : 1470652289806,
          "joinNumber" : 6
        }, {
          "id" : 25058197,
          "kgUid" : 1207731598,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1skb4B5dQ1RCvBVdK.jpeg",
          "nickname" : "就中一次吧",
          "ip" : "157.61.208.202",
          "address" : "广东省潮州市",
          "joinTime" : 1470652281777,
          "joinNumber" : 12
        }, {
          "id" : 25058152,
          "kgUid" : 1207631046,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png",
          "nickname" : "xzy***@yeah.net",
          "ip" : "223.93.205.104",
          "address" : "浙江省丽水市",
          "joinTime" : 1470652274160,
          "joinNumber" : 1
        }, {
          "id" : 25058044,
          "kgUid" : 1203616491,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1v__5BjJ_1RCvBVdK.jpeg",
          "nickname" : "林家之子",
          "ip" : "112.17.246.244",
          "address" : "浙江省杭州市",
          "joinTime" : 1470652259071,
          "joinNumber" : 1
        }, {
          "id" : 25058028,
          "kgUid" : 1204399717,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1ooV4BmxQ1RCvBVdK.jpeg",
          "nickname" : "看来的放弃了",
          "ip" : "27.153.58.104",
          "address" : "福建省泉州市",
          "joinTime" : 1470652257520,
          "joinNumber" : 11
        }, {
          "id" : 25058006,
          "kgUid" : 1209001171,
          "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1mcZ4BCKv1RCvBVdK.jpeg",
          "nickname" : "再不中破产了",
          "ip" : "175.43.112.96",
          "address" : "福建省泉州市",
          "joinTime" : 1470652254879,
          "joinNumber" : 2
        } ]
      }
    }
    res.json(json);
    next();
})
//购物车清单
router.get('/cart/detail',function(req, res, next){
  var json = {
      "status" : 1,
      "errorCode" : 0,
      "errorMessage" : null,
      "servertime" : 1471245821023,
      "data" : {
        "total" : 2,
        "goodsList" : [ {
          "id" : 1526053,
          "goodsId" : 227,
          "goodsName" : "Apple iPhone 6S PLUS 128G",
          "goodsDesc" : "颜色随机",
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1GUA4BQhv1RCvBVdK.jpg",
          "surplusStatus" : 0,
          "status" : 0,
          "lastId" : 100172572,
          "needNumber" : 8480,
          "surplusNumber" : 795,
          "number" : 5,
          "createTime" : 1471245780000
        }, {
          "id" : 1465386,
          "goodsId" : 1985,
          "goodsName" : "中国黄金 Au9999金元宝100g",
          "goodsDesc" : "",
          "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T15dAmB5Cv1RCvBVdK.jpg",
          "surplusStatus" : 0,
          "status" : 0,
          "lastId" : 100172585,
          "needNumber" : 35999,
          "surplusNumber" : 31918,
          "number" : 5,
          "createTime" : 1470990967000
        } ],
        "totalCost" : 10
      }
    }
    res.json(json);
    next();
})
//参与者本人
router.post('/goods/user',function(req, res, next){
  var json = {
  "status" : 1,
  "errorCode" : 0,
  "errorMessage" : null,
  "servertime" : 1470652350990,
  "data" : {
    "joinNumber" : 13,
    "joinFlag" : true,
    "joinCodeList" : [1000006,1000006,1000006,1000006,1000006,1000006,
    1000006,1000006,1000006,1000006,1000006,1000006,1000006,1000006,1000006]
  }
}
    res.json(json);
    next();
})

//用户余额
router.get('/user/consumeMoney',function(req, res, next){
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1471250639141,
    "data" : 12.5
  }
  res.json(json);
  next();
})
//查看夺宝号码
router.get('/user/buyInfo/codes',function(req, res, next){
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1471313572785,
    "data" : [ 10000004, 10000610, 10000418, 10000472, 10000497, 10000148, 10000322, 10000343, 10000032, 10000566 ]
  }
  res.json(json);
  next();
})
//图文详情
router.get('/goods/picDetail',function(req, res, next){
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1471313572785,
    "data" : [
    'http://img1.cache.netease.com/catchpic/9/96/9699DFB815A922F3DF50F3ABD3B00135.jpg',
    'http://img1.cache.netease.com/catchpic/9/96/9699DFB815A922F3DF50F3ABD3B00135.jpg',
    'http://img1.cache.netease.com/catchpic/9/96/9699DFB815A922F3DF50F3ABD3B00135.jpg',
    'http://img1.cache.netease.com/catchpic/9/96/9699DFB815A922F3DF50F3ABD3B00135.jpg',
     ]
  }
  res.json(json);
  next();
})
router.get('/goods/past',function(req, res, next){
  var json = {
  "status" : 1,
  "errorCode" : 0,
  "errorMessage" : null,
  "servertime" : 1471860061090,
  "data" : {
    "total" : 0,
    "goodsList" : [ {
      "id" : 100097565,
      "openTime" : 1471429349807,
      "kgUid" : 1207042103,
      "nickname" : "?郭✨✨✨",
      "ip" : "1.28.221.253",
      "winCode" : 10000678,
      "address" : "内蒙古自治区包头市",
      "joinNumber" : 142,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1u6J4BbZT1RCvBVdK.jpeg"
    }, {
      "id" : 100097556,
      "openTime" : 1471429125555,
      "kgUid" : 1203371572,
      "nickname" : "活下去的动力",
      "ip" : "113.117.33.42",
      "winCode" : 10001959,
      "address" : "广东省揭阳市",
      "joinNumber" : 408,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png"
    }, {
      "id" : 100097552,
      "openTime" : 1471428915771,
      "kgUid" : 1200842170,
      "nickname" : "?年大吉?",
      "ip" : "14.153.189.49",
      "winCode" : 10005170,
      "address" : "广东省深圳市",
      "joinNumber" : 834,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T13kb4B_Dg1RCvBVdK.jpeg"
    }, {
      "id" : 100097544,
      "openTime" : 1471428734061,
      "kgUid" : 1209440181,
      "nickname" : "这是真的吗",
      "ip" : "223.73.18.66",
      "winCode" : 10004086,
      "address" : "广东省揭阳市",
      "joinNumber" : 1557,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1vch4B4Lv1RCvBVdK.jpeg"
    }, {
      "id" : 100097536,
      "openTime" : 1471428584761,
      "kgUid" : 1203196283,
      "nickname" : "新年好",
      "ip" : "223.104.23.31",
      "winCode" : 10003220,
      "address" : "海南省海口市",
      "joinNumber" : 108,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1AcZ4B7Yv1RCvBVdK.jpeg"
    }, {
      "id" : 100097526,
      "openTime" : 1471428354340,
      "kgUid" : 1201397300,
      "nickname" : "宝宝饿了给个苹果吧",
      "ip" : "14.30.35.81",
      "winCode" : 10005540,
      "address" : "广东省广州市",
      "joinNumber" : 517,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1LUE4BmVv1RCvBVdK.jpeg"
    }, {
      "id" : 100097517,
      "openTime" : 1471423215329,
      "kgUid" : 1206595420,
      "nickname" : "传说卸载就能中",
      "ip" : "223.74.205.62",
      "winCode" : 10005236,
      "address" : "广东省潮州市",
      "joinNumber" : 815,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png"
    }, {
      "id" : 100097510,
      "openTime" : 1471422903726,
      "kgUid" : 1203896512,
      "nickname" : "为什么不会中",
      "ip" : "223.104.90.24",
      "winCode" : 10002283,
      "address" : "广西壮族自治区南宁市",
      "joinNumber" : 80,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1d.V4Byxj1RCvBVdK.jpeg"
    }, {
      "id" : 100097499,
      "openTime" : 1471422695518,
      "kgUid" : 1200249876,
      "nickname" : "不再相信一元买了",
      "ip" : "219.135.114.165",
      "winCode" : 10005880,
      "address" : "广东省佛山市",
      "joinNumber" : 112,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png"
    }, {
      "id" : 100097498,
      "openTime" : 1471422389183,
      "kgUid" : 1208230585,
      "nickname" : "巢宝宝中大象物极必反",
      "ip" : "219.133.188.20",
      "winCode" : 10001773,
      "address" : "广东省深圳市",
      "joinNumber" : 3037,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1J6h4BCL_1RCvBVdK.jpeg"
    }, {
      "id" : 100097493,
      "openTime" : 1471422358368,
      "kgUid" : 1201004493,
      "nickname" : "据木头的胖纸",
      "ip" : "14.17.44.215",
      "winCode" : 10000700,
      "address" : "广东省深圳市",
      "joinNumber" : 332,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1ocE4BTdT1RCvBVdK.jpeg"
    }, {
      "id" : 100097485,
      "openTime" : 1471422188051,
      "kgUid" : 1200031438,
      "nickname" : "胖熊不爱我了",
      "ip" : "183.10.123.202",
      "winCode" : 10002060,
      "address" : "广东省潮州市",
      "joinNumber" : 124,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1emZ4Bmxv1RCvBVdK.png"
    }, {
      "id" : 100097476,
      "openTime" : 1471421910461,
      "kgUid" : 1204764566,
      "nickname" : "大奖就是我",
      "ip" : "36.62.184.130",
      "winCode" : 10005545,
      "address" : "安徽省滁州市",
      "joinNumber" : 5,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1u5V4BsZj1RCvBVdK.jpeg"
    }]
  }
}

    res.json(json);
    next();
})
/*router.get('/goods/detail',function(req, res, next){
  var json =
    res.json(json);
    next();
})*/
module.exports = router;
