import { dialogClick, findAndClick, fixedClick, normalClick, ocrClick, scrollClick } from "../../common/click";
import { scrollTo } from "../../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTime, getNumFromComponent, moveDown, randomExecute, resizeX, resizeY } from "../../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { CurrentAppBanned } from "../../lib/exception";
import { Record } from "../../lib/logger";
import { Base, BaseKey } from "./Base";

export abstract class AbstractArticle extends Base {

    constructor(packageName: string) {
        super()
        this.packageName = packageName
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.exchangeRate = 33000
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 110 * 60)
        this.lowEffEstimatedTime = 0
    }

    abstract goToTask():void
    abstract getCoinStr():string

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.walkEarn()},
            ()=>{this.mealSupp()},
            ()=>{this.sleepEarn()},
            ()=>{this.openTreasure()},
            ()=>{this.doubleEarn()},
            ()=>{this.watchAds()},
        ])
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        do{
            this.swipeVideo(10 * 60)
            this.openTreasure()
        }while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds())
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) =>{
            this.swipeVideo(perTime)
            this.openTreasure()
            this.watchAds()
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goToTask()
        if(scrollClick(".*我的金币.*")) {
            let tmp = textMatches(/(\d+)/).findOnce()
            if(tmp != null) {
                Record.debug(`${this.constructor.name}:${tmp.text()}`)
                const weight = parseInt(tmp.text())
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        if(dialogClick("立即签到")){
            this.watchAdsForCoin("日常任务")
        } else {//"签到失败"
            if(findAndClick("立即签到", {feedback:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goToTask()
        if (fixedClick("开宝箱得金币")) {
            const str = this.getCoinStr()
            const coin = getNumFromComponent(str)
            if(coin < MIN_RUN_THRESHOLD){
                throw new CurrentAppBanned(this.appName+"账号异常")
            }
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goToTask()
        if(scrollClick("领福利")){
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 15)
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goToTask()
        let cycleCounts = 0
        scrollTo("现金收益.*")
        while(++cycleCounts < MAX_CYCLES_COUNTS  && ocrClick("点击领取|点击抽奖")){
            this.watchAdsForCoin("日常任务")
            if(dialogClick("开始抽奖")){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(dialogClick("点击领取")){
                    break
                }
            }
        }
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goToTask()
        if(scrollClick("吃饭补贴")){
            if(findAndClick("领取.*补贴[0-9]+金币", {fixed:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("走路赚钱")
    walkEarn(): void{
        this.goToTask()
        if(scrollClick("走路赚钱")){
            if(findAndClick("领取[0-9]+金币", {fixed:true, feedback:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("睡觉赚钱")
    sleepEarn(): void{
        this.goToTask()
        if(scrollClick("睡觉赚钱")){
            if(fixedClick("我睡醒了")){
                if(fixedClick("领取[0-9]+金币")){
                    this.watchAdsForCoin("日常任务")
                }
            }
            fixedClick("我要睡了")
        }
    }

    doubleEarn(): void{
        this.goToTask()
        if(scrollClick("去翻倍|点击翻倍")){
            dialogClick("我知道了")
        }
    }

}