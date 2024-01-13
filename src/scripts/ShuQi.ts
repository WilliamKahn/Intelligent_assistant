import { dialogClick, readClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching, doFuncAtGivenTime, } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_SHUQI, PACKAGE_READ_SHUQI } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class ShuQi extends Base{

    constructor(){
        super()
        this.appName = NAME_READ_SHUQI
        this.packageName = PACKAGE_READ_SHUQI
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 15 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.watchAds()
        this.reward()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 20 * 60, (perTime:number) => {
            this.readBook(perTime)
            this.reward()
        })
    }
    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 4)
        let tmp = id(this.packageName+":id/account_worth_money").findOnce()
        if(tmp != null){
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("立即签到")){
            closeByImageMatching()
            closeByImageMatching()
        } else {
            if(scrollClick("去签到", "每日签到")){
                if(dialogClick("立即签到")){
                    closeByImageMatching()
                    closeByImageMatching()
                }
            }
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去观看", "看视频赚[0-9]+金币")){
            this.watch(text("做任务 赚金币"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        if(selectedClick("推荐", 170)){
            if(readClick(id(this.packageName+":id/tpl_book_name"), random(0,3)*2)){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("(一键|加倍)收取")){
            this.watchAdsForCoin("做任务 赚金币")
            dialogClick("领取加倍奖励")
            closeByImageMatching()
        }
    }
}