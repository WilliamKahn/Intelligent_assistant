import { findAndClick, fixedClick, readClick, scrollClick, scrollPopClick, selectedClick } from "../common/click";
import { scrollTo, search, searchByOcrRecognize } from "../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTime, merge, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_RED_FRUITS, PACKAGE_READ_RED_FRUITS } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";


export class RedFruits extends AbstractTomato {

    list = ["阅读赚金币"]

    constructor() {
        super()
        this.appName = NAME_READ_RED_FRUITS
        this.packageName = PACKAGE_READ_RED_FRUITS
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 20 * 60)
        this.initialComponent = text("首页")
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.watchAds()
        this.mealSupp()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        this.goTo(text("福利"), -1)
        let flag = false
        if(textMatches("看短剧(自动)?赚金币").exists()){
            if(textMatches("看短剧赚金币").exists()){
                this.list.push("看短剧赚金币")
            }
            flag = true
        }
        doFuncAtGivenTime(time / 2, 10 * 60, (perTime: number) => {
            if(flag){
                this.swipeVideo(perTime)
            } else {
                this.readBook(perTime)
            }
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
        if(scrollClick("金币收益")){
            let tmp = textMatches("[0-9]+").findOnce()
            if(tmp != null) {
                const weight = parseInt(tmp.text())
                Record.debug(`${weight}`)
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    @functionLog("刷短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(selectedClick("推荐", 170)){
            if(findAndClick(className("android.widget.ImageView"), {
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
        const [bounds, _] = search("推荐")
        const centerY = (bounds.top + bounds.bottom)/2
        gesture(1000, [resizeX(random(780, 820)), centerY],
                 [resizeX(random(280, 320)), centerY + random(-30, 30)])
        waitRandomTime(2)
        if(selectedClick("经典", 170)){
            const [bound, _] = search(random(1, 4).toString())
            if(findAndClick(className("android.widget.TextView"), {
                bounds: {top: bound.top, left:bound.right},
                coverBoundsScaling: 1
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        for(let range of this.list){
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && scrollPopClick("立即领取", range)) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(text("福利"), -1)
        this.sign()
        if(scrollPopClick("去签到", "签到领金币|明日签到")){
            this.sign()
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "看视频赚海量金币")){
            this.watch(text("日常福利"))
        }
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