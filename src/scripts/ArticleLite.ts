import { dialogClick, findAndClick, fixedClick, normalClick, findByOcrAndClick, scrollClick } from "../common/click";
import { Move } from "../common/enums";
import { closeByImageMatching, getScreenImage, searchByOcrRecognize } from "../common/ocr";
import { scrollTo, search } from "../common/search";
import { convertSecondsToMinutes, getNumFromComponent, moveDown, randomExecute, replaceCharacters, resizeX, resizeY, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD, NAME_READ_ARTICLE_LITE, NORMAL_WAIT_TIME, PACKAGE_READ_ARTICLE_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { CurrentAppBanned } from "../lib/exception";
import { Record } from "../lib/logger";
import { AbstractArticle } from "./abstract/AbstractArticle";
import { BaseKey } from "./abstract/Base";

export class ArticleLite extends AbstractArticle{

    constructor(){
        super(PACKAGE_READ_ARTICLE_LITE)
        this.appName = NAME_READ_ARTICLE_LITE
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
        this.moveTimes = 20
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.doubleEarn()},
            ()=>{this.toSearch()},
            ()=>{this.randomSearch()},
        ])
        this.reward()
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds()){
            this.openTreasure()
            this.swipeVideo(10 * 60)
        }
        this.reward()
    }
    
    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo("现金收益")
        const component = search("[0-9]+金币")
        if(component){
            const weight = parseInt(component.text())
            Record.debug(`${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("额外再领|翻倍领取")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("任务"))
            closeByImageMatching()
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (fixedClick("开宝箱得金币")) {
            const str = this.getCoinStr()
            const coin = getNumFromComponent(str)
            if(coin < MIN_RUN_THRESHOLD){
                throw new CurrentAppBanned(this.appName+"账号异常")
            }
            this.watchAdsForCoin("任务")
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

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(this.scrollClick("领福利")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(textMatches("任务"))
            return true
        }
        return false
    }

    @functionLog("开启翻倍")
    doubleEarn(): void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("去翻倍|点击翻倍")){
            dialogClick("我知道了")
        }
    }

    @functionLog("搜一搜赚钱")
    toSearch():void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("去搜索") && fixedClick("搜索")){
            moveDown(15, 4)
            this.backUntilFind(text("任务"))
        }
    }

    @functionLog("随机搜赚钱")
    randomSearch():void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && this.scrollClick("随机搜")){
            moveDown(15, 4)
            this.backUntilFind(text("任务"))
        }
    }

    @functionLog("领取挑战奖励")
    dailyReward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("领取")){
            this.watchAdsForCoin("任务")
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        this.scrollTo("现金收益")
        while(++cycleCounts < MAX_CYCLES_COUNTS  
            && findByOcrAndClick("点击领取|点击抽奖", {
        })){
            this.watchAdsForCoin("任务")
            if(dialogClick("开始抽奖")){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(dialogClick("点击领取")){
                    this.watchAdsForCoin("任务")
                }
            }
        }
    }

    @functionLog("看视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 2)
        if(this.scrollClick("看视频")){
            Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
            moveDown(totalTime, 10)
        }
    }

    move(): void {
        if(this.moveFlag){
            swipeDown(Move.Normal, 1000)
        } else {
            swipeUp(Move.Normal, 1000)
        }
        const sign = searchByOcrRecognize("现金收益.?|如有疑问请参考活动规则", {waitFor:2})
        if(sign){
            if(RegExp("^"+replaceCharacters("如有疑问请参考活动规则")+"$").test(sign.text)){
                this.moveFlag = false
            } else {
                this.moveFlag = true
            }   
        }
    }

}