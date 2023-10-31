import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_TOMATO_LITE, PACKAGE_READ_TOMATO_LITE, RANGE_FOUR_FIFTHS_SCREEN, RANGE_MIDDLE_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { waitRandomTime, findAndClick, doFuncUntilPopupsGone, scrollTo, randomClickChildInList, resizeX, resizeY } from "../lib/utils";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";


export class TomatoLite extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO_LITE
        this.packageName = PACKAGE_READ_TOMATO_LITE
        this.tab = id(this.packageName+":id/c7")
        this.backTimes = 2
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 35 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.winGoldCoin()
        if(this.situation) this.mealSupp()
    }

    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        this.watchAds()
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo(text("金币收益"))
        let tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(373)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        this.sign()
        if(findAndClick(text("立即签到"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            this.sign()
        }    
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        randomClickChildInList(
            className("androidx.recyclerview.widget.RecyclerView").depth(17).drawingOrder(1).boundsInside(0,resizeY(464), resizeX(1080), resizeY(2190)), 
            random(2,6)
        )
    }

    @functionLog("领取所有奖励")
    reward(): void {
        if(this.resign){
            Record.info("账号恢复正常, 重新签到")
            this.signIn()
        }
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("立即领取"), {bounds: RANGE_MIDDLE_SCREEN})) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: () => { 
                    this.watch(text("日常福利"))
                }
            })
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(this.tab, 2)
        if(findAndClick(text("去领取"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            if(findAndClick(textStartsWith("领取"))) {
                doFuncUntilPopupsGone(this.buttonNameList, {
                    func: () => { 
                        this.watch(text("日常福利"))
                    }
                })
            }
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && text("立即观看").exists()) {
            if(cycleCounts % 3 === 0) {
                this.openTreasure()
            }
            if(findAndClick(text("立即观看"), {bounds: RANGE_MIDDLE_SCREEN})) {
                Record.log(`正在观看第${cycleCounts}个广告`)
                this.watch(text("日常福利"))
            }
            text("立即观看").findOne(3 * 60 * 1000)
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }

    @functionLog("去抽奖")
    winGoldCoin(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("去抽奖"))){
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && findAndClick(text("抽奖"), {bounds: RANGE_MIDDLE_SCREEN})) {
                waitRandomTime(5)
                if(!findAndClick(text("开心收下"))){
                    doFuncUntilPopupsGone(this.buttonNameList, {
                        func: () => { 
                            this.watch(text("日常福利"))
                        }
                    })
                } else {
                    break
                }
            }
        }
    }

}