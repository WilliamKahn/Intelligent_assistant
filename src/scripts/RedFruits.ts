import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_RED_FRUITS, PACKAGE_READ_RED_FRUITS, RANGE_MIDDLE_SCREEN } from "../global";
import { waitRandomTime, findAndClick, doFuncUntilPopupsGone, merge, convertSecondsToMinutes, scrollTo, randomClickChildInList, doFuncAtGivenTime, resizeX, resizeY, close } from "../lib/utils";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { Record } from "../lib/logger";
import { BaseKey } from "./abstract/Base";


export class RedFruits extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_RED_FRUITS
        this.packageName = PACKAGE_READ_RED_FRUITS
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 40 * 60)
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
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
        //减去领取奖励的时间
        time -= 5 * 60
        doFuncAtGivenTime(time / 2, 10 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
        })
        doFuncAtGivenTime(time / 2, 10 * 60, (perTime: number) => {
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {

        this.goTo(text("福利"), -1)
        scrollTo(text("金币收益"))
        let tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(442)).findOnce()
        if(tmp != null) {
            Record.log(`${this.constructor.name}:${parseInt(tmp.text())}`)
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("刷短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(findAndClick(text("推荐"))){
            randomClickChildInList(
                className("androidx.recyclerview.widget.RecyclerView").depth(16).drawingOrder(1),
                random(3,8))
            Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
            let watchTime=0;
            while(totalTime > watchTime){
                if(textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()){
                    gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], 
                    [resizeX(random(780, 820)), resizeY(random(250, 350))])
                }
                watchTime += waitRandomTime(30)
            }
            close(2)
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(text("首页"), -1)
        if(findAndClick(text("经典"))){
            randomClickChildInList(
                className("android.widget.LinearLayout").depth(23).drawingOrder(1),
                random(0,3)
            )
            this.read(totalTime)
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(text("福利"), -1)
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

    @functionLog("签到")
    signIn(): void {
        this.goTo(text("福利"), -1)
        this.sign()
        if(findAndClick(text("去签到"), {bounds: RANGE_MIDDLE_SCREEN})){
            this.sign()
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(text("福利"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            findAndClick(text("去观看"), {bounds: RANGE_MIDDLE_SCREEN})){
            this.watch(text("日常福利"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(text("福利"), -1)
        this.open()
    }

}