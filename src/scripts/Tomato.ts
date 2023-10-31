import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_TOMATO, PACKAGE_READ_TOMATO, RANGE_MIDDLE_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { waitRandomTime, findAndClick, doFuncUntilPopupsGone, randomClickChildInList, scrollTo, doFuncAtGivenTime, resizeX, resizeY } from "../lib/utils";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";
//番茄畅听
export class Tomato extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO
        this.packageName = PACKAGE_READ_TOMATO
        this.tab = id(this.packageName+":id/c6")
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 45 * 60)
        this.lowEffEstimatedTime = 0
    }

    returnOfWatchAds: boolean = false

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.winGoldCoin()
        this.listenBook()
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS){
            this.watchAds()
            if(!this.returnOfWatchAds){
                Record.debug("break")
                break
            }
            if(cycleCounts % 3 ==0){
                this.openTreasure()
            }
            this.readBook(3 * 60)
        }
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //听书看广告可以领奖
        //阅读，预留五分钟给领奖
        time -= 5 * 60
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number)=>{
            this.watchAds()
            this.openTreasure()
            this.readBook(perTime)
        })
        this.reward()
    }
    
    @measureExecutionTime
    weight(): void {

        this.goTo(this.tab, 2)
        scrollTo(text("金币收益"))
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(535), resizeY(627)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        this.sign()
        scrollTo(text("金币献爱心"))
        if (findAndClick(text("立即签到"), {bounds: RANGE_MIDDLE_SCREEN})) {
            this.sign()
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        if(this.resign){
            Record.info("账号恢复正常, 重新签到")
            this.signIn()
        }
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        if(findAndClick(textMatches("(?:立即|翻倍)领取"), {
            searchByLeftRangeOption: text("收益日报奖励"),
            bounds: RANGE_MIDDLE_SCREEN
        })){
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
        }
        //阅读奖励
        while(this.situation && ++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(textMatches("(?:立即|翻倍)领取"), {
                searchByLeftRangeOption: text("阅读赚金币"),
                bounds: RANGE_MIDDLE_SCREEN})) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
        }
        //听书奖励
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && findAndClick(textMatches("(?:立即|翻倍)领取"), {
                searchByLeftRangeOption: text("听书赚金币"),
                bounds: RANGE_MIDDLE_SCREEN})) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(findAndClick(text("小说"))){
            if(findAndClick(text("更多").boundsInside(800, 400, 1080, 600))){
                randomClickChildInList(
                    className("androidx.recyclerview.widget.RecyclerView")
                    .depth(13).drawingOrder(2).boundsInside(resizeX(60), resizeY(399),resizeX(1029), resizeY(1005)), 
                    random(0, 3))
                randomClickChildInList(
                    className("androidx.recyclerview.widget.RecyclerView")
                    .depth(9).drawingOrder(2).boundsInside(resizeX(0), resizeY(273),resizeX(1080), resizeY(2340)), 
                    random(1, 5))
                if(findAndClick(className("android.widget.FrameLayout").depth(9).drawingOrder(3))){
                    if (text("看视频领时长").exists()){
                        if(findAndClick(text("看视频领时长"))){
                            this.watch(text("阅读电子书"))
                        }
                    }
                }
                
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(findAndClick(text("看书"))){
            randomClickChildInList(
                className("androidx.recyclerview.widget.RecyclerView")
                .depth(17).drawingOrder(1).boundsInside(0, resizeY(464),resizeX(1080), resizeY(2190)),
                random(0, 4),
                id("com.xs:fm:id/axk").findOnce()
            )
            this.read(totalTime)
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        if(text("立即观看").exists()){
            if(findAndClick(text("立即观看"), {bounds: RANGE_MIDDLE_SCREEN})) {
                this.watch(text("日常福利"))
                let tmp = text("立即观看").findOne(10 * 1000)
                if(tmp != null){
                    this.watchAds()
                }
            }
            this.returnOfWatchAds = true
        } else {
            this.returnOfWatchAds = false
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }
    
    winGoldCoin(): void {
        //抽奖
        doFuncUntilPopupsGone(['立即前往'], {
            func: ()=>{
                if (findAndClick(text("本次免费"))) {
                    Record.log("点击抽奖")
                    waitRandomTime(10)
                }
            }
        })
    }

}