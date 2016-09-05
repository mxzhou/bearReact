var express = require('express');
var router = express.Router();

router.post('/user/address/list', function (req, res, next) {
  var json = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470279036744,
    "data" : [
      {
        "id" : 57547,
        "mobile" : "13247373141",
        "province" : "广东省",
        "city" : "广州市",
        "area" : "白云区",
        "provinceId" : 440000,
        "cityId" : 440100,
        "areaId" : 440111,
        "addressDetail" : "广州市白云区京溪中路10号",
        "receiver" : "孟祥周",
        "ifDefault" : true
      },
      {
        "id" : 57547,
        "mobile" : "13247373141",
        "province" : "广东省",
        "city" : "广州市",
        "area" : "白云区",
        "provinceId" : 440000,
        "cityId" : 440100,
        "areaId" : 440111,
        "addressDetail" : "广州市白云区京溪中路10号",
        "receiver" : "孟祥周",
        "ifDefault" : false
      }
    ]
  }
  res.json(json);
  next();
})

router.post('/address/get', function (req, res, next) {

  var type = (req.body.addressType)
  var json1,json2,json3;
  json1 = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470988318776,
    "data" : [ {
      "id" : 110000,
      "addressType" : 1,
      "addressName" : "北京",
      "sort" : 110000,
      "parentId" : 1
    }, {
      "id" : 120000,
      "addressType" : 1,
      "addressName" : "天津",
      "sort" : 120000,
      "parentId" : 1
    }, {
      "id" : 130000,
      "addressType" : 1,
      "addressName" : "河北省",
      "sort" : 130000,
      "parentId" : 1
    }, {
      "id" : 140000,
      "addressType" : 1,
      "addressName" : "山西省",
      "sort" : 140000,
      "parentId" : 1
    }, {
      "id" : 150000,
      "addressType" : 1,
      "addressName" : "内蒙古自治区",
      "sort" : 150000,
      "parentId" : 1
    }, {
      "id" : 210000,
      "addressType" : 1,
      "addressName" : "辽宁省",
      "sort" : 210000,
      "parentId" : 1
    }, {
      "id" : 220000,
      "addressType" : 1,
      "addressName" : "吉林省",
      "sort" : 220000,
      "parentId" : 1
    }, {
      "id" : 230000,
      "addressType" : 1,
      "addressName" : "黑龙江省",
      "sort" : 230000,
      "parentId" : 1
    }, {
      "id" : 310000,
      "addressType" : 1,
      "addressName" : "上海",
      "sort" : 310000,
      "parentId" : 1
    }, {
      "id" : 320000,
      "addressType" : 1,
      "addressName" : "江苏省",
      "sort" : 320000,
      "parentId" : 1
    }, {
      "id" : 330000,
      "addressType" : 1,
      "addressName" : "浙江省",
      "sort" : 330000,
      "parentId" : 1
    }, {
      "id" : 340000,
      "addressType" : 1,
      "addressName" : "安徽省",
      "sort" : 340000,
      "parentId" : 1
    }, {
      "id" : 350000,
      "addressType" : 1,
      "addressName" : "福建省",
      "sort" : 350000,
      "parentId" : 1
    }, {
      "id" : 360000,
      "addressType" : 1,
      "addressName" : "江西省",
      "sort" : 360000,
      "parentId" : 1
    }, {
      "id" : 370000,
      "addressType" : 1,
      "addressName" : "山东省",
      "sort" : 370000,
      "parentId" : 1
    }, {
      "id" : 410000,
      "addressType" : 1,
      "addressName" : "河南省",
      "sort" : 410000,
      "parentId" : 1
    }, {
      "id" : 420000,
      "addressType" : 1,
      "addressName" : "湖北省",
      "sort" : 420000,
      "parentId" : 1
    }, {
      "id" : 430000,
      "addressType" : 1,
      "addressName" : "湖南省",
      "sort" : 430000,
      "parentId" : 1
    }, {
      "id" : 440000,
      "addressType" : 1,
      "addressName" : "广东省",
      "sort" : 440000,
      "parentId" : 1
    }, {
      "id" : 450000,
      "addressType" : 1,
      "addressName" : "广西壮族自治区",
      "sort" : 450000,
      "parentId" : 1
    }, {
      "id" : 460000,
      "addressType" : 1,
      "addressName" : "海南省",
      "sort" : 460000,
      "parentId" : 1
    }, {
      "id" : 500000,
      "addressType" : 1,
      "addressName" : "重庆",
      "sort" : 500000,
      "parentId" : 1
    }, {
      "id" : 510000,
      "addressType" : 1,
      "addressName" : "四川省",
      "sort" : 510000,
      "parentId" : 1
    }, {
      "id" : 520000,
      "addressType" : 1,
      "addressName" : "贵州省",
      "sort" : 520000,
      "parentId" : 1
    }, {
      "id" : 530000,
      "addressType" : 1,
      "addressName" : "云南省",
      "sort" : 530000,
      "parentId" : 1
    }, {
      "id" : 540000,
      "addressType" : 1,
      "addressName" : "西藏自治区",
      "sort" : 540000,
      "parentId" : 1
    }, {
      "id" : 610000,
      "addressType" : 1,
      "addressName" : "陕西省",
      "sort" : 610000,
      "parentId" : 1
    }, {
      "id" : 620000,
      "addressType" : 1,
      "addressName" : "甘肃省",
      "sort" : 620000,
      "parentId" : 1
    }, {
      "id" : 630000,
      "addressType" : 1,
      "addressName" : "青海省",
      "sort" : 630000,
      "parentId" : 1
    }, {
      "id" : 640000,
      "addressType" : 1,
      "addressName" : "宁夏回族自治区",
      "sort" : 640000,
      "parentId" : 1
    }, {
      "id" : 650000,
      "addressType" : 1,
      "addressName" : "新疆维吾尔自治区",
      "sort" : 650000,
      "parentId" : 1
    } ]
  };
  json2 = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470988405926,
    "data" : [ {
      "id" : 440100,
      "addressType" : 2,
      "addressName" : "广州市",
      "sort" : 440100,
      "parentId" : 440000
    }, {
      "id" : 440200,
      "addressType" : 2,
      "addressName" : "韶关市",
      "sort" : 440200,
      "parentId" : 440000
    }, {
      "id" : 440300,
      "addressType" : 2,
      "addressName" : "深圳市",
      "sort" : 440300,
      "parentId" : 440000
    }, {
      "id" : 440400,
      "addressType" : 2,
      "addressName" : "珠海市",
      "sort" : 440400,
      "parentId" : 440000
    }, {
      "id" : 440500,
      "addressType" : 2,
      "addressName" : "汕头市",
      "sort" : 440500,
      "parentId" : 440000
    }, {
      "id" : 440600,
      "addressType" : 2,
      "addressName" : "佛山市",
      "sort" : 440600,
      "parentId" : 440000
    }, {
      "id" : 440700,
      "addressType" : 2,
      "addressName" : "江门市",
      "sort" : 440700,
      "parentId" : 440000
    }, {
      "id" : 440800,
      "addressType" : 2,
      "addressName" : "湛江市",
      "sort" : 440800,
      "parentId" : 440000
    }, {
      "id" : 440900,
      "addressType" : 2,
      "addressName" : "茂名市",
      "sort" : 440900,
      "parentId" : 440000
    }, {
      "id" : 441200,
      "addressType" : 2,
      "addressName" : "肇庆市",
      "sort" : 441200,
      "parentId" : 440000
    }, {
      "id" : 441300,
      "addressType" : 2,
      "addressName" : "惠州市",
      "sort" : 441300,
      "parentId" : 440000
    }, {
      "id" : 441400,
      "addressType" : 2,
      "addressName" : "梅州市",
      "sort" : 441400,
      "parentId" : 440000
    }, {
      "id" : 441500,
      "addressType" : 2,
      "addressName" : "汕尾市",
      "sort" : 441500,
      "parentId" : 440000
    }, {
      "id" : 441600,
      "addressType" : 2,
      "addressName" : "河源市",
      "sort" : 441600,
      "parentId" : 440000
    }, {
      "id" : 441700,
      "addressType" : 2,
      "addressName" : "阳江市",
      "sort" : 441700,
      "parentId" : 440000
    }, {
      "id" : 441800,
      "addressType" : 2,
      "addressName" : "清远市",
      "sort" : 441800,
      "parentId" : 440000
    }, {
      "id" : 441900,
      "addressType" : 2,
      "addressName" : "东莞市",
      "sort" : 441900,
      "parentId" : 440000
    }, {
      "id" : 442000,
      "addressType" : 2,
      "addressName" : "中山市",
      "sort" : 442000,
      "parentId" : 440000
    }, {
      "id" : 445100,
      "addressType" : 2,
      "addressName" : "潮州市",
      "sort" : 445100,
      "parentId" : 440000
    }, {
      "id" : 445200,
      "addressType" : 2,
      "addressName" : "揭阳市",
      "sort" : 445200,
      "parentId" : 440000
    }, {
      "id" : 445300,
      "addressType" : 2,
      "addressName" : "云浮市",
      "sort" : 445300,
      "parentId" : 440000
    } ]
  };
  json3 = {
    "status" : 1,
    "errorCode" : 0,
    "errorMessage" : null,
    "servertime" : 1470988467659,
    "data" : [ {
      "id" : 440103,
      "addressType" : 3,
      "addressName" : "荔湾区",
      "sort" : 440103,
      "parentId" : 440100
    }, {
      "id" : 440104,
      "addressType" : 3,
      "addressName" : "越秀区",
      "sort" : 440104,
      "parentId" : 440100
    }, {
      "id" : 440105,
      "addressType" : 3,
      "addressName" : "海珠区",
      "sort" : 440105,
      "parentId" : 440100
    }, {
      "id" : 440106,
      "addressType" : 3,
      "addressName" : "天河区",
      "sort" : 440106,
      "parentId" : 440100
    }, {
      "id" : 440111,
      "addressType" : 3,
      "addressName" : "白云区",
      "sort" : 440111,
      "parentId" : 440100
    }, {
      "id" : 440112,
      "addressType" : 3,
      "addressName" : "黄埔区",
      "sort" : 440112,
      "parentId" : 440100
    }, {
      "id" : 440113,
      "addressType" : 3,
      "addressName" : "番禺区",
      "sort" : 440113,
      "parentId" : 440100
    }, {
      "id" : 440114,
      "addressType" : 3,
      "addressName" : "花都区",
      "sort" : 440114,
      "parentId" : 440100
    }, {
      "id" : 440115,
      "addressType" : 3,
      "addressName" : "南沙新区",
      "sort" : 440115,
      "parentId" : 440100
    }, {
      "id" : 440117,
      "addressType" : 3,
      "addressName" : "从化区",
      "sort" : 440117,
      "parentId" : 440100
    }, {
      "id" : 440118,
      "addressType" : 3,
      "addressName" : "增城区",
      "sort" : 440118,
      "parentId" : 440100
    } ]
  };

    res.json((type == 1 ? json1 : (type == 2 ? json2 : json3)));
  next();
})


module.exports = router;
