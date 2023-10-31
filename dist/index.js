/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Sq": () => (/* binding */ APP_TOKEN),
  "IS": () => (/* binding */ BASE_ASSIMT_TIME),
  "ow": () => (/* binding */ DEVICE_HEIGHT),
  "Ev": () => (/* binding */ DEVICE_WIDTH),
  "KD": () => (/* binding */ MAX_ASSIMT_TIME),
  "Y2": () => (/* binding */ MAX_BACK_COUNTS),
  "u2": () => (/* binding */ MAX_CLICK_COUNTS),
  "CD": () => (/* binding */ MAX_CYCLES_COUNTS),
  "CJ": () => (/* binding */ MAX_RETRY_COUNTS),
  "EH": () => (/* binding */ NAME_READ_DEJIAN),
  "KI": () => (/* binding */ NAME_READ_EGGPLANT_FREE),
  "iD": () => (/* binding */ NAME_READ_KUAISHOU_FREE),
  "X$": () => (/* binding */ NAME_READ_MARVEL_FREE),
  "CK": () => (/* binding */ NAME_READ_PANDA_BRAIN),
  "vC": () => (/* binding */ NAME_READ_RED_FRUITS),
  "Sy": () => (/* binding */ NAME_READ_SEVEN_CATS_FREE),
  "gA": () => (/* binding */ NAME_READ_SHUQI),
  "WH": () => (/* binding */ NAME_READ_SPEED_FREE),
  "WW": () => (/* binding */ NAME_READ_STARRY_SKY),
  "C4": () => (/* binding */ NAME_READ_TOMATO),
  "wj": () => (/* binding */ NAME_READ_TOMATO_FREE),
  "AW": () => (/* binding */ NAME_READ_TOMATO_LITE),
  "WL": () => (/* binding */ NAME_READ_WANCHAO),
  "yJ": () => (/* binding */ NAME_VEDIO_KUAISHOU),
  "pY": () => (/* binding */ NAME_VEDIO_KUAISHOU_LITE),
  "JB": () => (/* binding */ NAME_VEDIO_TIKTOK_LITE),
  "Xl": () => (/* binding */ NAME_VEDIO_YOUSHI),
  "Iq": () => (/* binding */ PACKAGE_EGGPLANT_FREE),
  "eW": () => (/* binding */ PACKAGE_READ_DEJIAN),
  "HB": () => (/* binding */ PACKAGE_READ_KUAISHOU_FREE),
  "_d": () => (/* binding */ PACKAGE_READ_MARVEL_FREE),
  "HF": () => (/* binding */ PACKAGE_READ_PANDA_BRAIN),
  "Io": () => (/* binding */ PACKAGE_READ_RED_FRUITS),
  "Wm": () => (/* binding */ PACKAGE_READ_SEVEN_CATS_FREE),
  "Ee": () => (/* binding */ PACKAGE_READ_SHUQI),
  "rq": () => (/* binding */ PACKAGE_READ_SPEED_FREE),
  "Dr": () => (/* binding */ PACKAGE_READ_STARRY_SKY),
  "JS": () => (/* binding */ PACKAGE_READ_TOMATO),
  "OH": () => (/* binding */ PACKAGE_READ_TOMATO_FREE),
  "zC": () => (/* binding */ PACKAGE_READ_TOMATO_LITE),
  "Kv": () => (/* binding */ PACKAGE_READ_WANCHAO),
  "TO": () => (/* binding */ PACKAGE_VEDIO_KUAISHOU),
  "t2": () => (/* binding */ PACKAGE_VEDIO_KUAISHOU_LITE),
  "Ol": () => (/* binding */ PACKAGE_VEDIO_TIKTOK_LITE),
  "SX": () => (/* binding */ PACKAGE_VEDIO_YOUSHI),
  "LL": () => (/* binding */ RANGE_FIXED_SCREEN),
  "n$": () => (/* binding */ RANGE_FOUR_FIFTHS_SCREEN),
  "dx": () => (/* binding */ RANGE_MIDDLE_SCREEN),
  "lU": () => (/* binding */ REDUNDANCY_TIME),
  "mr": () => (/* binding */ ROBOT_ID),
  "P_": () => (/* binding */ STORAGE),
  "cB": () => (/* binding */ WAIT_TIME_AFTER_CLICK),
  "b1": () => (/* binding */ WX_PUSHER_URL),
  "g$": () => (/* binding */ _TOKEN)
});

// UNUSED EXPORTS: APP_ENV, PROJECT_NAME, STORAGE_WEIGHT_CONTAINER, VERSION, WEIGHT_ASSIMT_TIME, deJian, eggplantFree, filteredList, kuaiShou, kuaiShouFree, kuaiShouLite, list, marvelFree, pandaBrain, redFruits, sevenCatsFree, shuQi, speedFree, starrySky, tikTokLite, tomato, tomatoFree, tomatoLite, wanChao, youShi

// EXTERNAL MODULE: ./src/lib/exception.ts
var exception = __webpack_require__(564);
// EXTERNAL MODULE: ./src/lib/logger.ts
var logger = __webpack_require__(437);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(844);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(2);
// EXTERNAL MODULE: ./src/scripts/abstract/Base.ts
var Base = __webpack_require__(290);
// EXTERNAL MODULE: ./src/lib/decorators.ts
var decorators = __webpack_require__(537);
;// CONCATENATED MODULE: ./src/scripts/DeJian.ts


var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DeJian = function (_super) {
  __extends(DeJian, _super);

  function DeJian() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_DEJIAN;
    _this.packageName = PACKAGE_READ_DEJIAN;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 45 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  DeJian.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.mealSupp();
  };

  DeJian.prototype.medEff = function () {
    this.joinActivity();
    this.watchAds();
    this.reward();
  };

  DeJian.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  DeJian.prototype.weight = function () {
    this.goTo(desc("discovery_button"), -1);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textEndsWith("币").findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  DeJian.prototype.readBook = function (totalTime) {
    this.goTo(desc("bookstore_button"), -1);
    (0,utils/* randomClickChildInList */.Ef)(classNameMatches((0,utils/* merge */.TS)(["android.support.v7.widget.RecyclerView", "android.view.ViewGroup"])).depth(17).drawingOrder(1), random(0, 7));
    this.read(totalTime);
  };

  DeJian.prototype.reward = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("领取"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(['看视频再领.*'], {
        func: function func() {
          _this.watch(text("金币收益"));
        }
      });

      if (text("恭喜获得").exists()) {
        (0,utils/* closeByImageMatching */.bB)();
      }
    }
  };

  DeJian.prototype.signIn = function () {
    this.goTo(desc("discovery_button"), -1);

    if (textStartsWith("成功签到").exists()) {
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  DeJian.prototype.mealSupp = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(text("点击领取"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(['看视频再领.*'], {
        func: function func() {
          _this.watch(text("金币收益"));
        }
      });

      if (text("恭喜获得").exists()) {
        (0,utils/* closeByImageMatching */.bB)();
      }
    }
  };

  DeJian.prototype.watchAds = function () {
    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      this.watch(text("金币收益"));

      if (!(0,utils/* findAndClick */.Od)(text("知道了"))) {
        (0,utils/* closeByImageMatching */.bB)();
      }

      this.readBook(3 * 60);
      this.goTo(desc("discovery_button"), -1);
    }
  };

  DeJian.prototype.joinActivity = function () {
    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(text("参与活动赚金币"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      var title = id("com.zhangyue.module.ad:id/tv_reward_video_title").findOnce();

      if (title != null) {
        var regex = /\((\d+)\/(\d+)\)/;
        var match = title.text().match(regex);

        if (match) {
          for (var i = parseInt(match[1]); i < parseInt(match[2]); i++) {
            (0,utils/* clickUntilGone */.q1)(text("看视频赚金币"));
            logger/* Record.log */.WV.log("\u53C2\u4E0E\u6D3B\u52A8, \u6B63\u5728\u89C2\u770B".concat(i + 1, "/").concat(match[2], "\u4E2A\u5E7F\u544A"));
            this.watch(text("金币收益"));
            (0,utils/* findAndClick */.Od)(id("com.zhangyue.module.ad:id/iv_dialog_reward_close"));
          }
        } else {
          logger/* Record.log */.WV.log("活动已完成");
        }
      }

      back();
    }
  };

  DeJian.prototype.openTreasure = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(['看视频再领.*'], {
        func: function func() {
          _this.watch(text("金币收益"));
        }
      });

      if (text("恭喜获得").exists()) {
        (0,utils/* closeByImageMatching */.bB)();
      }
    }
  };

  __decorate([decorators/* measureExecutionTime */.rM], DeJian.prototype, "highEff", null);

  __decorate([decorators/* measureExecutionTime */.rM], DeJian.prototype, "medEff", null);

  __decorate([decorators/* measureExecutionTime */.rM], DeJian.prototype, "lowEff", null);

  __decorate([decorators/* measureExecutionTime */.rM], DeJian.prototype, "weight", null);

  __decorate([(0,decorators/* functionLog */.qd)("阅读")], DeJian.prototype, "readBook", null);

  __decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], DeJian.prototype, "reward", null);

  __decorate([(0,decorators/* functionLog */.qd)("签到")], DeJian.prototype, "signIn", null);

  __decorate([(0,decorators/* functionLog */.qd)("领取餐补")], DeJian.prototype, "mealSupp", null);

  __decorate([(0,decorators/* functionLog */.qd)("看广告")], DeJian.prototype, "watchAds", null);

  __decorate([(0,decorators/* functionLog */.qd)("参加活动")], DeJian.prototype, "joinActivity", null);

  __decorate([(0,decorators/* functionLog */.qd)("开宝箱")], DeJian.prototype, "openTreasure", null);

  return DeJian;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/KuaiShouLite.ts


var KuaiShouLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShouLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var KuaiShouLite = function (_super) {
  KuaiShouLite_extends(KuaiShouLite, _super);

  function KuaiShouLite() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看内容最高可得.+'];
    _this.appName = NAME_VEDIO_KUAISHOU_LITE;
    _this.packageName = PACKAGE_VEDIO_KUAISHOU_LITE;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.depth = 1;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 30 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShouLite.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  KuaiShouLite.prototype.medEff = function () {
    this.watchAds();
  };

  KuaiShouLite.prototype.lowEff = function (time) {
    var _this = this;

    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();
    });
  };

  KuaiShouLite.prototype.weight = function () {
    this.store(Base/* BaseKey.Weight */.N.Weight, this.record());
  };

  KuaiShouLite.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 0);
    (0,utils/* moveDown */.vi)(totalTime, 15);
  };

  KuaiShouLite.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("立即领取"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {}
      });
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  KuaiShouLite.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    (0,utils/* scrollTo */.X5)(text("日常任务"), {
      bounds: RANGE_MIDDLE_SCREEN
    });
    var cycleCounts = 0;
  };

  KuaiShouLite.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);

    if (text("恭喜你获得").exists()) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {}
      });
    }

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      if (text("恭喜你获得").exists()) {
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {}
        });
      }
    }
  };

  KuaiShouLite.prototype.record = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("我的金币"), {
      bounds: RANGE_FIXED_SCREEN
    })) {
      var tmp = textEndsWith("金币").findOnce();

      if (tmp != null) {
        return parseInt(tmp.text());
      }
    }

    return 0;
  };

  KuaiShouLite_decorate([decorators/* measureExecutionTime */.rM], KuaiShouLite.prototype, "highEff", null);

  KuaiShouLite_decorate([decorators/* measureExecutionTime */.rM], KuaiShouLite.prototype, "medEff", null);

  KuaiShouLite_decorate([decorators/* measureExecutionTime */.rM], KuaiShouLite.prototype, "lowEff", null);

  KuaiShouLite_decorate([decorators/* measureExecutionTime */.rM], KuaiShouLite.prototype, "weight", null);

  KuaiShouLite_decorate([(0,decorators/* functionLog */.qd)("刷视频")], KuaiShouLite.prototype, "swipeVideo", null);

  KuaiShouLite_decorate([(0,decorators/* functionLog */.qd)("签到")], KuaiShouLite.prototype, "signIn", null);

  KuaiShouLite_decorate([(0,decorators/* functionLog */.qd)("看广告")], KuaiShouLite.prototype, "watchAds", null);

  KuaiShouLite_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], KuaiShouLite.prototype, "openTreasure", null);

  return KuaiShouLite;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/abstract/AbstractTomato.ts
var AbstractTomato_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();





var AbstractTomato = function (_super) {
  AbstractTomato_extends(AbstractTomato, _super);

  function AbstractTomato() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['额外领.*', '看视频得.*', '看视频领最多.*', '看视频立即领取.*', '看视频再得.*', '看视频再领.*', '看视频再抽一次.*', '看视频最高再领.*'];
    _this.situation = true;
    _this.resign = false;
    _this.verify = false;
    return _this;
  }

  AbstractTomato.prototype.sign = function () {
    var _this = this;

    try {
      (0,utils/* doFuncUntilPopupsGone */.PI)(['立即签到.+'], {
        func: function func() {
          (0,utils/* doFuncUntilPopupsGone */.PI)(_this.buttonNameList, {
            func: function func() {
              _this.watch(text("日常福利"));
            }
          });
        },
        normalClickOptions: {
          errorMsg: "账号异常"
        }
      });
    } catch (error) {
      logger/* Record.warn */.WV.warn("".concat(this.appName, "\u8D26\u53F7\u5F02\u5E38, \u4F46\u4E0D\u5F71\u54CD\u540E\u7EED\u6536\u76CA"));
      this.situation = false;
      (0,utils/* close */.xv)(0);
    }

    (0,utils/* doFuncUntilPopupsGone */.PI)(['看视频立即续签'], {
      func: function func() {
        _this.watch(textMatches((0,utils/* merge */.TS)(["日常福利", "看视频立即续签"])));

        if (text("看视频立即续签").exists()) {
          logger/* Record.warn */.WV.warn("".concat(_this.appName, "\u8D26\u53F7\u5F02\u5E38, \u4F46\u4E0D\u5F71\u54CD\u540E\u7EED\u6536\u76CA"));
          _this.situation = false;
          (0,utils/* close */.xv)(0);
        }
      }
    });
    (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
      func: function func() {
        _this.watch(text("日常福利"));
      }
    });
  };

  AbstractTomato.prototype.open = function () {
    var _this = this;

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          if (_this.situation == false) {
            _this.situation = true;
            _this.resign = true;
          }

          _this.watch(text("日常福利"));
        }
      });
    }
  };

  return AbstractTomato;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/RedFruits.ts


var RedFruits_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var RedFruits_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var RedFruits = function (_super) {
  RedFruits_extends(RedFruits, _super);

  function RedFruits() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_RED_FRUITS;
    _this.packageName = PACKAGE_READ_RED_FRUITS;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 40 * 60);
    _this.lowEffEstimatedTime = 0;
    _this.lowEffAssmitCount = 2;
    return _this;
  }

  RedFruits.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  RedFruits.prototype.medEff = function () {
    this.watchAds();
  };

  RedFruits.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();
    });
    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  RedFruits.prototype.weight = function () {
    this.goTo(text("福利"), -1);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(540), (0,utils/* resizeY */.ov)(442)).findOnce();

    if (tmp != null) {
      logger/* Record.log */.WV.log("".concat(this.constructor.name, ":").concat(parseInt(tmp.text())));
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  RedFruits.prototype.swipeVideo = function (totalTime) {
    this.goTo(text("首页"), -1);

    if ((0,utils/* findAndClick */.Od)(text("推荐"))) {
      (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(16).drawingOrder(1), random(3, 8));
      logger/* Record.log */.WV.log("\u8BA1\u5212\u65F6\u95F4: ".concat((0,utils/* convertSecondsToMinutes */.w1)(totalTime), "\u5206\u949F"));
      var watchTime = 0;

      while (totalTime > watchTime) {
        if (textMatches((0,utils/* merge */.TS)(["上滑查看下一集", "上滑继续观看短剧"])).exists()) {
          gesture(1000, [(0,utils/* resizeX */.wK)(random(380, 420)), (0,utils/* resizeY */.ov)(random(1750, 1850))], [(0,utils/* resizeX */.wK)(random(780, 820)), (0,utils/* resizeY */.ov)(random(250, 350))]);
        }

        watchTime += (0,utils/* waitRandomTime */.DV)(30);
      }

      (0,utils/* close */.xv)(2);
    }
  };

  RedFruits.prototype.readBook = function (totalTime) {
    this.goTo(text("首页"), -1);

    if ((0,utils/* findAndClick */.Od)(text("小说"))) {
      (0,utils/* randomClickChildInList */.Ef)(className("android.widget.LinearLayout").depth(23).drawingOrder(1), random(0, 3));
      this.read(totalTime);
    }
  };

  RedFruits.prototype.reward = function () {
    var _this = this;

    this.goTo(text("福利"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("立即领取"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }
  };

  RedFruits.prototype.signIn = function () {
    this.goTo(text("福利"), -1);
    this.sign();

    if ((0,utils/* findAndClick */.Od)(text("去签到"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      this.sign();
    }
  };

  RedFruits.prototype.watchAds = function () {
    this.goTo(text("福利"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      this.watch(text("日常福利"));
    }
  };

  RedFruits.prototype.openTreasure = function () {
    this.goTo(text("福利"), -1);
    this.open();
  };

  RedFruits_decorate([decorators/* measureExecutionTime */.rM], RedFruits.prototype, "highEff", null);

  RedFruits_decorate([decorators/* measureExecutionTime */.rM], RedFruits.prototype, "medEff", null);

  RedFruits_decorate([decorators/* measureExecutionTime */.rM], RedFruits.prototype, "lowEff", null);

  RedFruits_decorate([decorators/* measureExecutionTime */.rM], RedFruits.prototype, "weight", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("刷短剧")], RedFruits.prototype, "swipeVideo", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("阅读")], RedFruits.prototype, "readBook", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], RedFruits.prototype, "reward", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("签到")], RedFruits.prototype, "signIn", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("看广告")], RedFruits.prototype, "watchAds", null);

  RedFruits_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], RedFruits.prototype, "openTreasure", null);

  return RedFruits;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/Tomato.ts


var Tomato_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Tomato_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var Tomato = function (_super) {
  Tomato_extends(Tomato, _super);

  function Tomato() {
    var _this = _super.call(this) || this;

    _this.returnOfWatchAds = false;
    _this.appName = NAME_READ_TOMATO;
    _this.packageName = PACKAGE_READ_TOMATO;
    _this.tab = id(_this.packageName + ":id/c6");
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 45 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  Tomato.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.winGoldCoin();
    this.listenBook();
  };

  Tomato.prototype.medEff = function () {
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS) {
      this.watchAds();

      if (!this.returnOfWatchAds) {
        logger/* Record.debug */.WV.debug("break");
        break;
      }

      if (cycleCounts % 3 == 0) {
        this.openTreasure();
      }

      this.readBook(3 * 60);
    }

    this.reward();
  };

  Tomato.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.watchAds();

      _this.openTreasure();

      _this.readBook(perTime);
    });
    this.reward();
  };

  Tomato.prototype.weight = function () {
    this.goTo(this.tab, 2);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(535), (0,utils/* resizeY */.ov)(627)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  Tomato.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.sign();
    (0,utils/* scrollTo */.X5)(text("金币献爱心"));

    if ((0,utils/* findAndClick */.Od)(text("立即签到"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      this.sign();
    }
  };

  Tomato.prototype.reward = function () {
    var _this = this;

    if (this.resign) {
      logger/* Record.info */.WV.info("账号恢复正常, 重新签到");
      this.signIn();
    }

    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    if ((0,utils/* findAndClick */.Od)(textMatches("(?:立即|翻倍)领取"), {
      searchByLeftRangeOption: text("收益日报奖励"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }

    while (this.situation && ++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(textMatches("(?:立即|翻倍)领取"), {
      searchByLeftRangeOption: text("阅读赚金币"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(textMatches("(?:立即|翻倍)领取"), {
      searchByLeftRangeOption: text("听书赚金币"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }
  };

  Tomato.prototype.listenBook = function () {
    this.goTo(this.tab, 0);

    if ((0,utils/* findAndClick */.Od)(text("小说"))) {
      if ((0,utils/* findAndClick */.Od)(text("更多").boundsInside(800, 400, 1080, 600))) {
        (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(13).drawingOrder(2).boundsInside((0,utils/* resizeX */.wK)(60), (0,utils/* resizeY */.ov)(399), (0,utils/* resizeX */.wK)(1029), (0,utils/* resizeY */.ov)(1005)), random(0, 3));
        (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(9).drawingOrder(2).boundsInside((0,utils/* resizeX */.wK)(0), (0,utils/* resizeY */.ov)(273), (0,utils/* resizeX */.wK)(1080), (0,utils/* resizeY */.ov)(2340)), random(1, 5));

        if ((0,utils/* findAndClick */.Od)(className("android.widget.FrameLayout").depth(9).drawingOrder(3))) {
          if (text("看视频领时长").exists()) {
            if ((0,utils/* findAndClick */.Od)(text("看视频领时长"))) {
              this.watch(text("阅读电子书"));
            }
          }
        }
      }
    }
  };

  Tomato.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if ((0,utils/* findAndClick */.Od)(text("看书"))) {
      (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(17).drawingOrder(1).boundsInside(0, (0,utils/* resizeY */.ov)(464), (0,utils/* resizeX */.wK)(1080), (0,utils/* resizeY */.ov)(2190)), random(0, 4), id("com.xs:fm:id/axk").findOnce());
      this.read(totalTime);
    }
  };

  Tomato.prototype.watchAds = function () {
    this.goTo(this.tab, 2);

    if (text("立即观看").exists()) {
      if ((0,utils/* findAndClick */.Od)(text("立即观看"), {
        bounds: RANGE_MIDDLE_SCREEN
      })) {
        this.watch(text("日常福利"));
        var tmp = text("立即观看").findOne(10 * 1000);

        if (tmp != null) {
          this.watchAds();
        }
      }

      this.returnOfWatchAds = true;
    } else {
      this.returnOfWatchAds = false;
    }
  };

  Tomato.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  Tomato.prototype.winGoldCoin = function () {
    (0,utils/* doFuncUntilPopupsGone */.PI)(['立即前往'], {
      func: function func() {
        if ((0,utils/* findAndClick */.Od)(text("本次免费"))) {
          logger/* Record.log */.WV.log("点击抽奖");
          (0,utils/* waitRandomTime */.DV)(10);
        }
      }
    });
  };

  Tomato_decorate([decorators/* measureExecutionTime */.rM], Tomato.prototype, "highEff", null);

  Tomato_decorate([decorators/* measureExecutionTime */.rM], Tomato.prototype, "medEff", null);

  Tomato_decorate([decorators/* measureExecutionTime */.rM], Tomato.prototype, "lowEff", null);

  Tomato_decorate([decorators/* measureExecutionTime */.rM], Tomato.prototype, "weight", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("签到")], Tomato.prototype, "signIn", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], Tomato.prototype, "reward", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("听书")], Tomato.prototype, "listenBook", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("阅读")], Tomato.prototype, "readBook", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("看广告")], Tomato.prototype, "watchAds", null);

  Tomato_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], Tomato.prototype, "openTreasure", null);

  return Tomato;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/TomatoFree.ts


var TomatoFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TomatoFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var TomatoFree = function (_super) {
  TomatoFree_extends(TomatoFree, _super);

  function TomatoFree() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_TOMATO_FREE;
    _this.packageName = PACKAGE_READ_TOMATO_FREE;
    _this.tab = id(_this.packageName + ":id/bhe");
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 35 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  TomatoFree.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.mealSupp();
  };

  TomatoFree.prototype.medEff = function () {
    this.listenBook();
    this.watchAds();
    this.reward();
  };

  TomatoFree.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  TomatoFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(581), (0,utils/* resizeY */.ov)(567)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  TomatoFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("福利中心"))) {
      this.sign();
      (0,utils/* scrollTo */.X5)(text("金币献爱心"));

      if ((0,utils/* findAndClick */.Od)(text("去签到"), {
        bounds: RANGE_MIDDLE_SCREEN
      })) {
        this.sign();
      }
    }
  };

  TomatoFree.prototype.listenBook = function () {
    this.goTo(this.tab, 0);

    if ((0,utils/* findAndClick */.Od)(text("听书"))) {
      (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(21).drawingOrder(1), random(0, 1));
      (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(240, 1032)), (0,utils/* resizeY */.ov)(random(420, 2094)));
      (0,utils/* findAndClick */.Od)(className("android.widget.FrameLayout").depth(10).drawingOrder(4));
    }
  };

  TomatoFree.prototype.mealSupp = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去领取"), {
      searchByLeftRangeOption: textMatches("吃饭补贴.+"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      var reward = textStartsWith("领取").findOnce();

      if (reward != null) {
        (0,utils/* randomClick */.vn)(reward);
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {
            _this.watch(text("日常福利"));
          }
        });
      }
    }
  };

  TomatoFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if ((0,utils/* findAndClick */.Od)(text("经典"))) {
      if ((0,utils/* findAndClick */.Od)(text("完整榜单"))) {
        (0,utils/* randomClickChildInList */.Ef)(className("android.view.View").depth(19).drawingOrder(0).boundsInside((0,utils/* resizeX */.wK)(213), (0,utils/* resizeY */.ov)(249), (0,utils/* resizeX */.wK)(1080), (0,utils/* resizeY */.ov)(2340)), random(1, 6));
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(540), (0,utils/* resizeY */.ov)(1170));
        this.read(totalTime);
      }
    }
  };

  TomatoFree.prototype.reward = function () {
    var _this = this;

    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("立即领取"), {
      searchByLeftRangeOption: text("阅读赚金币"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("立即领取"), {
      searchByLeftRangeOption: text("听书赚金币"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }
  };

  TomatoFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("立即领取"), {
      searchByLeftRangeOption: textMatches("看视频赚金币.+"),
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      this.watch(text("日常福利"));
    }
  };

  TomatoFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  TomatoFree_decorate([decorators/* measureExecutionTime */.rM], TomatoFree.prototype, "highEff", null);

  TomatoFree_decorate([decorators/* measureExecutionTime */.rM], TomatoFree.prototype, "medEff", null);

  TomatoFree_decorate([decorators/* measureExecutionTime */.rM], TomatoFree.prototype, "lowEff", null);

  TomatoFree_decorate([decorators/* measureExecutionTime */.rM], TomatoFree.prototype, "weight", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("签到")], TomatoFree.prototype, "signIn", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("听书")], TomatoFree.prototype, "listenBook", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("领取餐补")], TomatoFree.prototype, "mealSupp", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("阅读")], TomatoFree.prototype, "readBook", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], TomatoFree.prototype, "reward", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("看视频")], TomatoFree.prototype, "watchAds", null);

  TomatoFree_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], TomatoFree.prototype, "openTreasure", null);

  return TomatoFree;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/TomatoLite.ts


var TomatoLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TomatoLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var TomatoLite = function (_super) {
  TomatoLite_extends(TomatoLite, _super);

  function TomatoLite() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_TOMATO_LITE;
    _this.packageName = PACKAGE_READ_TOMATO_LITE;
    _this.tab = id(_this.packageName + ":id/c7");
    _this.backTimes = 2;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 35 * 60);
    return _this;
  }

  TomatoLite.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
    this.winGoldCoin();
    if (this.situation) this.mealSupp();
  };

  TomatoLite.prototype.medEff = function () {
    this.listenBook();
    this.watchAds();
    this.reward();
  };

  TomatoLite.prototype.weight = function () {
    this.goTo(this.tab, 2);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(540), (0,utils/* resizeY */.ov)(373)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  TomatoLite.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.sign();

    if ((0,utils/* findAndClick */.Od)(text("立即签到"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.sign();
    }
  };

  TomatoLite.prototype.listenBook = function () {
    this.goTo(this.tab, 0);
    (0,utils/* randomClickChildInList */.Ef)(className("androidx.recyclerview.widget.RecyclerView").depth(17).drawingOrder(1).boundsInside(0, (0,utils/* resizeY */.ov)(464), (0,utils/* resizeX */.wK)(1080), (0,utils/* resizeY */.ov)(2190)), random(2, 6));
  };

  TomatoLite.prototype.reward = function () {
    var _this = this;

    if (this.resign) {
      logger/* Record.info */.WV.info("账号恢复正常, 重新签到");
      this.signIn();
    }

    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("立即领取"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
    }
  };

  TomatoLite.prototype.mealSupp = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去领取"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      if ((0,utils/* findAndClick */.Od)(textStartsWith("领取"))) {
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {
            _this.watch(text("日常福利"));
          }
        });
      }
    }
  };

  TomatoLite.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && text("立即观看").exists()) {
      if (cycleCounts % 3 === 0) {
        this.openTreasure();
      }

      if ((0,utils/* findAndClick */.Od)(text("立即观看"), {
        bounds: RANGE_MIDDLE_SCREEN
      })) {
        logger/* Record.log */.WV.log("\u6B63\u5728\u89C2\u770B\u7B2C".concat(cycleCounts, "\u4E2A\u5E7F\u544A"));
        this.watch(text("日常福利"));
      }

      text("立即观看").findOne(3 * 60 * 1000);
    }
  };

  TomatoLite.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.open();
  };

  TomatoLite.prototype.winGoldCoin = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去抽奖"))) {
      var cycleCounts = 0;

      while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("抽奖"), {
        bounds: RANGE_MIDDLE_SCREEN
      })) {
        (0,utils/* waitRandomTime */.DV)(5);

        if (!(0,utils/* findAndClick */.Od)(text("开心收下"))) {
          (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
            func: function func() {
              _this.watch(text("日常福利"));
            }
          });
        } else {
          break;
        }
      }
    }
  };

  TomatoLite_decorate([decorators/* measureExecutionTime */.rM], TomatoLite.prototype, "highEff", null);

  TomatoLite_decorate([decorators/* measureExecutionTime */.rM], TomatoLite.prototype, "medEff", null);

  TomatoLite_decorate([decorators/* measureExecutionTime */.rM], TomatoLite.prototype, "weight", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("签到")], TomatoLite.prototype, "signIn", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("听书")], TomatoLite.prototype, "listenBook", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], TomatoLite.prototype, "reward", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("领取餐补")], TomatoLite.prototype, "mealSupp", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("看广告")], TomatoLite.prototype, "watchAds", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], TomatoLite.prototype, "openTreasure", null);

  TomatoLite_decorate([(0,decorators/* functionLog */.qd)("去抽奖")], TomatoLite.prototype, "winGoldCoin", null);

  return TomatoLite;
}(AbstractTomato);


;// CONCATENATED MODULE: ./src/scripts/WanChao.ts


var WanChao_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var WanChao_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var WanChao = function (_super) {
  WanChao_extends(WanChao, _super);

  function WanChao() {
    var _this = _super.call(this) || this;

    _this.appName = NAME_READ_WANCHAO;
    _this.packageName = PACKAGE_READ_WANCHAO;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    return _this;
  }

  WanChao.prototype.highEff = function () {
    this.readForMoney();
  };

  WanChao.prototype.weight = function () {
    this.store(Base/* BaseKey.Weight */.N.Weight, 0);
  };

  WanChao.prototype.readForMoney = function () {
    var _a;

    if ((0,utils/* findAndClick */.Od)(text("阅读有礼"))) {
      var cycleCounts = 0;

      while (++cycleCounts < MAX_CYCLES_COUNTS && text("请完成安全验证").exists()) {
        this.overDetection();
        (0,utils/* waitRandomTime */.DV)(4);
      }

      var avoid = (_a = text("抽奖").findOnce()) === null || _a === void 0 ? void 0 : _a.parent();

      if (avoid != null) {
        var cycleCounts_1 = 0;

        while (++cycleCounts_1 < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("待完成"), {
          bounds: RANGE_FIXED_SCREEN,
          avoid: avoid
        })) {
          (0,utils/* waitRandomTime */.DV)(3);
          back();
          (0,utils/* waitRandomTime */.DV)(4);
        }
      }

      (0,utils/* findAndClick */.Od)(text("抽奖"));
      var box = idContains('nc_1_n1z').findOnce();

      if (box != null) {
        swipe(box.bounds().centerX(), box.bounds().centerY(), device.width, box.bounds().centerY() + random(-25, 0), 100);
        (0,utils/* waitRandomTime */.DV)(3);
      }

      if ((0,utils/* findAndClick */.Od)(className("android.view.View").depth(13).drawingOrder(0).boundsInside(350, 550, 700, 900))) {
        (0,utils/* findAndClick */.Od)(text("确定"));
      }
    }
  };

  WanChao.prototype.overDetection = function () {
    var detection = id("tf-verify-canvas").findOnce();
    var from = (0,utils/* resizeX */.wK)(123);
    var end = (0,utils/* resizeX */.wK)(957);
    var top = (0,utils/* resizeY */.ov)(1065);
    var region = 120;
    var relatPicDis = 150;

    if (detection != null) {
      from = detection.bounds().left;
      end = detection.bounds().right;
      top = detection.bounds().top;
    }

    var img = captureScreen();
    var min = 10000;
    var index = 0;

    for (var x = from; x < end; x++) {
      var t = 0;

      for (var dx = x; dx < x + region; dx++) {
        var color = images.pixel(img, dx, top + relatPicDis);
        var red = colors.red(color);
        var green = colors.green(color);
        var blue = colors.blue(color);
        t += (0,utils/* isGrayColor */.$v)(red, green, blue);
      }

      if (t < min) {
        min = t;
        index = x;
      }
    }

    var slideBox = className("android.view.View").depth(14).drawingOrder(0).boundsInside(100, 1400, 300, 1600).findOnce();

    if (slideBox != null) {
      var centerX = (slideBox.bounds().left + slideBox.bounds().right) / 2;
      var centerY = (slideBox.bounds().top + slideBox.bounds().bottom) / 2;
      gesture(2000, [centerX, centerY], [centerX + index - 149, centerY + random(-50, 50)]);
    }
  };

  WanChao_decorate([decorators/* measureExecutionTime */.rM], WanChao.prototype, "highEff", null);

  return WanChao;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/YouShi.ts


var YouShi_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var YouShi_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var YouShi = function (_super) {
  YouShi_extends(YouShi, _super);

  function YouShi() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频再?领[0-9]+金币'];
    _this.returnOfWatchAds = false;
    _this.appName = NAME_VEDIO_YOUSHI;
    _this.packageName = PACKAGE_VEDIO_YOUSHI;
    _this.tab = id("android:id/tabs");
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 100 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  YouShi.prototype.highEff = function () {
    this.signIn();
    this.walkEarn();
    this.mealSupp();
    this.sleepEarn();
    this.doubleEarn();
  };

  YouShi.prototype.medEff = function () {
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS) {
      this.watchAds();

      if (!this.returnOfWatchAds) {
        logger/* Record.debug */.WV.debug("break");
        break;
      }

      this.openTreasure();
      this.readBook(10 * 60);
    }

    this.reward();
  };

  YouShi.prototype.lowEff = function (time) {
    var _this = this;

    time -= 2 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.watchAds();

      _this.openTreasure();

      _this.swipeVideo(perTime);
    });
    this.reward();
  };

  YouShi.prototype.weight = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(textMatches("我的金币:.*"))) {
      var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(500), (0,utils/* resizeY */.ov)(600)).findOnce();

      if (tmp != null) {
        logger/* Record.debug */.WV.debug("".concat(this.constructor.name, ":").concat(tmp.text()));
        this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
      }
    }
  };

  YouShi.prototype.signIn = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("立即签到"), {
      bounds: RANGE_MIDDLE_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常任务"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("开心收下"));
    }
  };

  YouShi.prototype.openTreasure = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常任务"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("开心收下"));
    }
  };

  YouShi.prototype.watchAds = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("领福利"))) {
      this.watch(text("日常任务"));
      this.returnOfWatchAds = true;
    } else {
      this.returnOfWatchAds = false;
    }
  };

  YouShi.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 1);
    (0,utils/* moveDown */.vi)(totalTime, 15);
  };

  YouShi.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("点击领取"))) {
      if ((0,utils/* findAndClick */.Od)(text("开始抽奖"))) {
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(395, 689)), (0,utils/* resizeY */.ov)(random(750, 1067)));

        if ((0,utils/* findAndClick */.Od)(text("点击领取").boundsInside((0,utils/* resizeX */.wK)(0), (0,utils/* resizeY */.ov)(1190), (0,utils/* resizeX */.wK)(1080), (0,utils/* resizeY */.ov)(1305)))) {
          break;
        }
      }
    }
  };

  YouShi.prototype.mealSupp = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("吃饭补贴"))) {
      if ((0,utils/* findAndClick */.Od)(textMatches("领取.*补贴[0-9]+金币"))) {
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {
            _this.watch(text("就要开饭了! 再等等"));
          }
        });
        (0,utils/* findAndClick */.Od)(text("开心收下"));
      }
    }
  };

  YouShi.prototype.walkEarn = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("走路赚钱"))) {
      if ((0,utils/* findAndClick */.Od)(textMatches("领取[0-9]+金币"))) {
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {
            _this.watch(text("走路奖励"));
          }
        });
        (0,utils/* findAndClick */.Od)(text("开心收下"));
      }
    }
  };

  YouShi.prototype.sleepEarn = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("睡觉赚钱"))) {
      if ((0,utils/* findAndClick */.Od)(text("我睡醒了"))) {
        if ((0,utils/* findAndClick */.Od)(textMatches("领取[0-9]+金币"))) {
          (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
            func: function func() {
              _this.watch(textEndsWith("后可开启"));
            }
          });
          (0,utils/* findAndClick */.Od)(text("开心收下"));
        }
      }

      (0,utils/* findAndClick */.Od)(text("我要睡了"));
    }
  };

  YouShi.prototype.doubleEarn = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去翻倍"))) {
      (0,utils/* waitRandomTime */.DV)(2);
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  YouShi_decorate([decorators/* measureExecutionTime */.rM], YouShi.prototype, "highEff", null);

  YouShi_decorate([decorators/* measureExecutionTime */.rM], YouShi.prototype, "medEff", null);

  YouShi_decorate([decorators/* measureExecutionTime */.rM], YouShi.prototype, "lowEff", null);

  YouShi_decorate([decorators/* measureExecutionTime */.rM], YouShi.prototype, "weight", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("签到")], YouShi.prototype, "signIn", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], YouShi.prototype, "openTreasure", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("看广告")], YouShi.prototype, "watchAds", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("刷视频")], YouShi.prototype, "swipeVideo", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], YouShi.prototype, "reward", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("吃饭补贴")], YouShi.prototype, "mealSupp", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("走路赚钱")], YouShi.prototype, "walkEarn", null);

  YouShi_decorate([(0,decorators/* functionLog */.qd)("睡觉赚钱")], YouShi.prototype, "sleepEarn", null);

  return YouShi;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/abstract/AbstractFreeNovel.ts


var AbstractFreeNovel_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var AbstractFreeNovel_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AbstractFreeNovel = function (_super) {
  AbstractFreeNovel_extends(AbstractFreeNovel, _super);

  function AbstractFreeNovel(packageName) {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看小视频再领.+'];
    _this.tab = id(packageName + ":id/home_activity_navigation_bar");
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    _this.lowEffAssmitCount = 2;
    return _this;
  }

  AbstractFreeNovel.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  AbstractFreeNovel.prototype.medEff = function () {
    this.watchAds();
    this.shopping();
    this.luckySpin();
  };

  AbstractFreeNovel.prototype.lowEff = function (time) {
    var _this = this;

    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();

      return perTime;
    });
    var isFirst = true;
    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      if (isFirst) {
        _this.listenBook();

        isFirst = false;
      } else {
        _this.continueListen();
      }

      var actualTime = (0,utils/* waitRandomTime */.DV)(perTime);

      _this.openTreasure();

      return actualTime;
    });
  };

  AbstractFreeNovel.prototype.weight = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("我的金币"), {
      bounds: RANGE_FIXED_SCREEN
    })) {
      var tmp = textStartsWith("今日金币").findOnce();

      if (tmp != null) {
        var match = tmp.text().replace(",", "").match(/[0-9]+/);

        if (match) {
          logger/* Record.debug */.WV.debug("".concat(this.constructor.name, ":").concat(parseInt(match[0])));
          this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(match[0]));
        }
      }
    }
  };

  AbstractFreeNovel.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.clickPop();
  };

  AbstractFreeNovel.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.clickPop();

    if ((0,utils/* findAndClick */.Od)(textMatches((0,utils/* merge */.TS)(['开宝箱得金币', '[0-9]+分[0-9]+秒'])))) {
      this.clickPop();
    }
  };

  AbstractFreeNovel.prototype.watchAds = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
      (0,utils/* findAndClick */.Od)(text("领金币"));
    }
  };

  AbstractFreeNovel.prototype.shopping = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去逛逛"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
      (0,utils/* findAndClick */.Od)(text("领金币"));
    }
  };

  AbstractFreeNovel.prototype.readBook = function (totalTime) {
    this.openBook();
    this.read(totalTime);
  };

  AbstractFreeNovel.prototype.listenBook = function () {
    this.openBook();
    click(device.width / 2, device.height / 2);
    (0,utils/* waitRandomTime */.DV)(2);

    if ((0,utils/* findAndClick */.Od)(id(this.packageName + ":id/reader_listen_entry"))) {
      if ((0,utils/* findAndClick */.Od)(text("去看小视频"))) {
        this.watch(text("边听边读"));
      }

      (0,utils/* findAndClick */.Od)(text("边听边读"));
    }
  };

  AbstractFreeNovel.prototype.luckySpin = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("去抽奖"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      for (var i = 0; i < 5; i++) {
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(475, 610)), (0,utils/* resizeY */.ov)(random(1135, 1280)));
        (0,utils/* waitRandomTime */.DV)(4);

        if (i != 0) {
          this.watch(text("幸运大转盘"));
        }

        (0,utils/* waitRandomTime */.DV)(10);
        (0,utils/* findAndClick */.Od)(text("好的"));
      }
    }
  };

  AbstractFreeNovel.prototype.continueListen = function () {
    if ((0,utils/* findAndClick */.Od)(id(this.packageName + ":id/voice_rl"))) {
      if ((0,utils/* findAndClick */.Od)(text("去看小视频"))) {
        this.watch(text("边听边读"));
      }

      (0,utils/* findAndClick */.Od)(text("边听边读"));
    }
  };

  AbstractFreeNovel.prototype.openBook = function () {
    this.goTo(this.tab, 1);

    if ((0,utils/* findAndClick */.Od)(text("完整榜单"))) {
      (0,utils/* randomClickChildInList */.Ef)(id(this.packageName + ":id/right_content_view"), random(0, 8));
    }
  };

  AbstractFreeNovel.prototype.clickPop = function () {
    var _this = this;

    var flag = true;
    (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
      func: function func() {
        _this.watch(text("日常福利"));

        flag = false;
      }
    });

    if (flag) {
      var str = (0,utils/* getStrByOcrRecognizeLimitBounds */.B)();
      var match = str.match(/看小视频再领[0-9]+金币/);

      if (match) {
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(350, 700)), (0,utils/* resizeY */.ov)(random(1250, 1300)));
        this.watch(text("日常福利"));
      }
    }
  };

  AbstractFreeNovel_decorate([decorators/* measureExecutionTime */.rM], AbstractFreeNovel.prototype, "highEff", null);

  AbstractFreeNovel_decorate([decorators/* measureExecutionTime */.rM], AbstractFreeNovel.prototype, "medEff", null);

  AbstractFreeNovel_decorate([decorators/* measureExecutionTime */.rM], AbstractFreeNovel.prototype, "lowEff", null);

  AbstractFreeNovel_decorate([decorators/* measureExecutionTime */.rM], AbstractFreeNovel.prototype, "weight", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("签到")], AbstractFreeNovel.prototype, "signIn", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], AbstractFreeNovel.prototype, "openTreasure", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("看视频")], AbstractFreeNovel.prototype, "watchAds", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("逛街")], AbstractFreeNovel.prototype, "shopping", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("阅读")], AbstractFreeNovel.prototype, "readBook", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("听书")], AbstractFreeNovel.prototype, "listenBook", null);

  AbstractFreeNovel_decorate([(0,decorators/* functionLog */.qd)("幸运大转盘")], AbstractFreeNovel.prototype, "luckySpin", null);

  return AbstractFreeNovel;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/StarrySky.ts
var StarrySky_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var StarrySky = function (_super) {
  StarrySky_extends(StarrySky, _super);

  function StarrySky() {
    var _this = _super.call(this, PACKAGE_READ_STARRY_SKY) || this;

    _this.appName = NAME_READ_STARRY_SKY;
    _this.packageName = PACKAGE_READ_STARRY_SKY;
    return _this;
  }

  return StarrySky;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/EggplantFree.ts
var EggplantFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var EggplantFree = function (_super) {
  EggplantFree_extends(EggplantFree, _super);

  function EggplantFree() {
    var _this = _super.call(this, PACKAGE_EGGPLANT_FREE) || this;

    _this.appName = NAME_READ_EGGPLANT_FREE;
    _this.packageName = PACKAGE_EGGPLANT_FREE;
    return _this;
  }

  return EggplantFree;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/PandaBrain.ts
var PandaBrain_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();




var PandaBrain = function (_super) {
  PandaBrain_extends(PandaBrain, _super);

  function PandaBrain() {
    var _this = _super.call(this, PACKAGE_READ_PANDA_BRAIN) || this;

    _this.appName = NAME_READ_PANDA_BRAIN;
    _this.packageName = PACKAGE_READ_PANDA_BRAIN;
    return _this;
  }

  return PandaBrain;
}(AbstractFreeNovel);


;// CONCATENATED MODULE: ./src/scripts/SpeedFree.ts


var SpeedFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var SpeedFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SpeedFree = function (_super) {
  SpeedFree_extends(SpeedFree, _super);

  function SpeedFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频再领[0-9]+金币', '看视频最高领[0-9]+金币'];
    _this.appName = NAME_READ_SPEED_FREE;
    _this.packageName = PACKAGE_READ_SPEED_FREE;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 20 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  SpeedFree.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  SpeedFree.prototype.medEff = function () {
    this.listenBook();
    this.watchAds();
    this.reward();
  };

  SpeedFree.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  SpeedFree.prototype.weight = function () {
    this.goTo(desc("discovery_button"), -1);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches("[0-9]+").boundsInside(0, 0, (0,utils/* resizeX */.wK)(420), (0,utils/* resizeY */.ov)(432)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  SpeedFree.prototype.signIn = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(textStartsWith("立即签到"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  SpeedFree.prototype.openTreasure = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  SpeedFree.prototype.watchAds = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  SpeedFree.prototype.readBook = function (totalTime) {
    this.goTo(desc("bookstore_button"), -1);
    (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(320), (0,utils/* resizeY */.ov)(400));
    (0,utils/* randomClickChildInList */.Ef)(classNameMatches((0,utils/* merge */.TS)(["android.support.v7.widget.RecyclerView", "android.view.ViewGroup"])).depth(17).drawingOrder(1), random(0, 7));
    this.read(totalTime);
  };

  SpeedFree.prototype.listenBook = function () {
    this.goTo(desc("bookstore_button"), -1);
    (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(750), (0,utils/* resizeY */.ov)(385));
    (0,utils/* randomClickChildInList */.Ef)(className("android.view.ViewGroup").depth(16).drawingOrder(2).boundsInside((0,utils/* resizeX */.wK)(36), (0,utils/* resizeY */.ov)(648), (0,utils/* resizeX */.wK)(1044), (0,utils/* resizeY */.ov)(1037)), random(0, 3));

    if ((0,utils/* findAndClick */.Od)(text("立即收听"))) {
      back();
      (0,utils/* waitRandomTime */.DV)(4);
    }

    back();
  };

  SpeedFree.prototype.mealSupp = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);

    if ((0,utils/* findAndClick */.Od)(text("立即领取"), {
      searchByLeftRangeOption: text("吃饭赚钱"),
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  SpeedFree.prototype.reward = function () {
    var _this = this;

    this.goTo(desc("discovery_button"), -1);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("领取"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常福利"));
        }
      });
      (0,utils/* findAndClick */.Od)(text("我知道了"));
    }
  };

  SpeedFree_decorate([decorators/* measureExecutionTime */.rM], SpeedFree.prototype, "highEff", null);

  SpeedFree_decorate([decorators/* measureExecutionTime */.rM], SpeedFree.prototype, "medEff", null);

  SpeedFree_decorate([decorators/* measureExecutionTime */.rM], SpeedFree.prototype, "lowEff", null);

  SpeedFree_decorate([decorators/* measureExecutionTime */.rM], SpeedFree.prototype, "weight", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("签到")], SpeedFree.prototype, "signIn", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], SpeedFree.prototype, "openTreasure", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("看广告")], SpeedFree.prototype, "watchAds", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("阅读")], SpeedFree.prototype, "readBook", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("听书")], SpeedFree.prototype, "listenBook", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("领饭补")], SpeedFree.prototype, "mealSupp", null);

  SpeedFree_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], SpeedFree.prototype, "reward", null);

  return SpeedFree;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/MarvelFree.ts


var MarvelFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var MarvelFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MarvelFree = function (_super) {
  MarvelFree_extends(MarvelFree, _super);

  function MarvelFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频再领(最高)?[0-9]+金币'];
    _this.appName = NAME_READ_MARVEL_FREE;
    _this.packageName = PACKAGE_READ_MARVEL_FREE;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.depth = 1;
    _this.exitNum = 0;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 10 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  MarvelFree.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  MarvelFree.prototype.medEff = function () {
    this.watchAds();
  };

  MarvelFree.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  MarvelFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches("[0-9]+").boundsInside(0, 0, (0,utils/* resizeX */.wK)(582), (0,utils/* resizeY */.ov)(735)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  MarvelFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if (textStartsWith("今日签到").exists()) {
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  MarvelFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("开宝箱"))) {
      this.clickPop();
    }
  };

  MarvelFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && textMatches("看视频领金币.+").exists() && (0,utils/* findAndClick */.Od)(text("去领取"), {
      searchByLeftRangeOption: textMatches("看视频领金币.+"),
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
    }
  };

  MarvelFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 0);

    if ((0,utils/* findAndClick */.Od)(text("男生"))) {
      if ((0,utils/* findAndClick */.Od)(id(PACKAGE_READ_MARVEL_FREE + ":id/tv_right_title"))) {
        (0,utils/* randomClickChildInList */.Ef)(id(PACKAGE_READ_MARVEL_FREE + ":id/rv_gender_rank"), random(0, 5));
        this.read(totalTime);
      }
    }
  };

  MarvelFree.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("领金币").depth(24))) {
      this.clickPop();
    }
  };

  MarvelFree.prototype.clickPop = function () {
    var _this = this;

    var flag = true;
    (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
      func: function func() {
        _this.watch(text("日常福利"));

        flag = false;
      }
    });

    if (flag) {
      var str = (0,utils/* getStrByOcrRecognizeLimitBounds */.B)();
      var match = str.match(/看视频再领(最高)?[0-9]+金币/);

      if (match) {
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(300, 800)), (0,utils/* resizeY */.ov)(random(1150, 1250)));
        this.watch(text("日常福利"));
      }
    }
  };

  MarvelFree_decorate([decorators/* measureExecutionTime */.rM], MarvelFree.prototype, "highEff", null);

  MarvelFree_decorate([decorators/* measureExecutionTime */.rM], MarvelFree.prototype, "medEff", null);

  MarvelFree_decorate([decorators/* measureExecutionTime */.rM], MarvelFree.prototype, "lowEff", null);

  MarvelFree_decorate([decorators/* measureExecutionTime */.rM], MarvelFree.prototype, "weight", null);

  MarvelFree_decorate([(0,decorators/* functionLog */.qd)("签到")], MarvelFree.prototype, "signIn", null);

  MarvelFree_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], MarvelFree.prototype, "openTreasure", null);

  MarvelFree_decorate([(0,decorators/* functionLog */.qd)("看视频")], MarvelFree.prototype, "watchAds", null);

  MarvelFree_decorate([(0,decorators/* functionLog */.qd)("阅读")], MarvelFree.prototype, "readBook", null);

  MarvelFree_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], MarvelFree.prototype, "reward", null);

  return MarvelFree;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/SevenCatsFree.ts


var SevenCatsFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var SevenCatsFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SevenCatsFree = function (_super) {
  SevenCatsFree_extends(SevenCatsFree, _super);

  function SevenCatsFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看小视频再领.*'];
    _this.appName = NAME_READ_SEVEN_CATS_FREE;
    _this.packageName = PACKAGE_READ_SEVEN_CATS_FREE;
    _this.tab = id(_this.packageName + ":id/home_activity_navigation_bar");
    _this.lowEffAssmitCount = 2;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 10 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  SevenCatsFree.prototype.highEff = function () {
    (0,utils/* closeByImageMatching */.bB)();
    this.signIn();
    this.openTreasure();
  };

  SevenCatsFree.prototype.medEff = function () {
    this.watchAds();
    this.shopping();
  };

  SevenCatsFree.prototype.lowEff = function (time) {
    var _this = this;

    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.listenBook();
    (0,utils/* doFuncAtGivenTime */.d$)(time / 2, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
  };

  SevenCatsFree.prototype.weight = function () {
    this.goTo(this.tab, 2);
    var tmp = textMatches(".*今日金币.*").findOnce();

    if (tmp != null) {
      var match = tmp.text().match(/[0-9]+今日金币/);

      if (match) {
        this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(match[0]));
      }
    }
  };

  SevenCatsFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);
    this.clickPop();
  };

  SevenCatsFree.prototype.openTreasure = function () {
    this.goTo(this.tab, 2);
    this.clickPop();

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {
      this.clickPop();
    }
  };

  SevenCatsFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
      (0,utils/* findAndClick */.Od)(text("领金币"));
    }
  };

  SevenCatsFree.prototype.shopping = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去逛逛"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常福利"));
      (0,utils/* findAndClick */.Od)(text("领金币"));
    }
  };

  SevenCatsFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 1);

    if ((0,utils/* findAndClick */.Od)(text("热门"))) {
      if ((0,utils/* findAndClick */.Od)(textMatches("完整榜单.*"))) {
        (0,utils/* randomClickChildInList */.Ef)(id(this.packageName + ":id/right_content_view"), random(0, 6));
        this.read(totalTime);
      }
    }
  };

  SevenCatsFree.prototype.listenBook = function () {
    this.goTo(this.tab, 1);

    if ((0,utils/* findAndClick */.Od)(text("听书"))) {
      if ((0,utils/* findAndClick */.Od)(textMatches("完整榜单.*"))) {
        (0,utils/* randomClickChildInList */.Ef)(id(this.packageName + ":id/right_content_view"), random(0, 7));

        if ((0,utils/* findAndClick */.Od)(id(this.packageName + ":id/book_detail_foot_free_read_tv"))) {
          if ((0,utils/* findAndClick */.Od)(text("去看小视频"))) {
            this.watch(id(this.packageName + ":id/activity_voice_play_bg"));
          }
        }
      }
    }
  };

  SevenCatsFree.prototype.clickPop = function () {
    var _this = this;

    var flag = true;
    (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
      func: function func() {
        _this.watch(text("日常福利"));

        flag = false;
      }
    });

    if (flag) {
      var str = (0,utils/* getStrByOcrRecognizeLimitBounds */.B)();
      var match = str.match(/看小视频再领[0-9]+金币/);

      if (match) {
        (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(350, 700)), (0,utils/* resizeY */.ov)(random(1250, 1300)));
        this.watch(text("日常福利"));
      }
    }
  };

  SevenCatsFree_decorate([decorators/* measureExecutionTime */.rM], SevenCatsFree.prototype, "highEff", null);

  SevenCatsFree_decorate([decorators/* measureExecutionTime */.rM], SevenCatsFree.prototype, "medEff", null);

  SevenCatsFree_decorate([decorators/* measureExecutionTime */.rM], SevenCatsFree.prototype, "lowEff", null);

  SevenCatsFree_decorate([decorators/* measureExecutionTime */.rM], SevenCatsFree.prototype, "weight", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("签到")], SevenCatsFree.prototype, "signIn", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], SevenCatsFree.prototype, "openTreasure", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("看广告")], SevenCatsFree.prototype, "watchAds", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("逛街")], SevenCatsFree.prototype, "shopping", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("阅读")], SevenCatsFree.prototype, "readBook", null);

  SevenCatsFree_decorate([(0,decorators/* functionLog */.qd)("听书")], SevenCatsFree.prototype, "listenBook", null);

  return SevenCatsFree;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/ShuQi.ts


var ShuQi_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var ShuQi_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ShuQi = function (_super) {
  ShuQi_extends(ShuQi, _super);

  function ShuQi() {
    var _this = _super.call(this) || this;

    _this.coin = 0;
    _this.appName = NAME_READ_SHUQI;
    _this.packageName = PACKAGE_READ_SHUQI;
    _this.tab = id("android:id/tabs");
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 10 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  ShuQi.prototype.highEff = function () {
    (0,utils/* closeByImageMatching */.bB)();
    this.signIn();
    this.coin = this.record();
  };

  ShuQi.prototype.medEff = function () {
    this.watchAds();
    this.reward();
  };

  ShuQi.prototype.lowEff = function (time) {
    time -= 3 * 60;
    this.readBook(time);
    this.reward();
  };

  ShuQi.prototype.weight = function () {
    var cCoin = this.record();
    logger/* Record.debug */.WV.debug("".concat(cCoin));
    this.store(Base/* BaseKey.Weight */.N.Weight, cCoin - this.coin);
  };

  ShuQi.prototype.signIn = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("立即签到"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(['看视频领取[0-9]+金币'], {
        func: function func() {
          _this.watch(text("做任务 赚金币"));
        }
      });
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  ShuQi.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去观看"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("做任务 赚金币"));
    }
  };

  ShuQi.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 1);

    if ((0,utils/* findAndClick */.Od)(text("完整榜单"))) {
      (0,utils/* randomClickChildInList */.Ef)(id(this.packageName + ":id/rank_book_recycle_view"), random(0, 6));
      this.read(totalTime);
    }
  };

  ShuQi.prototype.reward = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("领取奖励"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {}

    if ((0,utils/* findAndClick */.Od)(text("一键收取"))) {
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  ShuQi.prototype.record = function () {
    this.goTo(this.tab, 2);
    var tmp = textMatches("[0-9]+金币.*").boundsInside(0, 0, (0,utils/* resizeX */.wK)(500), (0,utils/* resizeY */.ov)(500)).findOnce();

    if (tmp != null) {
      logger/* Record.debug */.WV.debug("".concat(tmp.text()));
      return parseInt(tmp.text());
    }

    return 0;
  };

  ShuQi_decorate([decorators/* measureExecutionTime */.rM], ShuQi.prototype, "highEff", null);

  ShuQi_decorate([decorators/* measureExecutionTime */.rM], ShuQi.prototype, "medEff", null);

  ShuQi_decorate([decorators/* measureExecutionTime */.rM], ShuQi.prototype, "lowEff", null);

  ShuQi_decorate([decorators/* measureExecutionTime */.rM], ShuQi.prototype, "weight", null);

  ShuQi_decorate([(0,decorators/* functionLog */.qd)("签到")], ShuQi.prototype, "signIn", null);

  ShuQi_decorate([(0,decorators/* functionLog */.qd)("看视频")], ShuQi.prototype, "watchAds", null);

  ShuQi_decorate([(0,decorators/* functionLog */.qd)("阅读")], ShuQi.prototype, "readBook", null);

  ShuQi_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], ShuQi.prototype, "reward", null);

  return ShuQi;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/KuaiShouFree.ts


var KuaiShouFree_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShouFree_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var KuaiShouFree = function (_super) {
  KuaiShouFree_extends(KuaiShouFree, _super);

  function KuaiShouFree() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看视频赚更多', '看广告赚更多'];
    _this.coin = 0;
    _this.appName = NAME_READ_KUAISHOU_FREE;
    _this.packageName = PACKAGE_READ_KUAISHOU_FREE;
    _this.tab = id(_this.packageName + ":id/home_bottom_bar");
    _this.exitNum = 2;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShouFree.prototype.highEff = function () {
    this.signIn();
    this.coin = this.record();
    this.openTreasure();
  };

  KuaiShouFree.prototype.medEff = function () {
    this.watchAds();
  };

  KuaiShouFree.prototype.lowEff = function (time) {
    var _this = this;

    time -= 5 * 60;
    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.readBook(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  KuaiShouFree.prototype.weight = function () {
    var cCoin = this.record();
    this.store(Base/* BaseKey.Weight */.N.Weight, (cCoin - this.coin) * 10000);
  };

  KuaiShouFree.prototype.signIn = function () {
    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(text("立即签到"))) {
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  KuaiShouFree.prototype.watchAds = function () {
    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("去赚钱"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      this.watch(text("日常任务"));
    }
  };

  KuaiShouFree.prototype.openTreasure = function () {
    var _this = this;

    this.goTo(this.tab, 2);

    if ((0,utils/* findAndClick */.Od)(textMatches("点击领[0-9]+金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常任务"));
        }
      });
    }
  };

  KuaiShouFree.prototype.readBook = function (totalTime) {
    this.goTo(this.tab, 1);
    (0,utils/* findAndClick */.Od)(textMatches("领[0-9]+金币"));

    if ((0,utils/* findAndClick */.Od)(text("完整榜单"), {
      bounds: RANGE_FOUR_FIFTHS_SCREEN
    })) {
      (0,utils/* randomClickChildInList */.Ef)(id(PACKAGE_READ_KUAISHOU_FREE + ":id/recycler_view"), random(0, 7));
      this.read(totalTime);
    }
  };

  KuaiShouFree.prototype.reward = function () {
    var _this = this;

    this.goTo(this.tab, 2);
    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text(""), {
      searchByLeftRangeOption: text("认真阅读小说额外奖励")
    })) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {
          _this.watch(text("日常任务"));
        }
      });
    }
  };

  KuaiShouFree.prototype.record = function () {
    this.goTo(this.tab, 2);
    var tmp = textMatches("约[0-9]+.[0-9]+元").findOnce();

    if (tmp != null) {
      var match = tmp.text().match(/[0-9]+.[0-9]+/);

      if (match) {
        return parseInt(match[0]);
      }
    }

    return 0;
  };

  KuaiShouFree_decorate([decorators/* measureExecutionTime */.rM], KuaiShouFree.prototype, "highEff", null);

  KuaiShouFree_decorate([decorators/* measureExecutionTime */.rM], KuaiShouFree.prototype, "medEff", null);

  KuaiShouFree_decorate([decorators/* measureExecutionTime */.rM], KuaiShouFree.prototype, "lowEff", null);

  KuaiShouFree_decorate([decorators/* measureExecutionTime */.rM], KuaiShouFree.prototype, "weight", null);

  KuaiShouFree_decorate([(0,decorators/* functionLog */.qd)("签到")], KuaiShouFree.prototype, "signIn", null);

  KuaiShouFree_decorate([(0,decorators/* functionLog */.qd)("看视频")], KuaiShouFree.prototype, "watchAds", null);

  KuaiShouFree_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], KuaiShouFree.prototype, "openTreasure", null);

  KuaiShouFree_decorate([(0,decorators/* functionLog */.qd)("阅读")], KuaiShouFree.prototype, "readBook", null);

  KuaiShouFree_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], KuaiShouFree.prototype, "reward", null);

  return KuaiShouFree;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/KuaiShou.ts


var KuaiShou_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KuaiShou_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var KuaiShou = function (_super) {
  KuaiShou_extends(KuaiShou, _super);

  function KuaiShou() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看内容最高可得[0-9]+金币.*', '看视频最高可得[0-9]+金币.*'];
    _this.appName = NAME_VEDIO_KUAISHOU;
    _this.packageName = PACKAGE_VEDIO_KUAISHOU;
    _this.tab = id(_this.packageName + ":id/tab_layout");
    _this.register = id(_this.packageName + ":id/pendant_mask_bg");
    _this.depth = 1;
    _this.highEffEstimatedTime = _this.fetch(Base/* BaseKey.highEffEstimatedTime */.N.highEffEstimatedTime, BASE_ASSIMT_TIME);
    _this.medEffEstimatedTime = _this.fetch(Base/* BaseKey.medEffEstimatedTime */.N.medEffEstimatedTime, 15 * 60);
    _this.lowEffEstimatedTime = 0;
    return _this;
  }

  KuaiShou.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  KuaiShou.prototype.medEff = function () {
    this.watchAds();
    this.openTreasure();
    this.watchlive();
  };

  KuaiShou.prototype.lowEff = function (time) {
    var _this = this;

    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();
    });
    this.reward();
  };

  KuaiShou.prototype.weight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    (0,utils/* scrollTo */.X5)(text("金币收益"));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(549), (0,utils/* resizeY */.ov)(429)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  KuaiShou.prototype.signIn = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("立即领取"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {}
      });
      (0,utils/* closeByImageMatching */.bB)();
    }
  };

  KuaiShou.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 1);
    (0,utils/* moveDown */.vi)(totalTime, 10);
  };

  KuaiShou.prototype.openTreasure = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(textMatches("立刻领[0-9]+金币"))) {
      (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
        func: function func() {}
      });
    }
  };

  KuaiShou.prototype.watchAds = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    var cycleCounts = 0;

    while (++cycleCounts < MAX_CYCLES_COUNTS && (0,utils/* findAndClick */.Od)(text("领福利 赚更多")), RANGE_FOUR_FIFTHS_SCREEN) {}
  };

  KuaiShou.prototype.watchlive = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去观看")), RANGE_FOUR_FIFTHS_SCREEN) {
      for (var i = 0; i < 6; i++) {
        var tmp = id(this.packageName + ":id/recycler_view").findOnce();

        if (tmp != null) {
          var child = tmp.child(0);

          if (child != null) {
            child.click();
            (0,utils/* waitRandomTime */.DV)(40);
            back();
            (0,utils/* waitRandomTime */.DV)(4);
            (0,utils/* findAndClick */.Od)(text("退出"));
          }

          for (var j = 0; j < 2; j++) {
            tmp.scrollForward();
            (0,utils/* waitRandomTime */.DV)(2);
          }
        }
      }

      this.backUntilFind(text("日常任务"));

      if ((0,utils/* findAndClick */.Od)(text("领金币 限时领"))) {
        (0,utils/* findAndClick */.Od)(text("知道了"));
      }
    }
  };

  KuaiShou.prototype.mealSupp = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去领取"))) {
      if ((0,utils/* findAndClick */.Od)(text("领取饭补"))) {
        (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
          func: function func() {}
        });
      }

      this.backUntilFind(text("日常任务"));
    }
  };

  KuaiShou.prototype.reward = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    (0,utils/* findAndClick */.Od)(text("领取奖励"));
  };

  KuaiShou_decorate([decorators/* measureExecutionTime */.rM], KuaiShou.prototype, "highEff", null);

  KuaiShou_decorate([decorators/* measureExecutionTime */.rM], KuaiShou.prototype, "medEff", null);

  KuaiShou_decorate([decorators/* measureExecutionTime */.rM], KuaiShou.prototype, "lowEff", null);

  KuaiShou_decorate([decorators/* measureExecutionTime */.rM], KuaiShou.prototype, "weight", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("签到")], KuaiShou.prototype, "signIn", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("刷视频")], KuaiShou.prototype, "swipeVideo", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], KuaiShou.prototype, "openTreasure", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("看视频")], KuaiShou.prototype, "watchAds", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("看直播")], KuaiShou.prototype, "watchlive", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("领饭补")], KuaiShou.prototype, "mealSupp", null);

  KuaiShou_decorate([(0,decorators/* functionLog */.qd)("领取所有奖励")], KuaiShou.prototype, "reward", null);

  return KuaiShou;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/scripts/TikTokLite.ts


var TikTokLite_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var TikTokLite_decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,esm_typeof/* default */.Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TikTokLite = function (_super) {
  TikTokLite_extends(TikTokLite, _super);

  function TikTokLite() {
    var _this = _super.call(this) || this;

    _this.buttonNameList = ['看广告视频再赚'];
    _this.appName = NAME_VEDIO_TIKTOK_LITE;
    _this.packageName = PACKAGE_VEDIO_TIKTOK_LITE;
    _this.register = className("android.widget.ImageView").depth(19).drawingOrder(1);
    _this.tab = id(_this.packageName + ":id/root_view");
    return _this;
  }

  TikTokLite.prototype.highEff = function () {
    this.signIn();
    this.openTreasure();
  };

  TikTokLite.prototype.medEff = function () {
    this.watchLive();
    this.shopping();
  };

  TikTokLite.prototype.lowEff = function (time) {
    var _this = this;

    (0,utils/* doFuncAtGivenTime */.d$)(time, 10 * 60, function (perTime) {
      _this.swipeVideo(perTime);

      _this.openTreasure();

      _this.watchAds();
    });
  };

  TikTokLite.prototype.weight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    (0,utils/* scrollTo */.X5)(text("金币收益"));
    (0,utils/* normalClick */.Uw)((0,utils/* resizeX */.wK)(random(104, 328)), (0,utils/* resizeY */.ov)(random(389, 493)));
    var tmp = textMatches(/(\d+)/).boundsInside(0, 0, (0,utils/* resizeX */.wK)(328), (0,utils/* resizeY */.ov)(594)).findOnce();

    if (tmp != null) {
      this.store(Base/* BaseKey.Weight */.N.Weight, parseInt(tmp.text()));
    }
  };

  TikTokLite.prototype.signIn = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    (0,utils/* findAndClick */.Od)(text("点击领取"));
    (0,utils/* doFuncUntilPopupsGone */.PI)(this.buttonNameList, {
      func: function func() {}
    });
  };

  TikTokLite.prototype.openTreasure = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("开宝箱得金币"))) {}
  };

  TikTokLite.prototype.watchAds = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去观看"))) {}
  };

  TikTokLite.prototype.watchLive = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去看看"))) {
      for (var i = 0; i < 10; i++) {
        var tmp = text("开宝箱").findOne(3 * 65 * 1000);

        if (tmp != null) {
          (0,utils/* randomClick */.vn)(tmp);
          back();
        }
      }

      this.backUntilFind(text("日常任务"));
    }
  };

  TikTokLite.prototype.shopping = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去逛街"))) {
      (0,utils/* moveDown */.vi)(95, 2);
    }
  };

  TikTokLite.prototype.goodNight = function () {
    if (!text("日常任务").exists()) {
      this.goTo(this.register, -1);
    }

    if ((0,utils/* findAndClick */.Od)(text("去小岛"))) {
      if ((0,utils/* findAndClick */.Od)(text("我睡觉了"))) {
        this.backUntilFind(text("日常任务"));
      }
    }
  };

  TikTokLite.prototype.swipeVideo = function (totalTime) {
    this.goTo(this.tab, 0);
    (0,utils/* moveDown */.vi)(totalTime, 10);
  };

  TikTokLite_decorate([decorators/* measureExecutionTime */.rM], TikTokLite.prototype, "highEff", null);

  TikTokLite_decorate([decorators/* measureExecutionTime */.rM], TikTokLite.prototype, "medEff", null);

  TikTokLite_decorate([decorators/* measureExecutionTime */.rM], TikTokLite.prototype, "lowEff", null);

  TikTokLite_decorate([decorators/* measureExecutionTime */.rM], TikTokLite.prototype, "weight", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("签到")], TikTokLite.prototype, "signIn", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("开宝箱")], TikTokLite.prototype, "openTreasure", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("看视频")], TikTokLite.prototype, "watchAds", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("看直播")], TikTokLite.prototype, "watchLive", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("逛街")], TikTokLite.prototype, "shopping", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("晚安小岛")], TikTokLite.prototype, "goodNight", null);

  TikTokLite_decorate([(0,decorators/* functionLog */.qd)("刷视频")], TikTokLite.prototype, "swipeVideo", null);

  return TikTokLite;
}(Base/* Base */.X);


;// CONCATENATED MODULE: ./src/global.ts
var _a;






















var PROJECT_NAME = "智能助手";
var VERSION = "0.2.0";
var WX_PUSHER_URL = "https://wxpusher.zjiecode.com/api/send/message";
var APP_TOKEN = "AT_2vEaUfXFmwMKybX7YeX3yCJFrmc7TFlD";
var MAX_BACK_COUNTS = 10;
var MAX_CLICK_COUNTS = 8;
var MAX_RETRY_COUNTS = 3;
var WAIT_TIME_AFTER_CLICK = 4;
var MAX_CYCLES_COUNTS = 25;
var REDUNDANCY_TIME = 3 * 60;
var BASE_ASSIMT_TIME = 10 * 60;
var WEIGHT_ASSIMT_TIME = (/* unused pure expression or super */ null && (5 * 60));
var MAX_ASSIMT_TIME = 24 * 60 * 60;
var STORAGE_WEIGHT_CONTAINER = "YWfjbEVp28";
var STORAGE = storages.create(STORAGE_WEIGHT_CONTAINER);
var DEVICE_WIDTH = 1080;
var DEVICE_HEIGHT = 2340;
var RANGE_MIDDLE_SCREEN = {
  top: device.height * 1 / 3,
  bottom: device.height * 2 / 3
};
var RANGE_FOUR_FIFTHS_SCREEN = {
  top: device.height * 1 / 5,
  bottom: device.height * 4 / 5
};
var RANGE_FIXED_SCREEN = {
  top: (0,utils/* resizeX */.wK)(200),
  bottom: (0,utils/* resizeY */.ov)(2140)
};
var NAME_READ_TOMATO = "番茄畅听";
var PACKAGE_READ_TOMATO = "com.xs.fm";
var NAME_READ_TOMATO_FREE = "番茄免费小说";
var PACKAGE_READ_TOMATO_FREE = "com.dragon.read";
var NAME_READ_TOMATO_LITE = "番茄畅听音乐版";
var PACKAGE_READ_TOMATO_LITE = "com.xs.fm.lite";
var NAME_READ_RED_FRUITS = "红果免费短剧";
var PACKAGE_READ_RED_FRUITS = "com.phoenix.read";
var NAME_READ_DEJIAN = "得间小说";
var PACKAGE_READ_DEJIAN = "com.chaozh.iReader.dj";
var NAME_READ_EGGPLANT_FREE = "茄子免费小说";
var PACKAGE_EGGPLANT_FREE = "com.qz.freader";
var NAME_READ_PANDA_BRAIN = "熊猫脑洞小说";
var PACKAGE_READ_PANDA_BRAIN = "com.xm.freader";
var NAME_READ_MARVEL_FREE = "奇迹免费小说";
var PACKAGE_READ_MARVEL_FREE = "reader.com.xmly.xmlyreader";
var NAME_READ_SPEED_FREE = "速读免费小说";
var PACKAGE_READ_SPEED_FREE = "com.dj.speed";
var NAME_READ_SHUQI = "书旗小说";
var PACKAGE_READ_SHUQI = "com.shuqi.controller";
var NAME_READ_SEVEN_CATS_FREE = "七猫免费小说";
var PACKAGE_READ_SEVEN_CATS_FREE = "com.kmxs.reader";
var NAME_READ_WANCHAO = "望潮";
var PACKAGE_READ_WANCHAO = "com.shangc.tiennews.taizhou";
var NAME_READ_STARRY_SKY = "星空免费小说";
var PACKAGE_READ_STARRY_SKY = "com.xk.qreader";
var NAME_VEDIO_TIKTOK_LITE = "抖音极速版";
var PACKAGE_VEDIO_TIKTOK_LITE = "com.ss.android.ugc.aweme.lite";
var NAME_VEDIO_KUAISHOU = "快手";
var PACKAGE_VEDIO_KUAISHOU = "com.smile.gifmaker";
var NAME_READ_KUAISHOU_FREE = "快手免费小说";
var PACKAGE_READ_KUAISHOU_FREE = "com.kuaishou.kgx.novel";
var NAME_VEDIO_KUAISHOU_LITE = "快手极速版";
var PACKAGE_VEDIO_KUAISHOU_LITE = "com.kuaishou.nebula";
var NAME_VEDIO_YOUSHI = "有柿";
var PACKAGE_VEDIO_YOUSHI = "com.ss.android.article.search";
var youShi = new YouShi();
var shuQi = new ShuQi();
var starrySky = new StarrySky();
var marvelFree = new MarvelFree();
var eggplantFree = new EggplantFree();
var sevenCatsFree = new SevenCatsFree();
var pandaBrain = new PandaBrain();
var tomato = new Tomato();
var tomatoFree = new TomatoFree();
var tomatoLite = new TomatoLite();
var redFruits = new RedFruits();
var kuaiShouFree = new KuaiShouFree();
var kuaiShou = new KuaiShou();
var kuaiShouLite = new KuaiShouLite();
var tikTokLite = new TikTokLite();
var speedFree = new SpeedFree();
var deJian = new DeJian();
var wanChao = new WanChao();
var list = [youShi, shuQi, starrySky, marvelFree, eggplantFree, sevenCatsFree, pandaBrain, tomato, tomatoFree, tomatoLite, redFruits, kuaiShouFree, speedFree, deJian, wanChao];
logger/* Record.info */.WV.info("加载配置");
var filteredList = list.filter(function (item) {
  return hamibot.env[item.constructor.name] !== false;
});
logger/* Record.info */.WV.info("\u6B63\u5728\u542F\u52A8...\n\n\t\u5F53\u524D\u811A\u672C\u7248\u672C: ".concat(VERSION, "\n"));
var _TOKEN = (_a = hamibot.env, _a._TOKEN),
    APP_ENV = _a.APP_ENV,
    ROBOT_ID = _a.ROBOT_ID;

if (APP_ENV === 'production') {
  logger/* Record.setDisplayLevel */.WV.setDisplayLevel(logger/* LogLevel.Log */["in"].Log);
} else if (APP_ENV === 'development') {
  logger/* Record.debug */.WV.debug("处于开发环境");
}

events.on("exit", function () {
  threads.shutDownAll();
  logger/* Record.info */.WV.info("结束...");
  (0,utils/* waitRandomTime */.DV)(5);
  console.hide();
});

if (_TOKEN && _TOKEN !== "" && (0,logger/* setToken */.o4)(_TOKEN) == false) {
  throw new exception/* ConfigInvalidException */.Hm("pushplus token", "needs to be a 32-bit hexadecimal number");
}

logger/* Record.info */.WV.info("开始执行脚本");

/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X5": () => (/* binding */ startDecorator),
/* harmony export */   "qd": () => (/* binding */ functionLog),
/* harmony export */   "rM": () => (/* binding */ measureExecutionTime)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(921);
/* harmony import */ var _scripts_abstract_Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(290);
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(564);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(437);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(844);





function functionLog(message) {
  return function (_, __, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .waitRandomTime */ .DV)(4);
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.info */ .WV.info("\u6267\u884C\u4E0B\u4E00\u6B65\u4EFB\u52A1\uFF1A".concat(message));
      originalMethod.apply(this, args);
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.info */ .WV.info("".concat(message, "\u4EFB\u52A1\u7ED3\u675F"));
    };

    return descriptor;
  };
}
function measureExecutionTime(_, key, descriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var startTime = new Date();
    originalMethod.apply(this, args);
    var endTime = new Date();
    var executionTime = (endTime.getTime() - startTime.getTime()) / 1000;
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("".concat(key, "\u6267\u884C\u4E86").concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .convertSecondsToMinutes */ .w1)(executionTime), "\u5206\u949F"));
    var instance = this;
    var time = (executionTime / _global__WEBPACK_IMPORTED_MODULE_0__/* .REDUNDANCY_TIME */ .lU + 1) * _global__WEBPACK_IMPORTED_MODULE_0__/* .REDUNDANCY_TIME */ .lU;

    if (key === "highEff") {
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("highEff\u65F6\u95F4\u8C03\u6574\u4E3A".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .convertSecondsToMinutes */ .w1)(time), "\u5206\u949F"));
      instance.highEffEstimatedTime = time;
      instance.store(_scripts_abstract_Base__WEBPACK_IMPORTED_MODULE_1__/* .BaseKey.highEffEstimatedTime */ .N.highEffEstimatedTime, time);
    } else if (key === "medEff") {
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("medEff\u65F6\u95F4\u8C03\u6574\u4E3A".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .convertSecondsToMinutes */ .w1)(time), "\u5206\u949F"));
      instance.medEffEstimatedTime = time;
      instance.store(_scripts_abstract_Base__WEBPACK_IMPORTED_MODULE_1__/* .BaseKey.medEffEstimatedTime */ .N.medEffEstimatedTime, time);
    }

    return executionTime;
  };

  return descriptor;
}
function startDecorator(_, __, descriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var retries = 0;

    while (retries < _global__WEBPACK_IMPORTED_MODULE_0__/* .MAX_RETRY_COUNTS */ .CJ) {
      var startTime = new Date();

      try {
        originalMethod.apply(this, args);
        var endTime = new Date();
        var executionTime = (endTime.getTime() - startTime.getTime()) / 1000;
        _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.info */ .WV.info("即将执行下一个app");
        _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("\u5269\u4F59".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .convertSecondsToMinutes */ .w1)(args[0] - executionTime), "\u5206\u949F"));
        return args[0] - executionTime;
      } catch (e) {
        if ((0,_exception__WEBPACK_IMPORTED_MODULE_2__/* .isCurrentAppBanned */ .KI)(e)) {
          _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.warn */ .WV.warn("账号异常");
        } else {
          retries++;
          _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.error */ .WV.error("\u5F53\u524Dapp\u53D1\u751F\u5F02\u5E38: ".concat(e));
          (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .sendErrorMessage */ .pl)();
          _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.info */ .WV.info("\u5C1D\u8BD5\u7B2C".concat(retries, "\u6B21\u91CD\u542F"));
          (0,_utils__WEBPACK_IMPORTED_MODULE_4__/* .clearBackground */ .xB)();
          var terminationTime = new Date();
          args[0] = args[0] - (terminationTime.getTime() - startTime.getTime()) / 1000;
        }
      }
    }
  };

  return descriptor;
}

/***/ }),

/***/ 564:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hm": () => (/* binding */ ConfigInvalidException),
/* harmony export */   "KI": () => (/* binding */ isCurrentAppBanned),
/* harmony export */   "R3": () => (/* binding */ ServiceNotEnabled),
/* harmony export */   "fx": () => (/* binding */ ExceedMaxNumberOfAttempts),
/* harmony export */   "rg": () => (/* binding */ PermissionException),
/* harmony export */   "su": () => (/* binding */ CurrentAppBanned)
/* harmony export */ });
/* unused harmony exports BaseException, isBaseException, isPermissionException, isServiceNotEnabled, ValueException, isValueException, WidgetNotFoundException, isWidgetNotFoundException, isConfigInvalidException */
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(437);
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


var ERROR_EVENTS = events.emitter();
ERROR_EVENTS.on("error", function errorListener(err) {
  _logger__WEBPACK_IMPORTED_MODULE_0__/* .Record.customLog */ .WV.customLog(_logger__WEBPACK_IMPORTED_MODULE_0__/* .LoggerSchemes.error */ .Vx.error, {
    needPrint: false,
    needRecord: true,
    skipCallerNumber: 2
  }, err.toString());
});

var BaseException = function (_super) {
  __extends(BaseException, _super);

  function BaseException(message) {
    var _this = _super.call(this) || this;

    _this.exceptionType = 'BaseException';
    _this.traceFilter = undefined;
    _this.traceFormatter = undefined;
    _this.message = message;
    var trace = (0,_logger__WEBPACK_IMPORTED_MODULE_0__/* .getStackTrace */ .DH)();

    if (_this.traceFilter) {
      trace = trace.filter(_this.traceFilter);
    }

    _this.traceBack = trace.toString(_this.traceFormatter);
    ERROR_EVENTS.emit("error", _this);
    return _this;
  }

  BaseException.prototype.toString = function () {
    return "Traceback (most recent call last):\n" + this.traceBack + "\n" + this.exceptionType + (this.message ? ": " + this.message : "") + "\n";
  };

  return BaseException;
}(Error);



function __isExceptionType(error, targetException) {
  var exceptionType = Object.getOwnPropertyDescriptor(error, "exceptionType");

  if (exceptionType === undefined) {
    return false;
  }

  return exceptionType.value === targetException;
}

function isBaseException(error) {
  return __isExceptionType(error, "BaseException");
}

var PermissionException = function (_super) {
  __extends(PermissionException, _super);

  function PermissionException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "PermissionException";
    return _this;
  }

  return PermissionException;
}(BaseException);


function isPermissionException(error) {
  return __isExceptionType(error, 'PermissionException');
}

var ServiceNotEnabled = function (_super) {
  __extends(ServiceNotEnabled, _super);

  function ServiceNotEnabled() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ServiceNotEnabled";
    return _this;
  }

  return ServiceNotEnabled;
}(BaseException);


function isServiceNotEnabled(error) {
  return __isExceptionType(error, 'ServiceNotEnabled');
}

var ValueException = function (_super) {
  __extends(ValueException, _super);

  function ValueException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ValueException";
    return _this;
  }

  return ValueException;
}(BaseException);


function isValueException(error) {
  return __isExceptionType(error, 'ValueException');
}

var ExceedMaxNumberOfAttempts = function (_super) {
  __extends(ExceedMaxNumberOfAttempts, _super);

  function ExceedMaxNumberOfAttempts() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "ExceedMaxNumberOfAttempts";
    return _this;
  }

  return ExceedMaxNumberOfAttempts;
}(BaseException);



var CurrentAppBanned = function (_super) {
  __extends(CurrentAppBanned, _super);

  function CurrentAppBanned() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "CurrentAppBanned";
    return _this;
  }

  return CurrentAppBanned;
}(BaseException);


function isCurrentAppBanned(error) {
  return __isExceptionType(error, 'CurrentAppBanned');
}

var WidgetNotFoundException = function (_super) {
  __extends(WidgetNotFoundException, _super);

  function WidgetNotFoundException() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.exceptionType = "WidgetNotFoundException";
    return _this;
  }

  return WidgetNotFoundException;
}(BaseException);


function isWidgetNotFoundException(error) {
  return __isExceptionType(error, 'WidgetNotFoundException');
}

var ConfigInvalidException = function (_super) {
  __extends(ConfigInvalidException, _super);

  function ConfigInvalidException(fieldName, helpInfo) {
    var _this = _super.call(this, "The '".concat(fieldName, "' field in the configuration is invalid").concat(", " + helpInfo, ". ") + "please check it again !") || this;

    _this.exceptionType = "ConfigInvalidException";
    return _this;
  }

  return ConfigInvalidException;
}(ValueException);


function isConfigInvalidException(error) {
  return __isExceptionType(error, 'ConfigInvalidException');
}

/***/ }),

/***/ 437:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DH": () => (/* binding */ getStackTrace),
/* harmony export */   "FX": () => (/* binding */ LOG_STACK),
/* harmony export */   "Vx": () => (/* binding */ LoggerSchemes),
/* harmony export */   "WV": () => (/* binding */ Record),
/* harmony export */   "in": () => (/* binding */ LogLevel),
/* harmony export */   "o4": () => (/* binding */ setToken)
/* harmony export */ });
/* unused harmony exports getCallerName, getRawStackTrace, sendMessage, sendLog */
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var FrameCollection = function () {
  function FrameCollection() {
    var frames = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      frames[_i] = arguments[_i];
    }

    this.frames = frames;
  }

  FrameCollection.prototype.clear = function () {
    this.frames.length = 0;
  };

  FrameCollection.prototype.push = function (frame) {
    this.frames.push(frame);
  };

  return FrameCollection;
}();

var TraceCollection = function (_super) {
  __extends(TraceCollection, _super);

  function TraceCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TraceCollection.prototype.filter = function (callbackFn) {
    var result = new TraceCollection();
    var tempFrame;

    for (var i = 0; i < this.frames.length; i++) {
      tempFrame = this.frames[i];

      if (callbackFn(tempFrame, i, this.frames)) {
        result.push(tempFrame);
      }
    }

    return result;
  };

  TraceCollection.prototype.toStringArray = function (format) {
    var trace = [];

    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
      var frame = _a[_i];
      trace.push(frame.toString(format));
    }

    return trace;
  };

  TraceCollection.prototype.toString = function (format) {
    var trace = [];

    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
      var frame = _a[_i];
      trace.push(frame.toString(format));
    }

    return trace.join("\n");
  };

  return TraceCollection;
}(FrameCollection);

var LogCollection = function (_super) {
  __extends(LogCollection, _super);

  function LogCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LogCollection.prototype.filter = function (callbackFn) {
    var result = new LogCollection();
    var tempFrame;

    for (var i = 0; i < this.frames.length; i++) {
      tempFrame = this.frames[i];

      if (callbackFn(tempFrame, i, this.frames)) {
        result.push(tempFrame);
      }
    }

    return result;
  };

  LogCollection.prototype.toHtmlString = function () {
    var stack = ["<div style=\"\n                font-size: 15px;\n                font-family: monospace;\n                word-wrap:break-word;\n            \">"];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toHtmlString());
    }

    stack.push('</div>');
    return stack.join('\n');
  };

  LogCollection.prototype.toStringArray = function () {
    var stack = [];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toString());
    }

    return stack;
  };

  LogCollection.prototype.toString = function () {
    var stack = [];

    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toString());
    }

    return stack.join('\n');
  };

  return LogCollection;
}(FrameCollection);

var TraceStackFrame = function () {
  function TraceStackFrame(line, callerName) {
    this.line = line;
    this.callerName = callerName;
  }

  TraceStackFrame.prototype.getLine = function () {
    return this.line;
  };

  TraceStackFrame.prototype.getCallerName = function () {
    return this.callerName;
  };

  TraceStackFrame.prototype.setCallerName = function (callerName) {
    this.callerName = callerName;
  };

  TraceStackFrame.prototype.toString = function (format) {
    return (format !== null && format !== void 0 ? format : defaultFormatter)(this.line, this.callerName);
  };

  return TraceStackFrame;
}();

var LogStackFrame = function () {
  function LogStackFrame(data, scheme) {
    this.data = data;
    this.scheme = scheme !== null && scheme !== void 0 ? scheme : LoggerSchemes.log;
  }

  LogStackFrame.prototype.getLevel = function () {
    return this.scheme.level;
  };

  LogStackFrame.prototype.getData = function () {
    return this.data;
  };

  LogStackFrame.prototype.toString = function () {
    return this.data;
  };

  LogStackFrame.prototype.toHtmlString = function () {
    var htmlArray = [];
    var startTag = "<span style='color: ".concat(this.scheme.color, ";'>");
    var endTag = "</span></br>";

    for (var _i = 0, _a = this.data.split('\n'); _i < _a.length; _i++) {
      var line = _a[_i];
      line = line.replace(/[<>&"'`\/]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          '\'': '&#39;',
          '`': '&#96',
          '\/': '&#x2F'
        }[c];
      });
      htmlArray.push([startTag, line, endTag].join(''));
    }

    return htmlArray.join('\n');
  };

  return LogStackFrame;
}();

var LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["Debug"] = 0] = "Debug";
  LogLevel[LogLevel["Log"] = 1] = "Log";
  LogLevel[LogLevel["Info"] = 2] = "Info";
  LogLevel[LogLevel["Warn"] = 3] = "Warn";
  LogLevel[LogLevel["Error"] = 4] = "Error";
})(LogLevel || (LogLevel = {}));

var LoggerSchemes = function () {
  function LoggerSchemes() {}

  LoggerSchemes.trace = {
    'displayName': 'TRACE',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.debug = {
    'displayName': 'DEBUG',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.log = {
    'displayName': ' LOG ',
    'logFunction': console.log,
    'color': 'black',
    'level': LogLevel.Log
  };
  LoggerSchemes.info = {
    'displayName': 'INFO',
    'logFunction': console.info,
    'color': 'green',
    'level': LogLevel.Info
  };
  LoggerSchemes.warn = {
    'displayName': 'WARN',
    'logFunction': console.warn,
    'color': 'yellow',
    'level': LogLevel.Warn
  };
  LoggerSchemes.error = {
    'displayName': 'ERROR',
    'logFunction': console.error,
    'color': 'red',
    'level': LogLevel.Error
  };
  return LoggerSchemes;
}();


var LOG_STACK = new LogCollection();
var _token = null;
function getCallerName(index) {
  if (index === void 0) {
    index = 0;
  }

  var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
  var stackFrames = parseTrace(trace);
  if (index < 0) index = 0;
  if (index > stackFrames.length - 1) index = stackFrames.length - 1;
  return stackFrames[index].getCallerName();
}
function getRawStackTrace(endFunction) {
  var stackTrace = {
    stack: ''
  };
  Error.captureStackTrace(stackTrace, endFunction);
  return sliceStackFrames(stackTrace.stack, 1, -2);
}
function getStackTrace(endFunction) {
  var trace = sliceStackFrames(getRawStackTrace(endFunction), 1, 0);
  return new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
}
var DEFAULT_LOG_RECORD_CONFIG = {
  needPrint: true,
  needRecord: true,
  skipCallerNumber: 1
};

var Record = function () {
  function Record() {}

  Record.setRecordLevel = function (level) {
    Record.RECORD_LEVEL = level;
  };

  Record.setDisplayLevel = function (level) {
    Record.DISPLAY_LEVEL = level;
  };

  Record.log = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.log, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.verbose = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.debug, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.info = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.info, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.warn = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.warn, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.error = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return Record.recLog(LoggerSchemes.error, DEFAULT_LOG_RECORD_CONFIG, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.trace = function (message) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    var parsedTrace = new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
    message = util.format.apply(util, __spreadArray([message], args, false));
    return Record.recLog(LoggerSchemes.trace, DEFAULT_LOG_RECORD_CONFIG, "".concat(message, "\n").concat(parsedTrace.toString()));
  };

  Record.traceWithCustomFormatter = function (formatter, message) {
    var args = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }

    var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    var parsedTrace = new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
    message = util.format.apply(util, __spreadArray([message], args, false));
    return Record.recLog(LoggerSchemes.trace, DEFAULT_LOG_RECORD_CONFIG, "".concat(message, "\n").concat(parsedTrace.toString(formatter)));
  };

  Record.customLog = function (scheme, config, message) {
    var args = [];

    for (var _i = 3; _i < arguments.length; _i++) {
      args[_i - 3] = arguments[_i];
    }

    return Record.recLog(scheme, config, util.format.apply(util, __spreadArray([message], args, false)));
  };

  Record.recLog = function (scheme, config, logMessage) {
    var _a, _b, _c, _d;

    var detailMessage = "[".concat(scheme.displayName, "] [").concat(getCallerName(config.skipCallerNumber), "]: ").concat(logMessage);
    var showMessage = "".concat(logMessage);
    var needRecord = (_b = (_a = config.needRecord) !== null && _a !== void 0 ? _a : scheme.needRecord) !== null && _b !== void 0 ? _b : true;

    if (needRecord && scheme.level >= Record.RECORD_LEVEL) {
      LOG_STACK.push(new LogStackFrame(detailMessage, scheme));
    }

    var needPrint = (_d = (_c = config.needPrint) !== null && _c !== void 0 ? _c : scheme.needPrint) !== null && _d !== void 0 ? _d : true;

    if (needPrint && scheme.level >= Record.DISPLAY_LEVEL) {
      scheme.logFunction(showMessage);
    }

    return detailMessage;
  };

  Record.RECORD_LEVEL = LogLevel.Debug;
  Record.DISPLAY_LEVEL = LogLevel.Debug;
  Record.debug = Record.verbose;
  return Record;
}();


function setToken(token) {
  if (token.length !== 32 || /^\d*$/.test(token)) {
    return false;
  }

  _token = token;
  return true;
}
function sendMessage(title, data) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  data = util.format.apply(util, __spreadArray([data], args, false));
  return sendToRemote(title, data);
}
function sendLog(logs, title, clear) {
  logs = logs !== null && logs !== void 0 ? logs : LOG_STACK;
  title = title !== null && title !== void 0 ? title : 'logger';
  clear = clear !== null && clear !== void 0 ? clear : true;
  var isSend = sendToRemote(title, logs.toHtmlString());

  if (isSend && clear) {
    logs.clear();
  }

  return isSend;
}

function sliceStackFrames(stackTrace, start, end) {
  if (start === void 0) {
    start = 0;
  }

  if (end === void 0) {
    end = 0;
  }

  if (stackTrace === '') return '';
  var temp = stackTrace.split('\n');
  if (end <= 0) end = temp.length + end;

  if (start < 0) {
    start = 0;
  } else if (start > temp.length - 1) {
    start = temp.length - 1;
  }

  if (end > temp.length) {
    end = temp.length;
  } else if (end <= start) {
    return '';
  }

  temp = temp.slice(start, end);
  return temp.join('\n');
}

function parseTrace(originTrace) {
  var _a;

  var stack = [];
  var originStack = originTrace.split('\n');

  for (var _i = 0, originStack_1 = originStack; _i < originStack_1.length; _i++) {
    var item = originStack_1[_i];
    var result = /\:(\d+)(?: \((.*)\))?/.exec(item);
    stack.push(new TraceStackFrame(Number(result[1]) - 3, (_a = result[2]) !== null && _a !== void 0 ? _a : 'Anonymous functions'));
  }

  stack[stack.length - 1].setCallerName("Outer");
  return stack;
}

function sendToRemote(title, message) {
  if (_token === null) {
    return false;
  }

  var res = http.post("http://www.pushplus.plus/send", {
    title: title,
    token: _token,
    content: message,
    template: 'html'
  });
  return res.statusCode === 200;
}

function defaultFormatter(line, callerName) {
  return "  | at line ".concat(line, ", in <").concat(callerName, ">");
}

/***/ }),

/***/ 844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$v": () => (/* binding */ isGrayColor),
/* harmony export */   "B": () => (/* binding */ getStrByOcrRecognizeLimitBounds),
/* harmony export */   "DV": () => (/* binding */ waitRandomTime),
/* harmony export */   "Ef": () => (/* binding */ randomClickChildInList),
/* harmony export */   "MN": () => (/* binding */ matchAndJudge),
/* harmony export */   "Od": () => (/* binding */ findAndClick),
/* harmony export */   "PI": () => (/* binding */ doFuncUntilPopupsGone),
/* harmony export */   "TS": () => (/* binding */ merge),
/* harmony export */   "Uw": () => (/* binding */ normalClick),
/* harmony export */   "X5": () => (/* binding */ scrollTo),
/* harmony export */   "bB": () => (/* binding */ closeByImageMatching),
/* harmony export */   "d$": () => (/* binding */ doFuncAtGivenTime),
/* harmony export */   "ov": () => (/* binding */ resizeY),
/* harmony export */   "pl": () => (/* binding */ sendErrorMessage),
/* harmony export */   "q1": () => (/* binding */ clickUntilGone),
/* harmony export */   "vi": () => (/* binding */ moveDown),
/* harmony export */   "vn": () => (/* binding */ randomClick),
/* harmony export */   "w1": () => (/* binding */ convertSecondsToMinutes),
/* harmony export */   "wK": () => (/* binding */ resizeX),
/* harmony export */   "xB": () => (/* binding */ clearBackground),
/* harmony export */   "xv": () => (/* binding */ close)
/* harmony export */ });
/* unused harmony exports sendIncomeMessageToWxPuher, toShowString, judgeFuncIsWorkByImg */
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(921);
/* harmony import */ var _scripts_abstract_Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(290);
/* harmony import */ var _exception__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(564);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(437);




function resizeX(x) {
  return x * device.width / _global__WEBPACK_IMPORTED_MODULE_0__/* .DEVICE_WIDTH */ .Ev;
}
function resizeY(y) {
  return y * device.height / _global__WEBPACK_IMPORTED_MODULE_0__/* .DEVICE_HEIGHT */ .ow;
}
function normalClick(x, y, options) {
  var time = (options === null || options === void 0 ? void 0 : options.waitTimes) || _global__WEBPACK_IMPORTED_MODULE_0__/* .WAIT_TIME_AFTER_CLICK */ .cB;
  console.hide();
  sleep(100);
  click(x, y);
  console.show();

  if (options === null || options === void 0 ? void 0 : options.errorMsg) {
    waitRandomTime(1);
    var str = getStrByOcrRecognizeLimitBounds();
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("".concat(str));
    var match = str.match(options.errorMsg);

    if (match) {
      throw new _exception__WEBPACK_IMPORTED_MODULE_2__/* .CurrentAppBanned */ .su("");
    }
  }

  waitRandomTime(time);
}
function randomClick(component, options) {
  var left = component.bounds().left;
  var right = component.bounds().right;
  var top = component.bounds().top;
  var bottom = component.bounds().bottom;

  if (component.text() !== "") {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.log */ .WV.log(component.text());
  }

  var randomX = random(left, right);
  var randomY = random(top, bottom);

  if (options === null || options === void 0 ? void 0 : options.avoid) {
    while (randomX > options.avoid.bounds().left && randomX < options.avoid.bounds().right && randomY > options.avoid.bounds().top && randomY < options.avoid.bounds().bottom) {
      randomX = random(component.bounds().left, component.bounds().right);
      randomY = random(component.bounds().top, component.bounds().bottom);
    }
  }

  if (options === null || options === void 0 ? void 0 : options.check) {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("check click");

    while (!judgeFuncIsWorkByImg(function () {
      normalClick(randomX, randomY, options.normalClickOptions);
    }, left, top, right, bottom)) {
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("continue");
      close(0);
    }
  } else {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("normal click");
    normalClick(randomX, randomY, options === null || options === void 0 ? void 0 : options.normalClickOptions);
  }
}
function findAndClick(component, options) {
  var tmp = component;

  if (options === null || options === void 0 ? void 0 : options.searchByLeftRangeOption) {
    tmp = searchByLeftRange(component, options === null || options === void 0 ? void 0 : options.searchByLeftRangeOption);
  }

  if (tmp.exists()) {
    var obj = scrollTo(component, options);

    if (obj != null) {
      randomClick(obj, options);
    }

    return true;
  } else {
    return false;
  }
}
function scrollTo(sign, options, prePy, times) {
  var _a, _b;

  var top = ((_a = options === null || options === void 0 ? void 0 : options.bounds) === null || _a === void 0 ? void 0 : _a.top) || 0;
  var bottom = ((_b = options === null || options === void 0 ? void 0 : options.bounds) === null || _b === void 0 ? void 0 : _b.bottom) || device.height;

  if (times && times >= 3) {
    throw new _exception__WEBPACK_IMPORTED_MODULE_2__/* .ExceedMaxNumberOfAttempts */ .fx("scrollTo");
  }

  var nSign = sign;

  if (options === null || options === void 0 ? void 0 : options.searchByLeftRangeOption) {
    nSign = searchByLeftRange(sign, options.searchByLeftRangeOption);
  }

  var tmp = nSign.findOnce();

  if (tmp != null) {
    var pointY = tmp.bounds().centerY();

    if (prePy) {
      if (pointY == prePy) {
        close(0);

        if (times) {
          times++;
        } else {
          times = 1;
        }
      }
    }

    if (pointY < top) {
      if (pointY < top - bottom * 0.5) {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
      } else {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1350, 1450))], [resizeX(random(780, 820)), resizeY(random(1750, 1850))]);
      }

      waitRandomTime(2);
      return scrollTo(sign, options, pointY, times);
    } else if (pointY > bottom) {
      if (pointY > bottom * 1.5) {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
      } else {
        gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(1350, 1450))]);
      }

      waitRandomTime(2);
      return scrollTo(sign, options, pointY, times);
    } else {
      waitRandomTime(2);
      return tmp;
    }
  }
}

function searchByLeftRange(button, range, times) {
  if (times && times > 3) {
    throw new _exception__WEBPACK_IMPORTED_MODULE_2__/* .ExceedMaxNumberOfAttempts */ .fx("searchInRange");
  } else {
    times = 1;
  }

  var tmp = range.findOnce();

  if (tmp == null) {
    close(0);
    return searchByLeftRange(button, range, ++times);
  } else {
    var result = eval(button.toString());
    return result.boundsInside(0, tmp.bounds().top - 60, resizeX(1080), tmp.bounds().bottom + 60);
  }
}

function clickUntilGone(component, options) {
  var button = component.findOnce();

  if (button) {
    untilGone(component, 0, options);
    return true;
  } else {
    return false;
  }
}

function untilGone(component, times, options) {
  if (times >= _global__WEBPACK_IMPORTED_MODULE_0__/* .MAX_CLICK_COUNTS */ .u2) {
    throw new _exception__WEBPACK_IMPORTED_MODULE_2__/* .ExceedMaxNumberOfAttempts */ .fx("untilGone");
  }

  var button = component.findOnce();

  if (button) {
    randomClick(button, options);
    untilGone(component, ++times, options);
  }
}

function waitRandomTime(waitTime) {
  var time = waitTime + random(-waitTime * 0.2, waitTime * 0.2);
  sleep(time * 1000);
  return time;
}
function clearBackground() {
  if (home()) {
    waitRandomTime(4);

    if (recents()) {
      waitRandomTime(4);

      if (findAndClick(idContains("clearbox"))) {
        waitRandomTime(4);
      }
    }
  }
}
function moveDown(totalTime, interval) {
  _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.log */ .WV.log("\u51C6\u5907\u5237\u89C6\u9891".concat(convertSecondsToMinutes(totalTime), "\u5206\u949F"));
  var watchTime = 0;

  while (totalTime > watchTime) {
    gesture(200, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], [resizeX(random(780, 820)), resizeY(random(250, 350))]);
    watchTime += waitRandomTime(interval);
  }
}
function doFuncUntilPopupsGone(buttonNameList, options) {
  var regex = merge(buttonNameList);
  var cycleCounts = 0;

  while (++cycleCounts < _global__WEBPACK_IMPORTED_MODULE_0__/* .MAX_CYCLES_COUNTS */ .CD && (clickUntilGone(textMatches(regex), options) || clickUntilGone(descMatches(regex), options))) {
    if (options === null || options === void 0 ? void 0 : options.func) {
      options.func();
    }
  }
}
function merge(buttonNameList) {
  return new RegExp(buttonNameList.join('|'));
}
function convertSecondsToMinutes(seconds) {
  var minutes = Math.floor(seconds / 60);
  return minutes;
}
function randomClickChildInList(component, index, avoid) {
  var list = component.boundsInside(0, 0, device.width, device.height).findOnce();

  if (list != null) {
    var child = list.child(index);

    if (child != null) {
      randomClick(child, {
        avoid: avoid
      });
    }
  }
}
function close(times) {
  times = times % 3;

  switch (times) {
    case 0:
      if (!closeByImageMatching()) {
        back();
        waitRandomTime(4);
      }

      break;

    case 1:
      if (!findAndClick(className("android.widget.ImageView").boundsInside(resizeX(945), 0, resizeX(_global__WEBPACK_IMPORTED_MODULE_0__/* .DEVICE_WIDTH */ .Ev), resizeY(309)))) {
        back();
        waitRandomTime(4);
      }

      break;

    case 2:
      if (!findAndClick(className("android.widget.ImageView").boundsInside(0, 0, resizeX(132), resizeY(273)))) {
        back();
        waitRandomTime(4);
      }

      break;
  }

  findAndClick(text("跳过"));
  doFuncUntilPopupsGone(['继续观看', '关闭', '抓住奖励机会', '(以后|下次)再说', '留下看看', '放弃奖励']);
}
function isGrayColor(red, green, blue) {
  if (red + green + blue > 200 && red + green + blue < 500) {
    return Math.sqrt((Math.pow(red - green, 2) + Math.pow(red - blue, 2) + Math.pow(green - blue, 2)) / 3);
  } else {
    return 100;
  }
}
function closeByImageMatching() {
  console.hide();
  sleep(100);
  var img = captureScreen();
  console.show();
  var threshold = 0.7;
  var close = images.read('/sdcard/exit-white.jpg');

  if (img != null && close != null) {
    img = images.cvtColor(img, "BGR2GRAY");
    var closeWhite = images.cvtColor(close, "BGR2GRAY");
    var closeBlack = images.threshold(closeWhite, 100, 255, "BINARY_INV");

    for (var i = 80; i < 255; i += 50) {
      var nimg = images.threshold(img, i, 255, "BINARY");
      var p1 = findImage(nimg, closeWhite, {
        threshold: threshold
      });
      var p2 = findImage(nimg, closeBlack, {
        threshold: threshold
      });

      if (p1 || p2) {
        if (p1) {
          normalClick(p1.x, p1.y);
        } else if (p2) {
          normalClick(p2.x, p2.y);
        }

        waitRandomTime(4);
        return true;
      }
    }
  }

  return false;
}
function doFuncAtGivenTime(totalTime, maxTime, func) {
  while (totalTime >= 0) {
    var startTime = new Date();
    var timeParameter = Math.min(maxTime, totalTime);
    func(timeParameter);
    var endTime = new Date();
    totalTime -= (endTime.getTime() - startTime.getTime()) / 1000;
  }
}
function getStrByOcrRecognizeLimitBounds(options) {
  var top = (options === null || options === void 0 ? void 0 : options.top) || 0;
  var bottom = (options === null || options === void 0 ? void 0 : options.bottom) || device.height;
  console.hide();
  sleep(100);
  var img = captureScreen();
  console.show();
  img = images.clip(img, 0, top, device.width, bottom);
  return ocr.recognizeText(img);
}
function matchAndJudge(str) {
  var time = str.match(/[0-9]+[s秒]?/);
  var swipe = str.match(/(滑动)?浏览/);

  if (time) {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug(time[0]);
    var totalTime = parseInt(time[0]);

    if (totalTime > 50 || totalTime < 3) {
      totalTime = 3;
    }

    if (swipe) {
      moveDown(totalTime, 4);
    } else {
      _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("\u7B49\u5F85".concat(totalTime, "\u79D2"));
      sleep(totalTime * 1000);
      waitRandomTime(10);
    }
  }
}
function sendIncomeMessageToWxPuher(str) {
  if (_global__WEBPACK_IMPORTED_MODULE_0__/* ._TOKEN */ .g$ && _global__WEBPACK_IMPORTED_MODULE_0__/* ._TOKEN */ .g$ !== "") {
    var res = http.postJson(_global__WEBPACK_IMPORTED_MODULE_0__/* .WX_PUSHER_URL */ .b1, {
      "appToken": _global__WEBPACK_IMPORTED_MODULE_0__/* .APP_TOKEN */ .Sq,
      "content": str,
      "summary": "智能助手日收益推送",
      "contentType": 3,
      "uids": [_global__WEBPACK_IMPORTED_MODULE_0__/* ._TOKEN */ .g$],
      "verifyPay": false
    });
    return res.statusCode === 200;
  }
}
function toShowString(list) {
  var stack = ["id: ".concat(_global__WEBPACK_IMPORTED_MODULE_0__/* .ROBOT_ID */ .mr, "\n")];
  var sum = 0;

  for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var app_1 = list_1[_i];
    var weight = app_1.fetch(_scripts_abstract_Base__WEBPACK_IMPORTED_MODULE_1__/* .BaseKey.Weight */ .N.Weight, 0);
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("".concat(app_1.appName, ": ").concat(weight));
    sum += weight;
    stack.push("".concat(app_1.appName, ": ").concat(weight));
  }

  stack.push("\n\u4ECA\u65E5\u603B\u6536\u76CA: ".concat(sum, "\u91D1\u5E01"));
  return stack.join('\n');
}
function sendErrorMessage() {
  var collection = _logger__WEBPACK_IMPORTED_MODULE_3__/* .LOG_STACK.filter */ .FX.filter(function (frame) {
    return frame.getLevel() >= _logger__WEBPACK_IMPORTED_MODULE_3__/* .LogLevel.Info */ ["in"].Info;
  });
  var img = captureScreen();
  hamibot.postMessage(Date.now().toString(), {
    telemetry: true,
    data: {
      title: 'error',
      attachments: [{
        type: 'text',
        data: collection.toString()
      }, {
        type: 'image',
        data: images.toBase64(img)
      }]
    }
  });
}
function judgeFuncIsWorkByImg(func, left, top, right, bottom) {
  console.hide();
  sleep(100);
  var before = captureScreen();
  before = images.clip(before, left, top, right - left, bottom - top);
  console.show();
  func();
  console.hide();
  sleep(100);
  var after = captureScreen();
  after = images.clip(after, left, top, right - left, bottom - top);
  console.show();
  var compare = findImage(before, after, {
    threshold: 1
  });

  if (compare) {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("图片一致");
    return false;
  } else {
    _logger__WEBPACK_IMPORTED_MODULE_3__/* .Record.debug */ .WV.debug("图片不一致");
    return true;
  }
}

/***/ }),

/***/ 290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ BaseKey),
/* harmony export */   "X": () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(921);
/* harmony import */ var _lib_decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(537);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(844);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(437);
/* harmony import */ var _lib_exception__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(564);


var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var Base = function () {
  function Base() {
    this.appName = "";
    this.packageName = "";
    this.tab = text("");
    this.depth = 0;
    this.preComponent = text("");
    this.preNum = -1;
    this.exitNum = 1;
    this.backTimes = 1;
    this.highEffEstimatedTime = _global__WEBPACK_IMPORTED_MODULE_1__/* .BASE_ASSIMT_TIME */ .IS;
    this.medEffEstimatedTime = _global__WEBPACK_IMPORTED_MODULE_1__/* .MAX_ASSIMT_TIME */ .KD;
    this.lowEffEstimatedTime = _global__WEBPACK_IMPORTED_MODULE_1__/* .MAX_ASSIMT_TIME */ .KD;
    this.lowEffAssmitCount = 1;
    this.verify = true;
  }

  Base.prototype.medEff = function () {};

  Base.prototype.lowEff = function (time) {
    time;
  };

  Base.prototype.start = function (time) {
    _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.info */ .WV.info("".concat(this.appName, "\u9884\u8BA1\u6267\u884C").concat((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .convertSecondsToMinutes */ .w1)(time), "\u5206\u949F"));

    if (this.lauchApp()) {
      var flag = false;

      if (time >= this.highEffEstimatedTime) {
        var processTime = this.highEff();
        time -= processTime;
        flag = true;
      }

      if (time >= this.medEffEstimatedTime) {
        var processTime = this.medEff();
        time -= processTime;
      }

      if (time >= this.lowEffEstimatedTime) {
        var processTime = this.lowEff(time);
        time -= processTime;
      }

      if (flag) {
        _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.info */ .WV.info("统计当前app金币");
        this.weight();
      }
    }
  };

  Base.prototype.lauchApp = function () {
    _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.log */ .WV.log("\u5C1D\u8BD5\u542F\u52A8".concat(this.appName));
    var isLauchApp = launchPackage(this.packageName);

    if (isLauchApp) {
      _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.log */ .WV.log("".concat(this.appName, "\u5DF2\u542F\u52A8"));
      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(15);
    } else {
      _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.log */ .WV.log("".concat(this.appName, "\u5E94\u7528\u672A\u5B89\u88C5"));
    }

    return isLauchApp;
  };

  Base.prototype.read = function (totalTime) {
    _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.log */ .WV.log("\u51C6\u5907\u770B\u4E66".concat((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .convertSecondsToMinutes */ .w1)(totalTime), "\u5206\u949F"));
    var readTime = 0;

    if (text("简介").exists()) {
      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .normalClick */ .Uw)((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .resizeX */ .wK)(1070), (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .resizeY */ .ov)(2330));
    }

    while (totalTime > readTime) {
      readTime += (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(10);

      if (this.verify) {
        try {
          this.backUntilFind(textMatches((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .merge */ .TS)(["菜单", ".*[0-9]*[金]?币"])));
        } catch (error) {
          _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.warn */ .WV.warn("阅读异常, 正在重试");
          (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .clearBackground */ .xB)();

          if (this.lauchApp()) {
            this.readBook(totalTime - readTime);
          }

          return;
        }
      } else {
        var waitSign = ['.*后可领奖励', '.*后可领取奖励', '.*后领取观看奖励'];

        if (textMatches((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .merge */ .TS)(waitSign)).exists()) {}
      }

      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .findAndClick */ .Od)(textMatches((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .merge */ .TS)([".*不再提示", "我知道了", "放弃下载"])));
      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .normalClick */ .Uw)((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .resizeX */ .wK)(random(1070, 1080)), (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .resizeY */ .ov)(random(1900, 2000)));
    }

    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(5);
    back();
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(5);
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .doFuncUntilPopupsGone */ .PI)(["直接退出", "退出阅读", "暂不加入", "下次再说", "取消", "暂不添加"]);
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(5);
  };

  Base.prototype.watch = function (exitSign, times) {
    if (times == undefined) {
      times = this.exitNum;
    } else {
      times++;
    }

    if (exitSign.exists()) {
      if (times != this.exitNum) {
        this.exitNum = --times % 3;
      }

      return;
    }

    if (times > 5) {
      throw new _lib_exception__WEBPACK_IMPORTED_MODULE_5__/* .ExceedMaxNumberOfAttempts */ .fx("watch");
    }

    if (currentPackage() !== this.packageName) {
      this.lauchApp();
    }

    var tmp = textMatches(".*[0-9]+[ ]?[s秒]?.*").findOnce();

    if (tmp != null) {
      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .matchAndJudge */ .MN)(tmp.text());
    } else {
      var str = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .getStrByOcrRecognizeLimitBounds */ .B)({
        bottom: device.height * 1 / 3
      });
      (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .matchAndJudge */ .MN)(str.replace(/\d+:\d+/, "x"));
    }

    if (text("该视频所提到的内容是").exists()) {
      back();
      this.watch(exitSign, times);
      return;
    }

    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .close */ .xv)(times);

    if ((0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .findAndClick */ .Od)(text("领取奖励"))) {
      times = undefined;
    }

    this.watch(exitSign, times);
  };

  Base.prototype.goTo = function (component, num) {
    if (component.exists() && this.preComponent.toString() == component.toString() && this.preNum == num) {
      return;
    }

    var tmp = this.backUntilFind(component);

    for (var i = 0; i < this.depth; i++) {
      var child = tmp.child(0);

      if (child != null) {
        tmp = child;
      }
    }

    if (tmp != null) {
      if (num !== -1) {
        tmp = tmp.child(num);
      }

      if (this.preComponent.toString() == component.toString() && this.preNum == num) {
        (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .randomClick */ .vn)(tmp);
      } else {
        (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .randomClick */ .vn)(tmp, {
          check: true
        });
      }
    }

    this.preComponent = component;
    this.preNum = num;
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(4);
  };

  Base.prototype.backUntilFind = function (component, times) {
    if (times == undefined) times = 0;

    if (times >= _global__WEBPACK_IMPORTED_MODULE_1__/* .MAX_BACK_COUNTS */ .Y2) {
      throw new _lib_exception__WEBPACK_IMPORTED_MODULE_5__/* .ExceedMaxNumberOfAttempts */ .fx("backUntilFind");
    }

    var tmp = component.findOnce();

    if (tmp == null) {
      if (times >= _global__WEBPACK_IMPORTED_MODULE_1__/* .MAX_BACK_COUNTS */ .Y2 - 2) {
        _lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .Record.warn */ .WV.warn("尝试矫正");
        (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .close */ .xv)(0);
      } else {
        back();
        (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__/* .waitRandomTime */ .DV)(4);
      }

      if (currentPackage() !== this.packageName) {
        this.lauchApp();
      }

      return this.backUntilFind(component, ++times);
    } else {
      return tmp;
    }
  };

  Base.prototype.store = function (key, value) {
    var object = _global__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE.get */ .P_.get(this.constructor.name, {});
    object[key] = value;
    _global__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE.put */ .P_.put(this.constructor.name, object);
  };

  Base.prototype.fetch = function (key, defaultValue) {
    var object = _global__WEBPACK_IMPORTED_MODULE_1__/* .STORAGE.get */ .P_.get(this.constructor.name, {});

    if (defaultValue != undefined && (object === undefined || object[key] === undefined)) {
      return defaultValue;
    }

    return object[key];
  };

  Base.prototype.signIn = function () {};

  Base.prototype.openTreasure = function () {};

  Base.prototype.watchAds = function () {};

  Base.prototype.mealSupp = function () {};

  Base.prototype.readBook = function (totalTime) {
    totalTime;
  };

  Base.prototype.swipeVideo = function (totalTime) {
    totalTime;
  };

  Base.prototype.listenBook = function () {};

  Base.prototype.reward = function () {};

  Base.prototype.clickPop = function () {};

  Base.prototype.record = function () {};

  __decorate([_lib_decorators__WEBPACK_IMPORTED_MODULE_2__/* .startDecorator */ .X5], Base.prototype, "start", null);

  return Base;
}();


var BaseKey;

(function (BaseKey) {
  BaseKey[BaseKey["Weight"] = 0] = "Weight";
  BaseKey[BaseKey["highEffEstimatedTime"] = 1] = "highEffEstimatedTime";
  BaseKey[BaseKey["medEffEstimatedTime"] = 2] = "medEffEstimatedTime";
  BaseKey[BaseKey["lowEffEstimatedTime"] = 3] = "lowEffEstimatedTime";
})(BaseKey || (BaseKey = {}));

/***/ }),

/***/ 2:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./src/global.ts + 20 modules
var global = __webpack_require__(921);
// EXTERNAL MODULE: ./src/lib/utils.ts
var utils = __webpack_require__(844);
// EXTERNAL MODULE: ./src/lib/logger.ts
var logger = __webpack_require__(437);
// EXTERNAL MODULE: ./src/lib/exception.ts
var exception = __webpack_require__(564);
;// CONCATENATED MODULE: ./src/lib/init.ts



function init() {
  if (auto.service === null) {
    if (!confirm('Please enable accessibility permission')) {
      throw new exception/* PermissionException */.rg("Accessibility permission obtaining failure.");
    }

    auto.waitFor();
  } else {
    logger/* Record.verbose */.WV.verbose("已启用无障碍辅助功能权限");
  }

  if (device.height === 0 || device.width === 0) {
    throw new exception/* ServiceNotEnabled */.R3('Failed to get the screen size. ' + 'Please try restarting the service or re-installing Hamibot');
  } else {
    logger/* Record.debug */.WV.debug("分辨率: " + device.height + " x " + device.width);
  }

  if (!requestScreenCapture()) {
    throw new exception/* PermissionException */.rg("Accessibility permission obtaining failure.");
  } else {
    logger/* Record.debug */.WV.debug("启动视觉识别");
  }

  if (!files.exists("/sdcard/exit-white.jpg")) {
    logger/* Record.debug */.WV.debug("正在加载资源");
    var img = images.load("https://hamibot-1304500632.cos.ap-nanjing.myqcloud.com/exit-white.jpg");

    if (img != null) {
      img.saveTo("/sdcard/exit-white.jpg");
    }
  }

  device.keepScreenOn(3600 * 1000);
  console.show();
  (0,utils/* waitRandomTime */.DV)(1);
}
// EXTERNAL MODULE: ./src/scripts/abstract/Base.ts
var Base = __webpack_require__(290);
;// CONCATENATED MODULE: ./src/index.ts






init();
test();

function test() {
  global/* STORAGE.put */.P_.put("app", "DeJian");
}

function main() {
  while (true) {
    var runList = filteredList;

    if (runList.length == 0) {
      throw new ConfigInvalidException("拿我这测试了?");
    }

    var startTime = new Date();
    var date = startTime.getMonth().toString() + "/" + startTime.getDate().toString();

    if (date === STORAGE.get("date")) {
      var search = false;

      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var app_1 = list_1[_i];

        if (search || app_1.constructor.name === STORAGE.get("app")) {
          var num = runList.indexOf(app_1);

          if (num == -1) {
            search = true;
          } else {
            LogRecord.info("继续执行剩余app");
            runList = runList.slice(num);
            break;
          }
        }
      }
    }

    STORAGE.put("date", date);
    var endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
    var timeDifference = endTime.getTime() - startTime.getTime();
    var timePerMethod = timeDifference / 1000;
    var map = {};
    var sortedList = runList.slice().sort(function (a, b) {
      return b.fetch(BaseKey.Weight) - a.fetch(BaseKey.Weight);
    });

    for (var _a = 0, sortedList_1 = sortedList; _a < sortedList_1.length; _a++) {
      var app_2 = sortedList_1[_a];
      map[app_2.constructor.name] = 0;
      LogRecord.debug("".concat(app_2.appName, ": ").concat(app_2.fetch(BaseKey.Weight)));
    }

    appTimeAllocation(map, timePerMethod, sortedList);

    for (var _b = 0, runList_1 = runList; _b < runList_1.length; _b++) {
      var app_3 = runList_1[_b];
      LogRecord.debug("".concat(app_3.appName, ": ").concat(convertSecondsToMinutes(map[app_3.constructor.name]), "\u5206\u949F"));
    }

    var surplus = 0;
    LogRecord.info("进入主流程");

    for (var _c = 0, runList_2 = runList; _c < runList_2.length; _c++) {
      var app_4 = runList_2[_c];
      clearBackground();
      var executeTime = surplus + map[app_4.constructor.name];
      app_4.store(BaseKey.Weight, 0);
      map[app_4.constructor.name] = 0;
      STORAGE.put("app", app_4.constructor.name);
      surplus = app_4.start(executeTime);
      var remainingAllocation = 30 * 60;

      for (var _d = 0, sortedList_2 = sortedList; _d < sortedList_2.length; _d++) {
        var tmp = sortedList_2[_d];

        if (surplus <= 0) {
          break;
        }

        var allocation = Math.min(surplus, remainingAllocation);

        if (map[tmp.constructor.name] != 0) {
          map[tmp.constructor.name] += allocation;
          surplus -= allocation;
        }
      }
    }

    clearBackground();
    LogRecord.info("发送今日收益");
    sendIncomeMessageToWxPuher(toShowString(filteredList));
    var doneTime = new Date();

    if (endTime.getTime() > doneTime.getTime()) {
      var waitTime = endTime.getTime() - doneTime.getTime();
      LogRecord.log("\u7B49\u5F85".concat(convertSecondsToMinutes(waitTime / 1000 + 5), "\u5206\u949F\u5F00\u542F\u65B0\u4E00\u5929\u4EFB\u52A1"));
      sleep(waitTime + 10000);
    }
  }
}

function appTimeAllocation(map, timePerMethod, sortedList) {
  LogRecord.info("分配执行时间");

  for (var _i = 0, sortedList_3 = sortedList; _i < sortedList_3.length; _i++) {
    var app_5 = sortedList_3[_i];
    timePerMethod -= app_5.highEffEstimatedTime;

    if (timePerMethod > 0) {
      map[app_5.constructor.name] = app_5.highEffEstimatedTime;
    } else {
      break;
    }
  }

  for (var _a = 0, sortedList_4 = sortedList; _a < sortedList_4.length; _a++) {
    var app_6 = sortedList_4[_a];

    if (app_6.medEffEstimatedTime != MAX_ASSIMT_TIME) {
      timePerMethod -= app_6.medEffEstimatedTime;

      if (timePerMethod > 0) {
        map[app_6.constructor.name] += app_6.medEffEstimatedTime;
      } else {
        timePerMethod += app_6.medEffEstimatedTime;
      }
    }
  }

  var count = 1;

  while (timePerMethod >= BASE_ASSIMT_TIME) {
    var time = count * BASE_ASSIMT_TIME;

    for (var _b = 0, sortedList_5 = sortedList; _b < sortedList_5.length; _b++) {
      var app_7 = sortedList_5[_b];

      if (app_7.lowEffEstimatedTime != MAX_ASSIMT_TIME) {
        var allocaTime = Math.min(time * app_7.lowEffAssmitCount, timePerMethod);
        var key = app_7.constructor.name;
        map[key] += allocaTime;
        timePerMethod -= allocaTime;
      }
    }

    if (count < 4) {
      count++;
    }
  }
}
})();

/******/ })()
;