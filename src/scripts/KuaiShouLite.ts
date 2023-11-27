import { findAndClick } from "../common/click";
import { scrollTo } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown } from "../common/utils";
import { BASE_ASSIMT_TIME, NAME_VEDIO_KUAISHOU_LITE, PACKAGE_VEDIO_KUAISHOU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouLite extends Base{

    buttonNameList:string[] = [
        '看内容最高可得.+', 
    ];

    constructor() {
        super()
        this.appName = NAME_VEDIO_KUAISHOU_LITE
        this.packageName = PACKAGE_VEDIO_KUAISHOU_LITE
        this.tab = id(this.packageName+":id/tab_layout")
        this.depth = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 30 * 60)
        this.lowEffEstimatedTime = 0
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

        doFuncAtGivenTime(time, 10 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
        })
    }

    @measureExecutionTime
    weight(): void {
        this.store(BaseKey.Weight, this.record())
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        moveDown(totalTime, 15)
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("立即领取"))) {
            this.watchAdsForCoin("日常福利")
            closeByImageMatching()
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        scrollTo("日常任务")
        // let before = this.record()
        // back()
        // waitRandomTime(4)
        // let flag = true
        let cycleCounts = 0
        // while(++cycleCounts < MAX_CYCLES_COUNTS && containInRegion(text("领福利"), textStartsWith("看广告得").findOnce()?.parent()?.parent())){
        //     if(findAndClick(findInRegion(text("领福利"), textStartsWith("看广告得").findOnce()?.parent()?.parent()), 
        //     RANGE_MIDDLE_SCREEN)){
                // this.watchUntil()
                // if(flag){
                //     let after = this.record()
                //     //小于40金币没有意义
                //     if(after - before < 40){
                //         throw "lowBenifit"
                //     }
                //     flag = false
                //     back()
                //     waitRandomTime(4)
                // }
        //     }
        // }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if(text("恭喜你获得").exists()){
            this.watchAdsForCoin("日常福利")
        }
        if(findAndClick(text("开宝箱得金币"))) {
            if(text("恭喜你获得").exists()){
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    record(): number {
        this.goTo(this.tab, 2)
        if(findAndClick(text("我的金币"))){
            let tmp = textEndsWith("金币").findOnce()
            if(tmp != null){
                return parseInt(tmp.text())
            }
        }
        return 0
    }
}