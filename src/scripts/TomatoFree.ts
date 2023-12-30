import { findAndClick, fixedClick, dialogClick, readClick, scrollClick, selectedClick } from "../common/click";
import { Move } from "../common/enums";
import { scrollTo, search } from "../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTime, merge, randomExecute, resizeX, resizeY, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_TOMATO_FREE, PACKAGE_READ_TOMATO_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";



export class TomatoFree extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO_FREE
        this.packageName = PACKAGE_READ_TOMATO_FREE
        this.randomTab = className("android.view.ViewGroup")
        .boundsInside(0, device.height-300, device.width, device.height)
        .boundsContains(100, device.height - 100,device.width-100, device.height - 50)
        this.initialComponent = this.tab
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 35 * 60)
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
            ()=>{
                this.listenBook()
                this.watchAds()
            },
        ])
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time/2, 10 * 60, (perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
            this.reward()
        })
        doFuncAtGivenTime(time/2, 10 * 60, (perTime: number)=>{
            this.swipeVideo(perTime)
            this.openTreasure()
            this.reward()
        })
    }

    @measureExecutionTime
    weight(): void {
        this.goto()
        scrollTo("金币收益")
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(581), resizeY(567)).findOnce()
        if(tmp != null) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goto()
        this.sign()
        if(this.scrollNoneClick("去签到", "签到领金币|明日签到", false)) {
            this.sign()
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("听书", 170)){
            for(let i = 1;i<5;i++){
                const [bound, _] = search(i.toString())
                if(findAndClick(className("android.widget.TextView"), {
                    bounds: {top: bound.top, left:bound.right},
                    coverBoundsScaling: 1
                })){
                    if(fixedClick("全部播放|续播")){
                        break
                    } else{
                        back()
                        waitRandomTime(4)
                    }
                }
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goto()
        if(this.scrollNoneClick("去领取", "吃饭补贴", true)){
            if(fixedClick("领取.*补贴[0-9]+金币")) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            for(let i = 1;i<5;i++){
                const [bound, _] = search(i.toString())
                if(findAndClick(className("android.widget.TextView"), {
                    bounds: {top: bound.top, left:bound.right},
                    coverBoundsScaling: 1
                })){
                    if(text("阅读电子书").exists()){
                        back()
                        waitRandomTime(4)
                    } else{
                        break
                    }
                }
            }
            this.read(totalTime)
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goto()
        let cycleCounts = 0
        let list = ["阅读赚金币", "听书赚金币", "看短剧赚金币"]
        for(let range of list){
            while(++cycleCounts < MAX_CYCLES_COUNTS && 
                this.scrollNoneClick("立即领取", range, false)
            ) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && this.scrollNoneClick("立即领取", "看视频赚金币", true)){
            this.watch(text("日常福利"))
        }
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number) {
        this.goTo(this.tab, 0)
        if(selectedClick("看剧", 170)){
            if(findAndClick(className("android.widget.ImageView"), {
                fixed:true,
                index: random(2, 13)
            })){
                Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
                let watchTime=0;
                while(totalTime > watchTime){
                    if(textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()){
                        swipeDown(Move.Fast, 200)
                    }
                    watchTime += waitRandomTime(30)
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        this.open()
    }

    goto(): void{
        let tmp = this.backUntilFind(this.tab)
        if(tmp.childCount() === 6){
            this.goTo(this.tab, 3)
        } else {
            this.goTo(this.tab, 2)
        }
    }
}