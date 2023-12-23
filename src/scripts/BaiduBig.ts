import { findAndClick, fixedClick, ocrClick, scrollClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU_BIG, PACKAGE_VEDIO_BAIDU_BIG } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduBig extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU_BIG
        this.appName = NAME_VEDIO_BAIDU_BIG
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 30 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        closeByImageMatching()
        this.signIn()
        this.openTreasure()
        this.listenBook()
        this.searchForCoin()
        this.watchAds()
        this.openTreasure()
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 20 * 60, (perTime:number) => {
            this.swipeVideo(perTime)
            this.reward3()
            this.reward2()
        })
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto()
        scrollTo("现金收益",{coverBoundsScaling:1})
        const [_, name] = searchByOcrRecognize("[0-9]+", {bounds:{bottom:device.height*1/5}})
        if(name !== undefined){
            const weight = parseInt(name.toString())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 0)
        this.goto()
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("现金收益"))
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goto()
        let cycleCounts = 0
        while(cycleCounts <= MAX_CYCLES_COUNTS
            && scrollClick("去完成", "看广告赚钱.*")){
            this.watch(text("现金收益"))
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("搜索赚金币")
    searchForCoin():void{
        this.goto()
        scrollTo("搜索赚金币.*", {coverBoundsScaling:1})
        let tmp = textMatches("搜索赚金币.*").findOnce()
        if(tmp != null){
            const regex = /\((\d+)\/(\d+)\)/;
            const match = tmp.text().match(regex)
            if(match){//parseInt(match[1]) parseInt(match[2])
                for(let i = 0; i < 8; i++){
                    if(findAndClick(className("android.widget.TextView"), {
                        bounds:tmp?.parent()?.parent()?.parent()?.child(1)?.bounds(),
                        waitTimes:8
                    })){
                        this.backUntilFind(text("现金收益"))
                        waitRandomTime(2)
                        this.watchAdsForCoin("现金收益")
                    }
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 1)
        if(findAndClick(className("android.widget.TextView"), {
            leftRange: random(1,4).toString(),
            clickUntilGone:true
        })){
            fixedClick("开始听书|续播")
        }
    }

    @functionLog("浏览资讯")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        moveDown(totalTime, 4)
    }

    @functionLog("每日挑战奖励领取")
    reward(): void {
        this.goto()
        let cycleCounts = 0
        scrollTo("今日任务", {coverBoundsScaling:1})
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && ocrClick(".?领取")){
        }
    }

    @functionLog("领取奖励")
    reward2(): void {
        this.goto()
        let cycleCounts = 0
        scrollTo("领取", {coverBoundsScaling:1})
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && fixedClick("领取")){
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("领取红包")
    reward3(): void {
        this.goto()
        let cycleCounts = 0
        scrollTo("看视频/热搜赚金币", {coverBoundsScaling:1})
        let tmp = text("看视频/热搜赚金币").findOnce()
        while(++cycleCounts <= MAX_CYCLES_COUNTS
            && findAndClick("领",{ocrRecognize:true, bounds:tmp?.parent()?.parent()?.parent()?.child(2)?.bounds()})){
        }
    }


    goto(): void{
        if(this.tab.exists()){
            this.goTo(this.tab, 4)
            fixedClick("立即签到")
        }else{
            this.backUntilFind(text("现金收益"))
        }
    }

}