import { dialogClick, findAndClick, fixedClick, normalClick, readClick } from "../common/click"
import { scrollTo, search } from "../common/search"
import { close, closeByImageMatching, convertSecondsToMinutes, getNumFromComponent, getScreenImage, moveDown, randomExecute, resizeX, resizeY } from "../common/utils"
import { MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD, NAME_VEDIO_LIGHTNING_SEARCH, PACKAGE_VEDIO_LIGHTNING_SEARCH } from "../global"
import { functionLog, measureExecutionTime } from "../lib/decorators"
import { CurrentAppBanned } from "../lib/exception"
import { Record } from "../lib/logger"
import { AbstractArticle } from "./abstract/AbstractArticle"
import { BaseKey } from "./abstract/Base"

export class LightningSearch extends AbstractArticle {

    constructor() {
        super(PACKAGE_VEDIO_LIGHTNING_SEARCH)
        this.appName = NAME_VEDIO_LIGHTNING_SEARCH
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.freshGift()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.doubleEarn()},
            ()=>{this.toSearch()},
            ()=>{this.randomSearch()},
        ])
        this.reward()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 3)
        const component = search("[0-9]+金币")
        if(component!== undefined){
            const weight = getNumFromComponent(component.text)
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 3)
        if(dialogClick("立即签到")){
            this.watchAdsForCoin("日常任务")
        } else {//"签到失败"
            if(this.scrollClick("立即签到")){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 3)
        if (fixedClick("开宝箱得金币")) {
            const str = this.getCoinStr()
            const coin = getNumFromComponent(str)
            if(coin < MIN_RUN_THRESHOLD){
                throw new CurrentAppBanned(this.appName+"账号异常")
            }
            this.watchAdsForCoin("日常任务")
        }
    }

    getCoinStr(): string {
        const img = getScreenImage()
        const res = ocr.recognize(img)
        img.recycle()
        for(let item of res.results){
            if(RegExp("^.?[0-9]+金币$").test(item.text)){
                return item.text
            }
        }
        return ""
    }

    freshGift():void{
        this.goTo(this.tab, 3)
        findAndClick("去领取")
        if(findAndClick("立即领取")){
            if(fixedClick("点击领取")){
                closeByImageMatching()
            }
        }
    }

    @functionLog("开启翻倍")
    doubleEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick("去翻倍|点击翻倍")){
            dialogClick("我知道了")
        }
    }

    
    @functionLog("搜一搜赚钱")
    toSearch():void{
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("去搜索") 
            && fixedClick("搜索")){
            moveDown(15, 4)
            this.backUntilFind(text("日常任务"))
        }
    }

    @functionLog("随机搜赚钱")
    randomSearch():void{
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && findAndClick("随机搜")){
            moveDown(15, 4)
            this.backUntilFind(text("日常任务"))
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        scrollTo("现金收益")
        while(++cycleCounts < MAX_CYCLES_COUNTS  && this.ocrClick("点击领取|点击抽奖")){
            this.watchAdsForCoin("日常任务")
            if(dialogClick("开始抽奖")){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(dialogClick("点击领取")){
                    this.watchAdsForCoin("日常任务")
                }
            }
        }
    }

    @functionLog("领取刷视频奖励")
    swipeReward():void{
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        scrollTo("如有疑问请参考活动规则", {waitFor:true})
        while(++cycleCounts < MAX_CYCLES_COUNTS && fixedClick("点击领取")){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 10)
    }
}