var express = require('express');
var router = express.Router();

router.post('/goods/open', function (req, res, next) {
  var json ={
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470822996435,
    "data" : {
      "total" : 0,
      "goodsList" : [ {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1r8xCBXWj1RCvBVdK.jpg",
        "id" : 100159890,
        "goodsId" : 347,
        "goodsName" : "维达 蓝色经典3层200g卷纸*27卷",
        "goodsDesc" : "整箱销售",
        "needNumber" : 99,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822986852,
        "openTime" : 1470822990005,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1Y8CmBjA_1RCvBVdK.jpg",
        "id" : 100159969,
        "goodsId" : 1880,
        "goodsName" : "伊吉康雷神 家用静音动感单车",
        "goodsDesc" : "14kg实心精钢材质，超大承重，室内健身车JS300780E",
        "needNumber" : 1799,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822969179,
        "openTime" : 1470822970029,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1R7dmB7DQ1RCvBVdK.jpg",
        "id" : 100159845,
        "goodsId" : 1972,
        "goodsName" : "苏泊尔（SUPOR）电水壶 ",
        "goodsDesc" : "SWF15E13A全钢无缝防烫保温。1.5L容量，一体成型全钢无缝内胆304食品级不锈钢，双层防烫彩钢外壳，不锈钢内盖，长效保温，进口温控器！",
        "needNumber" : 159,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822968756,
        "openTime" : 1470822970029,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T16HbmB_KT1RCvBVdK.jpg",
        "id" : 100160024,
        "goodsId" : 1885,
        "goodsName" : "TCL 5.5公斤 全自动波轮洗衣机 XQB55-36SP ",
        "goodsDesc" : "一键脱水，10种贴心程序，8档节水水位。",
        "needNumber" : 829,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822925838,
        "openTime" : 1470822930013,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1_IWmB4JQ1RCvBVdK.jpg",
        "id" : 100160023,
        "goodsId" : 2038,
        "goodsName" : "【预售】小米手环2 心率监测 来电提醒",
        "goodsDesc" : "小米手环2火热预售中，颜色随机，胖熊承诺一旦到货，将于第一时间寄送",
        "needNumber" : 269,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822907677,
        "openTime" : 1470822910038,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1kUdmB7As1RCvBVdK.jpg",
        "id" : 100159836,
        "goodsId" : 1955,
        "goodsName" : "【夏季活动】创维（Skyworth）十字对开门冰箱395升 D39H",
        "goodsDesc" : "395升大容量 时尚新宠 十字对开，四维匀冷，节能静音！十字对开门冰箱 匀冷多门 大容量 多变空间(润金)",
        "needNumber" : 2599,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822905900,
        "openTime" : 1470822910038,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1zUV4Bvxv1RCvBVdK.jpg",
        "id" : 100160040,
        "goodsId" : 226,
        "goodsName" : "Apple iPhone 6S PLUS 64G",
        "goodsDesc" : "颜色随机",
        "needNumber" : 7250,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822897253,
        "openTime" : 1470822900063,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1lPhmBjJg1RCvBVdK.jpg",
        "id" : 100159766,
        "goodsId" : 1996,
        "goodsName" : "【高圆圆代言】飞亚达 摄影师系列机械女表 白盘皮带LA8262.GWSS",
        "goodsDesc" : "经典四叶草，手腕上的典雅与性感",
        "needNumber" : 3399,
        "price" : 0.0,
        "joinNumber" : 0,
        "status" : 3,
        "kgUid" : 0,
        "nickname" : null,
        "startTime" : 1470822882477,
        "openTime" : 1470822885005,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1.fZ5B5bj1RCvBVdK.jpg",
        "id" : 100160006,
        "goodsId" : 2404,
        "goodsName" : "纽曼车载充电器（充电器+车内逃生安全锤两用）",
        "goodsDesc" : "金色/银色随机发货",
        "needNumber" : 39,
        "price" : 0.0,
        "joinNumber" : 2,
        "status" : 5,
        "kgUid" : 1201289431,
        "nickname" : "n***7",
        "startTime" : 1470822776149,
        "openTime" : 1470822780005,
        "winUserId" : 0
      }, {
        "coverImgUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1r7dmB7E_1RCvBVdK.jpg",
        "id" : 100159924,
        "goodsId" : 1965,
        "goodsName" : "奥克斯（AUX）饮水机",
        "goodsDesc" : "YR-5-X(820) 立式 温热 ",
        "needNumber" : 209,
        "price" : 0.0,
        "joinNumber" : 60,
        "status" : 5,
        "kgUid" : 1204509538,
        "nickname" : "189****0848",
        "startTime" : 1470822759882,
        "openTime" : 1470822760005,
        "winUserId" : 0
      } ]
    }
  }
  res.json(json);
});
router.post('/goods/win', function (req, res, next) {
  var json ={
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470893330734,
    "data" : {
      "kgUid" : 1209145396,
      "nickname" : "大莆田"+Math.random(1000),
      "status" : 5,
      "ip" : "221.204.218.112",
      "address" : "山西省太原市",
      "joinCode" : "10000043",
      "id" : 100159890,
      "joinTime" : 1470885475033,
      "joinNumber" : 21,
      "openTime" : 1470893155004,
      "avatarUrl" : "http://p1.fx.kgimg.com/v2/kmh_1_img/T1j6J4BCCT1RCvBVdK.jpeg",
      "shareType" : 1,
      "myWin" : false
    }
  }


  res.json(json);
});

module.exports = router;
