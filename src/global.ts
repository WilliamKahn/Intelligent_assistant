/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2023-08-07 08:06:32
 * @FilePath: \\src\\global.ts
 * @Description: 全局常量和配置项验证
 */

import { waitRandomTime } from "./common/utils";
import { ConfigInvalidException } from "./lib/exception";
import { init } from "./lib/init";
import { LogLevel, Record as LogRecord, setToken } from "./lib/logger";
import { Article } from "./scripts/Article";
import { ArticleLite } from "./scripts/ArticleLite";
import { Baidu } from "./scripts/Baidu";
import { BaiduBig } from "./scripts/BaiduBig";
import { BaiduLite } from "./scripts/BaiduLite";
import { ChangReadFree } from "./scripts/ChangReadFree";
import { DeJian } from "./scripts/DeJian";
import { EggFlower } from "./scripts/EggFlower";
import { EggplantFree } from "./scripts/EggplantFree";
import { XimalayaLite } from "./scripts/XimalayaLite";
import { KuaiShou } from "./scripts/KuaiShou";
import { KuaiShouFree } from "./scripts/KuaiShouFree";
import { KuaiShouLite } from "./scripts/KuaiShouLite";
import { LightningSearch } from "./scripts/LightningSearch";
import { MarvelFree } from "./scripts/MarvelFree";
import { PandaBrain } from "./scripts/PandaBrain";
import { RedFruits } from "./scripts/RedFruits";
import { SevenCatsFree } from "./scripts/SevenCatsFree";
import { ShengRead } from "./scripts/ShengRead";
import { ShuQi } from "./scripts/ShuQi";
import { SpeedFree } from "./scripts/SpeedFree";
import { StarrySky } from "./scripts/StarrySky";
import { TikTokLite } from "./scripts/TikTokLite";
import { TikTokVolcano } from "./scripts/TikTokVolcano";
import { Tomato } from "./scripts/Tomato";
import { TomatoFree } from "./scripts/TomatoFree";
import { TomatoLite } from "./scripts/TomatoLite";
import { WanChao } from "./scripts/WanChao";
import { Watermelon } from "./scripts/Watermelon";
import { XinyaFree } from "./scripts/XinyaFree";
import { YouShi } from "./scripts/YouShi";
import { BaseKey } from "./scripts/abstract/Base";
import { FontCharacterMap } from "./common/interfaces";
import { sendIncomeMessageToWxPuher, toShowString } from "./common/report";


//*******************全局常量****************************/
export const PROJECT_NAME = "智能助手"
/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = "0.7.3";

// export const LISTENER_INTERVAL = 100
// export const EVENT = events.emitter()

//微信推送url
export const WX_PUSHER_URL = "https://wxpusher.zjiecode.com/api/send/message"
//微信推送应用token
export const APP_TOKEN = "AT_2vEaUfXFmwMKybX7YeX3yCJFrmc7TFlD"
export const INCOME_THRESHOLD:number = 0.0035
export const INCOME_RECOVER:number = 0.0005
//最大返回次数
export const MAX_BACK_COUNTS = 10
//最大点击次数
export const MAX_CLICK_COUNTS = 8
//最大重启app次数
export const MAX_RETRY_COUNTS = 3
//点击后等待时间，单位s
export const WAIT_TIME_UNTIL_CLICK = 1
//等待查找时间
export const NORMAL_WAIT_TIME = 6
//最大循环次数
export const MAX_CYCLES_COUNTS = 25
//基础脚本执行时间(s)
export const BASE_ASSIMT_TIME = 10 * 60
//权重预估时间
export const WEIGHT_ASSIMT_TIME = 5 * 60
//最大时间
export const MAX_ASSIMT_TIME = 24 * 60 * 60
//最低执行金币阈值
export const MIN_RUN_THRESHOLD = 10
//中止app记录
export const STORAGE_APP = "app"
//中止日期（月/日）
export const STORAGE_DATE = "date"
//不记录运行时间
export const STORAGE_NO_RECORD = "noRecord"
//存储名称32
export const STORAGE_WEIGHT_CONTAINER = "YWfjbEVp33"
//存储
export const STORAGE = storages.create(STORAGE_WEIGHT_CONTAINER);
//基于设备分辨率
export const DEVICE_WIDTH = 1080
export const DEVICE_HEIGHT = 2340
//ocr错误字体集
export const characterMapping: FontCharacterMap = {
    "逛": ["逛", "进", "连", "证"],
    "币": ["币", "市"],
    "走": ["走", "定"],
    "睡": ["睡", ""],
    "赚": ["赚", "兼"],
    "一": ["一",""],
    "剧": ["剧", "刷"],
    "首页": ["首页", "锁"]
    // 其他字符的映射
}
export const funcNameMap = {
    "签到": "signIn",
    "开宝箱": "openTreasure",
    "看广告": "watchAds",
    "听书": "listenBook",
    "听音乐": "listenMusic",
    "阅读": "readBook",
    "看短剧": "swipeVideo",
    "刷视频": "swipeVideo",
    "吃饭补贴": "mealSupp",
    "吃饭打卡": "mealSupp",
    "逛街": "shopping",
    "领取奖励": "reward",
    "领取阅读奖励": "readReward",
    "领取短剧奖励": "swipeReward",
    "领取视频奖励": "swipeReward",
    "领取听书奖励": "listenReward",
    "领取听歌奖励": "listenReward",
    "领取每日奖励": "dailyReward",
    "领取日常奖励": "dailyReward",
    "领取额外存金币奖励": "depositReward",
    "参与活动": "joinActivity",
    "幸运大转盘": "luckySpin",
    "抽奖赢金币": "winGoldCoin",
    "点赞": "like",
    "评论": "comment",
    "收藏": "collect",
    "搜索得金币": "searchForCoin",
    "测运势": "makesureFortune",
    "芭芭农场": "goFarm",
    "走路赚钱": "walkEarn",
    "睡觉赚钱": "sleepEarn",
    "奖励翻倍": "doubleEarn",
    "搜一搜赚钱": "toSearch",
    "随机搜赚钱": "randomSearch",
    "看直播": "watchLive"
}

export const PACKAGE_HAMIBOT = "com.hamibot.hamibot"
//脚本包名
export const NAME_READ_TOMATO = "番茄畅听"
export const PACKAGE_READ_TOMATO = "com.xs.fm";

export const NAME_READ_TOMATO_FREE = "番茄免费小说"
export const PACKAGE_READ_TOMATO_FREE = "com.dragon.read"

export const NAME_READ_TOMATO_LITE = "番茄畅听音乐版"
export const PACKAGE_READ_TOMATO_LITE = "com.xs.fm.lite"

export const NAME_READ_RED_FRUITS = "红果免费短剧"
export const PACKAGE_READ_RED_FRUITS = "com.phoenix.read"

export const NAME_READ_DEJIAN = "得间小说"
export const PACKAGE_READ_DEJIAN = "com.chaozh.iReader.dj"

export const NAME_READ_EGGPLANT_FREE = "茄子免费小说"
export const PACKAGE_EGGPLANT_FREE = "com.qz.freader"

export const NAME_READ_PANDA_BRAIN = "熊猫脑洞小说"
export const PACKAGE_READ_PANDA_BRAIN = "com.xm.freader"

export const NAME_READ_MARVEL_FREE = "奇迹免费小说"
export const PACKAGE_READ_MARVEL_FREE = "reader.com.xmly.xmlyreader"

export const NAME_READ_SPEED_FREE = "速读免费小说"
export const PACKAGE_READ_SPEED_FREE = "com.dj.speed"

export const NAME_READ_SHUQI = "书旗小说"
export const PACKAGE_READ_SHUQI = "com.shuqi.controller"

export const NAME_READ_SEVEN_CATS_FREE = "七猫免费小说"
export const PACKAGE_READ_SEVEN_CATS_FREE = "com.kmxs.reader"

export const NAME_READ_WANCHAO = "望潮"
export const PACKAGE_READ_WANCHAO = "com.shangc.tiennews.taizhou"

export const NAME_READ_STARRY_SKY = "星空免费小说"
export const PACKAGE_READ_STARRY_SKY = "com.xk.qreader"

export const NAME_VEDIO_TIKTOK_LITE = "抖音极速版"
export const PACKAGE_VEDIO_TIKTOK_LITE = "com.ss.android.ugc.aweme.lite"

export const NAME_VEDIO_TIKTOK_VOLCANO = "抖音火山版"
export const PACKAGE_VEDIO_TIKTOK_VOLCANO = "com.ss.android.ugc.live"

export const NAME_VEDIO_KUAISHOU = "快手"
export const PACKAGE_VEDIO_KUAISHOU = "com.smile.gifmaker"

export const NAME_READ_KUAISHOU_FREE = "快手免费小说"
export const PACKAGE_READ_KUAISHOU_FREE = "com.kuaishou.kgx.novel"

export const NAME_VEDIO_KUAISHOU_LITE = "快手极速版"
export const PACKAGE_VEDIO_KUAISHOU_LITE = "com.kuaishou.nebula"

export const NAME_VEDIO_YOUSHI = "有柿"
export const PACKAGE_VEDIO_YOUSHI = "com.ss.android.article.search"

export const NAME_VEDIO_BAIDU = "百度"
export const PACKAGE_VEDIO_BAIDU = "com.baidu.searchbox"

export const NAME_VEDIO_BAIDU_LITE = "百度极速版"
export const PACKAGE_VEDIO_BAIDU_LITE = "com.baidu.searchbox.lite"

export const NAME_VEDIO_BAIDU_BIG = "百度大字版"
export const PACKAGE_VEDIO_BAIDU_BIG = "com.baidu.searchbox.tomas"

export const NAME_READ_ARTICLE = "今日头条"
export const PACKAGE_READ_ARTICLE = "com.ss.android.article.news"

export const NAME_READ_ARTICLE_LITE = "头条搜索极速版"
export const PACKAGE_READ_ARTICLE_LITE = "com.ss.android.article.lite"

export const NAME_VEDIO_WATERMELON = "西瓜视频"
export const PACKAGE_VEDIO_WATERMELON = "com.ss.android.article.video"

export const NAME_READ_XIMALAYA_LITE = "喜马拉雅极速版"
export const PACKAGE_READ_XIMALAYA_LITE = "com.ximalaya.ting.lite"

export const NAME_READ_SHENGREAD = "盛读"
export const PACKAGE_READ_SHENGREAD = "com.kangaroo.shengdu"

export const NAME_VEDIO_LIGHTNING_SEARCH = "闪电搜索"
export const PACKAGE_VEDIO_LIGHTNING_SEARCH = "com.ss.android.article.daziban"

export const NAME_READ_CHANG_READ_FREE = "常读免费小说"
export const PACKAGE_READ_CHANG_READ_FREE = "com.woodleaves.read"

export const NAME_READ_EGG_FLOWER = "蛋花免费小说"
export const PACKAGE_READ_EGG_FLOWER = "com.eggflower.read"

export const NAME_READ_XINGYA_FREE = "星芽免费小说"
export const PACKAGE_READ_XINGYA_FREE = "com.jz.xydj"

export const {
    _TOKEN,
    APP_ENV,
    ROBOT_ID,
    ORDER,
    RESET
} = hamibot.env;


if(RESET === true){
    LogRecord.info("脚本重置")
    STORAGE.clear()
}

//有柿 
export const youShi = new YouShi()
//书旗小说
export const shuQi = new ShuQi()

//星空免费小说
export const starrySky = new StarrySky()
//奇迹免费小说 
export const marvelFree = new MarvelFree()
//茄子免费小说
export const eggplantFree = new EggplantFree()
//七猫免费
export const sevenCatsFree = new SevenCatsFree()
//熊猫脑洞小说
export const pandaBrain = new PandaBrain()

//番茄畅听
export const tomato = new Tomato()
//番茄免费小说
export const tomatoFree = new TomatoFree()
//番茄极速  常黑了
export const tomatoLite = new TomatoLite()
//番茄免费短剧
export const redFruits = new RedFruits()

//快手免费小说
export const kuaiShouFree = new KuaiShouFree()
//快手
export const kuaiShou = new KuaiShou()
//快手极速版 看广告有冷却时间 时间又长奖励又少需要解决
export const kuaiShouLite = new KuaiShouLite()
//抖音极速版
export const tikTokLite = new TikTokLite()
//抖音火山版
export const tikTokVolcano = new TikTokVolcano()

//速读免费小说
export const speedFree = new SpeedFree()
//得间小说
export const deJian = new DeJian()

//百度
export const baidu = new Baidu()
//百度极速版
export const baiduLite = new BaiduLite()
//百度大字版
export const baiduBig = new BaiduBig()

//今日头条
export const article = new Article()
//头条极速版
export const articleLite = new ArticleLite()
//望潮
export const wanChao = new WanChao()
//西瓜
export const watermelon = new Watermelon()

export const changReadFree = new ChangReadFree()
export const eggFlower = new EggFlower()
export const ximalayaLite = new XimalayaLite()
export const shengRead = new ShengRead()
export const xinyaFree = new XinyaFree()
export const lightningSearch = new LightningSearch()

export const list = [
    speedFree,
    deJian,
    starrySky,
    eggplantFree,
    pandaBrain,
    sevenCatsFree,
    shuQi,
    marvelFree,
    kuaiShouFree,
    redFruits,
    tomato,
    tomatoFree,
    tomatoLite,
    kuaiShou,
    kuaiShouLite,
    baidu,
    baiduLite,
    baiduBig,
    youShi,
    article,
    articleLite,
    tikTokLite,
    tikTokVolcano,
    changReadFree,
    eggFlower,
    ximalayaLite,
    shengRead,
    xinyaFree,
    lightningSearch
]

LogRecord.info("加载配置");

LogRecord.info(`正在启动...\n\n\t当前脚本版本: ${VERSION}\n`);

// ---------------------- configuration -------------------------

if(APP_ENV === 'production'){
    LogRecord.setDisplayLevel(LogLevel.Log)
} else if(APP_ENV === 'development') {
    LogRecord.debug("处于开发环境")
}
// -------------------- register listener -----------------------
// register exit listener
events.on("exit", () => {
    threads.shutDownAll()
    LogRecord.info("结束...")
    for(const app of list){
        app.store(BaseKey.HighEffIncomePerMinute, app.highEffIncomePerMinute)
        app.store(BaseKey.MedEffIncomePerMinute, app.medEffIncomePerMinute)
        app.store(BaseKey.LowEff1IncomePerMinute, app.lowEff1IncomePerMinute)
        app.store(BaseKey.LowEff2IncomePerMinute, app.lowEff2IncomePerMinute)
        app.store(BaseKey.LowEff3IncomePerMinute, app.lowEff3IncomePerMinute)
    }
    waitRandomTime(5)
    console.hide()
})
threads.start(()=>{
    events.setKeyInterceptionEnabled('volume_up', true);
    events.setKeyInterceptionEnabled('volume_down', true);
    events.observeKey();
    events.onKeyDown('volume_down', () => {
        exit()
    })
    events.onKeyDown('volume_up', () => {
        LogRecord.info("发送运行收益")
        sendIncomeMessageToWxPuher(toShowString(list))
    })
})
LogRecord.log("音量+键发送收益")
LogRecord.log("音量-键停止运行")

// ------------------------ validation --------------------------

// pushplus token
if (_TOKEN && _TOKEN !== "" && setToken(_TOKEN) == false) {
    throw new ConfigInvalidException("pushplus token", "needs to be a 32-bit hexadecimal number");
}

LogRecord.info("开始执行脚本");
init()