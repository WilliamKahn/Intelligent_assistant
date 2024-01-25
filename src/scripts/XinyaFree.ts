import { findAndClick, fixedClick, readClick, scrollClick } from "../common/click"
import { search } from "../common/search"
import { convertSecondsToMinutes, getNumFromComponent, merge, resizeX, resizeY, waitRandomTime } from "../common/utils"
import { MAX_CYCLES_COUNTS, NAME_READ_XINGYA_FREE, PACKAGE_READ_XINGYA_FREE } from "../global"
import { functionLog, measureExecutionTime } from "../lib/decorators"
import { isWidgetNotFoundException } from "../lib/exception"
import { Record } from "../lib/logger"
import { Base, BaseKey } from "./abstract/Base"

export class XinyaFree extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_XINGYA_FREE
        this.packageName = PACKAGE_READ_XINGYA_FREE
        this.tab = id(this.packageName+":id/main_menu")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.lowEff1Inheritance = true
        this.exchangeRate = 20000
    }

    beforeDoTask(): void {
        if(fixedClick("签到")){
            this.watchAdsForCoin("首页")
        }
    }

    @measureExecutionTime
    highEff(): void {
        //签到
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && this.watchAds()){}
        this.openTreasure()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.swipeReward()
        this.openTreasure()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab,2)
        const component = search("金币余额.*", {waitFor:true})
        if(component !== undefined){
            const weight = getNumFromComponent(component.text.replace(",",""))
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("看剧")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab,1)
        Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
        let watchTime=0;
        while(totalTime > watchTime){
            if(textMatches("上滑.*").exists()){
                gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], 
                [resizeX(random(780, 820)), resizeY(random(250, 350))])
            }
            watchTime += waitRandomTime(30)
        }
    }

    @functionLog("领取奖励")
    swipeReward(): void {
        this.goTo(this.tab,2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("领取")) {
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab,2)
        if(findAndClick("去完成")){
            this.watch(text("日常任务"))
            this.watchAdsForCoin("日常任务")
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab,2)
        if(findAndClick(className("android.view.View"),{
            bounds:{
                top:device.height*2/3,
                left:device.width*2/3
            }
        })){
            this.watchAdsForCoin("日常任务","|看广告最高赚|看广告最高膨胀至")
        }
    }
}