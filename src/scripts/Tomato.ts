import { findAndClick, fixedClick, dialogClick, scrollClick, selectedClick, scrollPopClick } from "../common/click";
import { Move } from "../common/enums";
import { scrollTo } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, merge, randomExecute, resizeX, resizeY, swipeDown, swipeUp, waitRandomTime, } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_TOMATO, PACKAGE_READ_TOMATO } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";
//番茄畅听
export class Tomato extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO
        this.packageName = PACKAGE_READ_TOMATO
        this.randomTab = className("android.widget.RadioGroup")
        .boundsInside(0, device.height-300, device.width, device.height)
        .boundsContains(0, device.height - 100,device.width, device.height - 50)
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 90 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.winGoldCoin()},
            ()=>{this.listenBook()},
            ()=>{this.watchAds()},
        ])
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        do{
            this.readBook(3 * 60)
            if(cycleCounts % 3 ==0){
                this.openTreasure()
            }
        }while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds())
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //听书看广告可以领奖
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number)=>{
            this.readBook(perTime)
            this.watchAds()
            this.openTreasure()
            this.reward()
        })
    }
    
    @measureExecutionTime
    weight(): void {

        this.goTo(this.tab, 2)
        scrollTo("金币收益")
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(535), resizeY(627)).findOnce()
        if(tmp != null) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        this.sign()
        if (this.scrollNoneClick("立即签到", "(明日)?签到", false)) {
            this.sign()
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        let list = ["听书赚金币", "阅读赚金币", "听书额外存金币"]
        for(let range of list) {
            while(++cycleCounts < MAX_CYCLES_COUNTS &&
                this.scrollNoneClick("(?:立即|翻倍)领取", range, false))
            {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            findAndClick(className("android.widget.TextView"), {
                leftRange:random(1,4).toString(),
                index:1})
            while(!text("阅读电子书").exists()){
                back()
                waitRandomTime(3)
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], 
                [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
                waitRandomTime(3)
                findAndClick(className("android.widget.TextView"), {
                    leftRange:random(1,4).toString(),
                    index:1})
            }
            fixedClick(merge(["开始播放", "续播"]))   
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            
            findAndClick(className("android.widget.TextView"), {
                leftRange:random(1,4).toString(),
                coverBoundsScaling:1
            })
            while(!text("阅读电子书").exists()){
                back()
                waitRandomTime(5)
                swipeUp(Move.Fast, 1000)
                waitRandomTime(5)
                findAndClick(className("android.widget.TextView"), {
                    leftRange:random(1,4).toString(),
                    coverBoundsScaling:1
                })
            }
            if(fixedClick("阅读电子书")){
                this.read(totalTime)
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(this.scrollNoneClick("立即观看", "看视频赚金币", true)){
            this.watch(text("日常福利"))
            let tmp = text("立即观看").findOne(10 * 1000)
            if(tmp != null){
                this.watchAds()
            }
            return true
        } 
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }
    
    @functionLog("抽奖赢金币")
    winGoldCoin(): void {
        this.goTo(this.tab, 2)
        if(this.scrollNoneClick("去抽奖", "天天抽奖赢金币", true)){
            if(findAndClick("抽奖", {fixed:true, waitTimes:10})){
                let cycleCounts = 0
                while(++cycleCounts < MAX_CYCLES_COUNTS 
                    && scrollPopClick("待领取")){
                    this.watchAdsForCoin("已领取")
                }
            }
        }
    }

}