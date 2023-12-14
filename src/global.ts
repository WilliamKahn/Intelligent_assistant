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
import { LogLevel, Record as LogRecord, setToken } from "./lib/logger";
import { Baidu } from "./scripts/Baidu";
import { BaiduBig } from "./scripts/BaiduBig";
import { BaiduLite } from "./scripts/BaiduLite";
import { DeJian } from "./scripts/DeJian";
import { EggplantFree } from "./scripts/EggplantFree";
import { KuaiShou } from "./scripts/KuaiShou";
import { KuaiShouFree } from "./scripts/KuaiShouFree";
import { KuaiShouLite } from "./scripts/KuaiShouLite";
import { MarvelFree } from "./scripts/MarvelFree";
import { PandaBrain } from "./scripts/PandaBrain";
import { RedFruits } from "./scripts/RedFruits";
import { SevenCatsFree } from "./scripts/SevenCatsFree";
import { ShuQi } from "./scripts/ShuQi";
import { SpeedFree } from "./scripts/SpeedFree";
import { StarrySky } from "./scripts/StarrySky";
import { TikTokLite } from "./scripts/TikTokLite";
import { Tomato } from "./scripts/Tomato";
import { TomatoFree } from "./scripts/TomatoFree";
import { TomatoLite } from "./scripts/TomatoLite";
import { WanChao } from "./scripts/WanChao";
import { YouShi } from "./scripts/YouShi";


//*******************全局常量****************************/

export const PROJECT_NAME = "智能助手"
/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = "0.4.3";

// export const LISTENER_INTERVAL = 100
export const EVENT = events.emitter()

//微信推送url
export const WX_PUSHER_URL = "https://wxpusher.zjiecode.com/api/send/message"
//微信推送应用token
export const APP_TOKEN = "AT_2vEaUfXFmwMKybX7YeX3yCJFrmc7TFlD"
//最大返回次数
export const MAX_BACK_COUNTS = 10
//最大点击次数
export const MAX_CLICK_COUNTS = 8
//最大重启app次数
export const MAX_RETRY_COUNTS = 3
//点击后等待时间，单位s
export const WAIT_TIME_AFTER_CLICK = 6
//最大循环次数
export const MAX_CYCLES_COUNTS = 25
//基础脚本执行时间(s)
export const BASE_ASSIMT_TIME = 10 * 60
//权重预估时间
export const WEIGHT_ASSIMT_TIME = 5 * 60
//最大时间
export const MAX_ASSIMT_TIME = 24 * 60 * 60
//中止app记录
export const STORAGE_APP = "app"
//中止日期（月/日）
export const STORAGE_DATE = "date"
//不记录运行时间
export const STORAGE_NO_RECORD = "noRecord"
//存储名称29
export const STORAGE_WEIGHT_CONTAINER = "YWfjbEVp32"
//存储
export const STORAGE = storages.create(STORAGE_WEIGHT_CONTAINER);
//基于设备分辨率
export const DEVICE_WIDTH = 1080
export const DEVICE_HEIGHT = 2340

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
export const PACKAGE_VEDIO_TIKTOK_VOLCANO = "com.ss.android.ugc.aweme.lite"

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

//望潮
export const wanChao = new WanChao()

//初始化map
export const highEffmap:Record<string, number> = {}
export const medEffMap:Record<string, number> = {}
export const lowEffMap:Record<string, number> = {}
export const fixedMap:Record<string, number> = {}

const map:Record<string, any> = {
    "1" : youShi,
    "2" : shuQi,
    "3" : starrySky,
    "4" : marvelFree,
    "5" : eggplantFree,
    "6" : sevenCatsFree,
    "7" : pandaBrain,
    "8" : tomato,
    "9" : tomatoFree,
    "10": tomatoLite,
    "11": redFruits,
    "12": kuaiShouFree,
    "13": speedFree,
    "14": deJian,
    "15": wanChao,
    "16": kuaiShou,
    "17": kuaiShouLite
}
LogRecord.info("加载配置");
export const {
    _TOKEN,
    _SHOW_CONSOLE,
    APP_ENV,
    ROBOT_ID,
    ORDER,
    RESET
} = hamibot.env;
//是否显示控制台
export const SHOW_CONSOLE = _SHOW_CONSOLE
//执行列表
export let list:any = []
if(ORDER != undefined){
    LogRecord.info("调整执行顺序")
    let orderList = ORDER.split(" ")
    if(orderList.length > 0) {
        //去重复
        orderList = orderList.filter((value:string, index: number, self:string) => self.indexOf(value) === index)
        for(let key of orderList){
            const parts = key.split(":")
            if(parts.length === 2){
                key = parts[0]
                const time = Number(parts[1])
                if(!isNaN(time)){
                    const app = map[key]
                    if(app != undefined) fixedMap[app.constructor.name] = time * 60
                }
            }
            let app = map[key]
            if(app != undefined) list.push(app)
        }
    }
}
if(list.length != map.length){
    for(let key in map){
        if(list.indexOf(map[key]) == -1){
            list.push(map[key])
        }
    }
}
export const filteredList = list.filter(
    item => hamibot.env[item.constructor.name] !== false
)


LogRecord.info(`正在启动...\n\n\t当前脚本版本: ${VERSION}\n`);

// ---------------------- configuration -------------------------

if(APP_ENV === 'production'){
    LogRecord.setDisplayLevel(LogLevel.Log)
} else if(APP_ENV === 'development') {
    LogRecord.debug("处于开发环境")
}

if(RESET === true){
    LogRecord.info("脚本重置")
    STORAGE.clear()
}
// -------------------- register listener -----------------------
// register exit listener
events.on("exit", () => {
    threads.shutDownAll()
    LogRecord.info("结束...")
    waitRandomTime(5)
    console.hide()
});


// ------------------------ validation --------------------------

// pushplus token
if (_TOKEN && _TOKEN !== "" && setToken(_TOKEN) == false) {
    throw new ConfigInvalidException("pushplus token", "needs to be a 32-bit hexadecimal number");
}

LogRecord.info("开始执行脚本");

