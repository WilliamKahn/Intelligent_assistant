import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_SHUQI, PACKAGE_READ_SHUQI, RANGE_FOUR_FIFTHS_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { findAndClick, closeByImageMatching, doFuncUntilPopupsGone, randomClickChildInList, resizeX, resizeY } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base";

export class ShuQi extends Base{

    coin: number = 0

    constructor(){
        super()
        this.appName = NAME_READ_SHUQI
        this.packageName = PACKAGE_READ_SHUQI
        this.tab = id("android:id/tabs")
        this.exitNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 10 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        closeByImageMatching()
        this.signIn()
        this.coin = this.record()
    }
    @measureExecutionTime
    medEff(): void {
        this.watchAds()
        this.reward()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        time -= 3 * 60
        this.readBook(time)
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        let cCoin = this.record()
        Record.debug(`${cCoin}`)
        this.store(BaseKey.Weight, cCoin -this.coin)
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("立即签到"))){
            doFuncUntilPopupsGone(['看视频领取[0-9]+金币'], {
                func: ()=>{
                    this.watch(text("做任务 赚金币"))
                }
            })
            closeByImageMatching()
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去观看"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            this.watch(text("做任务 赚金币"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        if(findAndClick(text("完整榜单"))){
            randomClickChildInList(
                id(this.packageName+":id/rank_book_recycle_view"),
                random(0, 6)
            )
            this.read(totalTime)
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("领取奖励"), {bounds:RANGE_FOUR_FIFTHS_SCREEN})) {
        }
        if(findAndClick(text("一键收取"))){
            closeByImageMatching()
        }
    }

    record(): number{
        this.goTo(this.tab, 2)
        let tmp = textMatches("[0-9]+金币.*").boundsInside(0,0,resizeX(500),resizeY(500)).findOnce()
        if(tmp != null) {
            Record.debug(`${tmp.text()}`)
            return parseInt(tmp.text())
        }
        return 0    
    }
}