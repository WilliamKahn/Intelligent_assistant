import { findAndClick, goneClick, normalClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo } from "../common/search";
import { close, convertSecondsToMinutes, doFuncAtGivenTime, merge, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_RED_FRUITS, PACKAGE_READ_RED_FRUITS } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";


export class RedFruits extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_RED_FRUITS
        this.packageName = PACKAGE_READ_RED_FRUITS
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 40 * 60)
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.watchAds()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time / 2, 10 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
            this.reward()
        })
        doFuncAtGivenTime(time / 2, 10 * 60, (perTime: number) => {
            this.readBook(perTime)
            this.openTreasure()
            this.reward()
        })
    }

    @measureExecutionTime
    weight(): void {

        this.goTo(text("福利"), -1)
        scrollTo("金币收益")
        let tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(442)).findOnce()
        if(tmp != null) {
            Record.log(`${this.constructor.name}:${parseInt(tmp.text())}`)
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("刷短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(selectedClick("推荐")){
            if(findAndClick(id(this.packageName+":id/title_tv"), {
                position:random(0,7),
                clickUntilGone:true,
                cover:true
            })){
                Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
                let watchTime=0;
                while(totalTime > watchTime){
                    if(textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()){
                        gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], 
                        [resizeX(random(780, 820)), resizeY(random(250, 350))])
                    }
                    watchTime += waitRandomTime(30)
                }
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(selectedClick("经典")){
            if(findAndClick(id(this.packageName+":id/name_tv"),{
                leftRange:random(1,8).toString(),
                position:1,
                cover:true
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        let list = ["看短剧赚金币", "阅读赚金币"]
        for(let range of list){
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && scrollClick("立即领取", range)) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(text("福利"), -1)
        this.sign()
        if(scrollClick("去签到")){
            this.sign()
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("去观看", "看视频赚海量金币")){
            this.watch(text("日常福利"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(text("福利"), -1)
        this.open()
    }

}