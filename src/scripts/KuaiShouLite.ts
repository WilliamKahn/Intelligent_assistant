import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { Move } from "../common/enums";
import { scrollTo, search, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, doFuncAtGivenTimeByEstimate, getNumFromComponent, moveDown, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD, NAME_VEDIO_KUAISHOU_LITE, PACKAGE_VEDIO_KUAISHOU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { CurrentAppBanned } from "../lib/exception";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouLite extends Base{

    moveFlag:boolean = true

    constructor() {
        super()
        this.appName = NAME_VEDIO_KUAISHOU_LITE
        this.packageName = PACKAGE_VEDIO_KUAISHOU_LITE
        this.tab = id(this.packageName+":id/tab_layout")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.depth = 1
        this.lowEff1Inheritance = true
        this.lowEff2Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        let count = 0
        doFuncAtGivenTimeByEstimate(time, ()=>{
            this.watchAds()
            if(++count % 15 === 0){
                this.openTreasure()
            }
        })
    }
    @measureExecutionTime
    lowEff2(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo("我的金币", {coverBoundsScaling: 1})
        const component = searchByOcrRecognize("[0-9]+")
        if(component != undefined){
            const weight = parseInt(component.text)
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 15)
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("立即领取")) {
            this.watchAdsForCoin("日常福利")
            closeByImageMatching()
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(scrollClick("领福利", "看视频得[0-9]+金币")){
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("看直播")
    watchLive():void {
        this.goTo(this.tab, 2)
        if(scrollClick("领福利", "看6次直播领金币")){
            for(let i = 0;i < 6;i++){
                swipeDown(Move.Fast, 1000)
                waitRandomTime(2)
                if(findAndClick(id(this.packageName+":id/play_view_container"), {
                    index: random(0,3),
                    waitTimes: 70
                })){
                    this.backUntilFind(id(this.packageName+":id/play_view_container"))
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.watchAdsForCoin("日常福利")
        if(fixedClick("开宝箱得金币")) {
            const component = search("恭喜你获得")
            const component2 = search("[0-9]+金币", {bounds: {top: component?.bounds.bottom}})
            const coin = getNumFromComponent(component2?.text || "0")
            if(coin < MIN_RUN_THRESHOLD) {
                throw new CurrentAppBanned(this.appName+"账号异常")
            }
            this.watchAdsForCoin("日常福利")
        }
    }
}