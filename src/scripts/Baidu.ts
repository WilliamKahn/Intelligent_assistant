import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, convertSecondsToMinutes, moveDown } from "../common/utils";
import { NAME_VEDIO_BAIDU, NAME_VEDIO_BAIDU_BIG, PACKAGE_VEDIO_BAIDU, PACKAGE_VEDIO_BAIDU_BIG } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class Baidu extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU
        this.appName = NAME_VEDIO_BAIDU
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 20 * 60)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 5 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.watchAds()
    }

    @measureExecutionTime
    medEff(): void {
        this.swipeVideo(2 * 60)
        if(fixedClick("点击提现")){

            this.payouts()
        }
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(0)
        scrollTo("金币收益",{coverBoundsScaling:1})
        const [_, name] = searchByOcrRecognize("[0-9]+")
        if(name != undefined){
            const weight = parseInt(name.toString())
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(0)
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goto(0)
        while(scrollClick("去完成", "看广告赚钱.*")){
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(0)
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 10)
    }

    @functionLog("提现")
    payouts(): void{
        this.goto(1)
        if(fixedClick("微信提现")){
            if(fixedClick("立即微信提现")){
                log(textMatches(".+元").findOnce()?.text())
                dialogClick("继续看视频赚钱提现")
            }
        }
    }

    @functionLog("去提现")
    toPayouts(): void{
        this.goto(1)
        if(scrollClick("去提现", "今日提现特权")){
            if(fixedClick("立即微信提现")){
                log(textMatches(".+元").findOnce()?.text())
                dialogClick("继续看视频赚钱提现")
            }
        }
    }

    @functionLog("走路赚钱")
    walkEarn(): void{
        this.goto(1)
        if(scrollClick("去领取", "走路赚钱")){
            dialogClick("领[0-9]+铜钱")
            closeByImageMatching()
        }
    }

    @functionLog("看广告领铜钱")
    watchAdsEarn(): void{
        this.goto(1)
        while(scrollClick("去领取", "看广告领铜钱奖励.*")){
            this.watch(text("我的铜钱"))
        }
    }

    goto(num: number): void{
        if(num === 0){
            if(this.tab.exists()){
                this.goTo(this.tab, 4)
                findAndClick("天天领现金",{ocrRecognize:true, bounds:{bottom:device.height * 1 /5}})
            }else {
                this.backUntilFind(text("金币收益"))
            }
        } else if(num === 1){
            this.goTo(this.tab, 1)
            if(!text("我的铜钱").exists()){
                fixedClick("换现金")
            }
        }
    }

}