import { findAndClick, goneClick, scrollClick } from "../common/click";
import { scrollTo } from "../common/search";
import { doFuncAtGivenTime, resizeX, resizeY, } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_SPEED_FREE, PACKAGE_READ_SPEED_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class SpeedFree extends Base {

    buttonNameList:string[] = [
        '看视频再领[0-9]+金币',
        '看视频最高领[0-9]+金币'
    ]

    topBar: string = ""

    constructor() {
        super()
        this.appName = NAME_READ_SPEED_FREE
        this.packageName = PACKAGE_READ_SPEED_FREE
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 20 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        this.watchAds()
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) => {
            this.readBook(perTime)
            this.openTreasure()
            this.reward()
        })
        
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(desc("discovery_button"), -1)
        scrollTo("金币收益")
        let tmp = textMatches("[0-9]+").boundsInside(0,0,resizeX(420), resizeY(432)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    
    @functionLog("签到")
    signIn(): void{
        //每日签到 签到
        this.goTo(desc("discovery_button"), -1)
        if (scrollClick("立即签到.+")) {
            this.watchAdsForCoin("日常福利")
            goneClick("我知道了")
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(desc("discovery_button"), -1)
        if(goneClick("开宝箱得金币")) {
            this.watchAdsForCoin("日常福利")
            goneClick("我知道了")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去观看", "看视频赚金币")){
            this.watch(text("日常福利"))
            this.watchAdsForCoin("日常福利")
            goneClick("我知道了")
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        let tmp = id("com.dj.speed:id/channel_tab").findOnce()
        if(tmp != null && findAndClick("推荐",
        {fixed:true, ocrRecognize:true, bounds:tmp.bounds()})){
            if(findAndClick(id("com.zhangyue.iReader.bookStore:id/iv_book"), {fixed:true})){
                this.read(totalTime)
            }
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(desc("bookstore_button"), -1)
        let tmp = id("com.dj.speed:id/channel_tab").findOnce()
        if(tmp!=null && findAndClick("听书",
        {fixed:true, ocrRecognize:true, bounds: tmp.bounds()})){
            if(findAndClick(id("com.zhangyue.iReader.bookStore:id/id_audition_btn"))){
                if(goneClick("看视频")){
                    this.watch(desc("bookstore_button"))
                }
            }
        }
    }

    @functionLog("领饭补")
    mealSupp(): void {
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("立即领取", "吃饭赚钱")) {
            this.watchAdsForCoin("日常福利")
            goneClick("我知道了")
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        let list = ["阅读赚海量金币", "听书赚海量金币"]
        for(let range of list){
            while(++cycleCounts < MAX_CYCLES_COUNTS
                && scrollClick("领取", range)) {
                this.watchAdsForCoin("日常福利")
                goneClick("我知道了")
            }
        }
    }
}