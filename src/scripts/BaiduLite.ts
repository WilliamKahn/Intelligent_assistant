import { dialogClick, fixedClick, scrollClick } from "../common/click";
import { search } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown } from "../common/utils";
import { NAME_VEDIO_BAIDU_LITE, PACKAGE_VEDIO_BAIDU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduLite extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU_LITE
        this.appName = NAME_VEDIO_BAIDU_LITE
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 20 * 60)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 10 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        if(dialogClick("立即领今日打款")){
            closeByImageMatching()
        }
        this.signIn()
        this.openTreasure()
        this.watchAds()
    }

    @measureExecutionTime
    medEff(): void {
        this.swipeVideo(5 * 60)
        this.payouts()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
        })
        this.reward()
    }
    
    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 4)
        const [_, weight] = search("[0-9]+", {index:2})
        this.store(BaseKey.Weight, weight)
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 0)
        this.goTo(this.tab, 2)
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        while(scrollClick("去完成", "看广告赚钱")){
            this.watch(text("现金收益"))
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        moveDown(totalTime, 10)
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("提现")
    payouts(): void{
        this.goTo(this.tab, 1)
        if(fixedClick("换现金")){
            if(fixedClick("提现")){
                if(fixedClick("立即提现到微信")){
                    fixedClick("确认提现")
                }
            }
        }
    }

}