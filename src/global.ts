/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2023-08-07 08:06:32
 * @FilePath: \\src\\global.ts
 * @Description: 全局常量和配置项验证
 */

import { ConfigInvalidException } from "./lib/exception";
import { LogLevel, LOG_STACK, Record, sendLog, setToken } from "./lib/logger";
import { Bounds, resizeX, resizeY, waitRandomTime } from "./lib/utils";
import { DeJian } from "./scripts/DeJian";
import { KuaiShouLite } from "./scripts/KuaiShouLite";
import { RedFruits } from "./scripts/RedFruits";
import { Tomato } from "./scripts/Tomato";
import { TomatoFree } from "./scripts/TomatoFree";
import { TomatoLite } from "./scripts/TomatoLite";
import { WanChao } from "./scripts/WanChao";
import { YouShi } from "./scripts/YouShi";
import { StarrySky } from "./scripts/StarrySky";
import { EggplantFree } from "./scripts/EggplantFree";
import { PandaBrain } from "./scripts/PandaBrain";
import { SpeedFree } from "./scripts/SpeedFree";
import { MarvelFree } from "./scripts/MarvelFree";
import { SevenCatsFree } from "./scripts/SevenCatsFree";
import { ShuQi } from "./scripts/ShuQi";
import { KuaiShouFree } from "./scripts/KuaiShouFree";
import { KuaiShou } from "./scripts/KuaiShou";
import { TikTokLite} from "./scripts/TikTokLite";


//*******************全局常量****************************/

export const PROJECT_NAME = "智能助手"
/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = "0.2.2";

// export const LISTENER_INTERVAL = 100
// export const EVENT = events.emitter()

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
export const WAIT_TIME_AFTER_CLICK = 4
//最大循环次数
export const MAX_CYCLES_COUNTS = 25
//时间分配之冗余时间
export const REDUNDANCY_TIME = 3 * 60
//基础脚本执行时间(s)
export const BASE_ASSIMT_TIME = 10 * 60
//权重预估时间
export const WEIGHT_ASSIMT_TIME = 5 * 60
//最大时间
export const MAX_ASSIMT_TIME = 24 * 60 * 60
//存储名称
export const STORAGE_WEIGHT_CONTAINER = "YWfjbEVp29"
//存储
export const STORAGE = storages.create(STORAGE_WEIGHT_CONTAINER);
//基于设备分辨率
export const DEVICE_WIDTH = 1080
export const DEVICE_HEIGHT = 2340
//点击滑动范围
export const RANGE_MIDDLE_SCREEN: Bounds = {
    top: device.height * 1 / 3,
    bottom: device.height * 2 / 3
}
export const RANGE_FOUR_FIFTHS_SCREEN: Bounds = {
    top: device.height * 1 / 5,
    bottom: device.height * 4 / 5
}
export const RANGE_FIXED_SCREEN: Bounds = {
    top: resizeX(200),
    bottom: resizeY(2140)
}

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

export const NAME_VEDIO_KUAISHOU = "快手"
export const PACKAGE_VEDIO_KUAISHOU = "com.smile.gifmaker"

export const NAME_READ_KUAISHOU_FREE = "快手免费小说"
export const PACKAGE_READ_KUAISHOU_FREE = "com.kuaishou.kgx.novel"

export const NAME_VEDIO_KUAISHOU_LITE = "快手极速版"
export const PACKAGE_VEDIO_KUAISHOU_LITE = "com.kuaishou.nebula"

export const NAME_VEDIO_YOUSHI = "有柿"
export const PACKAGE_VEDIO_YOUSHI = "com.ss.android.article.search"

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
//红果
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

//望潮
export const wanChao = new WanChao()

//执行顺序
export const list = [
    youShi,
    shuQi,

    starrySky,  
    marvelFree,
    eggplantFree, 
    sevenCatsFree,
    pandaBrain,

    tomato, 
    tomatoFree, 
    tomatoLite, 
    redFruits, 

    kuaiShouFree,

    speedFree, 
    deJian, 
    wanChao, 
]
Record.info("加载配置");
//配置筛选后
export const filteredList = list.filter(
    item => hamibot.env[item.constructor.name] !== false
)


Record.info(`正在启动...\n\n\t当前脚本版本: ${VERSION}\n`);

// ---------------------- configuration -------------------------

export const {
    _TOKEN,
    _SHOW_CONSOLE,
    APP_ENV,
    ROBOT_ID
} = hamibot.env;

if(APP_ENV === 'production'){
    Record.setDisplayLevel(LogLevel.Log)
} else if(APP_ENV === 'development') {
    Record.debug("处于开发环境")
}
//是否显示控制台
export const SHOW_CONSOLE = _SHOW_CONSOLE
// -------------------- register listener -----------------------

// register exit listener
events.on("exit", () => {
    threads.shutDownAll()
    Record.info("结束...")
    waitRandomTime(5)
    console.hide()
});

// ------------------------ validation --------------------------

// pushplus token
if (_TOKEN && _TOKEN !== "" && setToken(_TOKEN) == false) {
    throw new ConfigInvalidException("pushplus token", "needs to be a 32-bit hexadecimal number");
}

Record.info("开始执行脚本");

