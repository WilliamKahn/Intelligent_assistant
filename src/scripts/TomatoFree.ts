import { findAndClick, fixedClick, dialogClick, readClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo } from "../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTime, merge, randomExecute, resizeX, resizeY, waitRandomTime } from "../common/utils";
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
        this.goTo(this.tab, 2)
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
        this.goTo(this.tab, 2)
        if(selectedClick("福利中心", 40)){
            this.sign()
            scrollTo("金币献爱心", {waitFor:true})
            if(scrollClick("去签到")) {
                this.sign()
            }
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("听书", 170)){
            if(findAndClick(className("android.widget.TextView"), {
                leftRange:random(1,4).toString(),
                coverBoundsScaling:1
            })){
                fixedClick(merge(["全部播放", "续播"]))
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(this.tab, 2)
        if(scrollClick("去领取", "吃饭补贴")){
            if(dialogClick("领取.*补贴[0-9]+金币")) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("经典", 170)){
            if(findAndClick(className("android.widget.TextView"),{
                leftRange: random(1,3).toString(),
                coverBoundsScaling:1
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        let list = ["阅读赚金币", "听书赚金币", "看短剧赚金币"]
        for(let range of list){
            while(++cycleCounts < MAX_CYCLES_COUNTS && 
                scrollClick("立即领取", range)
            ) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "看视频赚金币")){
            this.watch(text("日常福利"))
        }
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number) {
        this.goTo(this.tab, 0)
        if(selectedClick("看剧", 170)){
            if(findAndClick("[0-9]*\.?[0-9]+万", {
                index:random(0,8),
                coverBoundsScaling:1
            })){
                Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
                let watchTime=0;
                while(totalTime > watchTime){
                    if(textMatches(merge(["上滑查看下一集", "上滑继续观看短剧"])).exists()){
                        gesture(1000, [resizeX(random(380, 420)), resizeY(random(1750, 1850))], 
                        [resizeX(random(780, 820)), resizeY(random(250, 350))])
                    }
                    watchTime += waitRandomTime(30)
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }

}