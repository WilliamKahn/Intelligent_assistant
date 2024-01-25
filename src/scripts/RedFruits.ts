import { findAndClick, fixedClick, scrollClick, selectedClick, waitClick } from "../common/click";
import { search } from "../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTime, merge, overDetection, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_RED_FRUITS, PACKAGE_READ_RED_FRUITS } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";


export class RedFruits extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_RED_FRUITS
        this.packageName = PACKAGE_READ_RED_FRUITS
        this.initialComponent = text("首页")
        this.lowEff1Inheritance = true
        this.lowEff2Inheritance = true
        this.lowEff1Start = 4
        this.lowEff2Start = 5
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            this.watchAds()){}
        this.mealSupp()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
        this.depositReward()
    }

    @measureExecutionTime
    lowEff2(time: number): void {
        this.readBook(time)
        this.openTreasure()
        this.readReward()
    }

    goto(): void {
        this.goTo(text("福利"), -1)
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(selectedClick("推荐", 170)){
            if(findAndClick(className("android.widget.ImageView"), {
                waitFor:true,
                fixed:true,
                index: random(0, 17)
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
        if(selectedClick("经典", 170)){
            const component = search(random(1, 4).toString())
            if(findAndClick(className("android.widget.TextView"), {
                bounds: {top: component?.bounds.top, left:component?.bounds.right},
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取阅读奖励")
    readReward(): void{
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "阅读赚金币", {clickUntilGone:false})) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取额外存金币奖励")
    depositReward(): void{
        this.goTo(text("福利"), -1)
        if(scrollClick("立即领取", "看短剧额外存金币", {clickUntilGone:false})){
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取短剧奖励")
    swipeReward(): void{
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "看短剧(自动)?赚金币", {clickUntilGone:false})) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(text("福利"), -1)
        this.checkDetection()
        this.sign()
        if(scrollClick("去签到", "签到领金币|明日签到", {clickUntilGone:false})){
            this.sign()
        }
    }

    afterDetection(): void {
        this.goTo(text("首页"), -1)
        this.goTo(text("福利"), -1)
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(text("福利"), -1)
        if(waitClick("立即领取", "看视频赚海量金币")){
            this.watch(text("日常福利"))
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(text("福利"), -1)
        this.open()
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goTo(text("福利"), -1)
        if(scrollClick("去领取", "吃饭补贴")){
            if(fixedClick("领.*补贴[0-9]+金币")){
                this.watchAdsForCoin("已按时吃饭.*天")
            }
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS &&
                fixedClick("看视频补领一次补贴")){
                this.watch(textMatches("已按时吃饭.*天|恭喜获得"))
                this.watchAdsForCoin("已按时吃饭.*天")
            }
        }
    }
}