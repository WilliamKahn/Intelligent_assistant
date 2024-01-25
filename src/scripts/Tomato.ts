import { findAndClick, fixedClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo, search } from "../common/search";
import { doFuncAtGivenTime, randomExecute, resizeX, resizeY, waitRandomTime } from "../common/utils";
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
        .boundsInside(0, device.height*2/3, device.width, device.height)
        this.initialNum = 0
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
        this.lowEff1Start = 5
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.winGoldCoin()},
        ])
    }
    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        let cycleCounts = 0
        while(++cycleCounts < 50 && this.watchAds()){
            this.readBook(3 * 60)
            if(cycleCounts % 3 ==0){
                this.openTreasure()
            }
        }
        this.listenReward()
        this.depositReward()
        if(cycleCounts * 3 >= 120){
            this.lowEff1Start = 4
        } else if(cycleCounts * 3 >= 60){
            this.lowEff1Start = 3
        }
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.listenBook()
        this.readBook(time)
        this.openTreasure()
        this.readReward()
        this.listenReward()
        this.depositReward()
    }

    goto(): void {
        this.goTo(this.tab, 2)
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        this.sign()
        if (this.scrollClick("立即签到", "(明日)?签到")) {
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
                this.scrollClick("(?:立即|翻倍)领取", range))
            {
                this.watchAdsForCoin("日常福利")
            }
        }
    }
    @functionLog("领取阅读奖励")
    readReward(): void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS &&
            this.scrollClick("(?:立即|翻倍)领取", "阅读赚金币"))
        {
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取听书奖励")
    listenReward(): void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS &&
            this.scrollClick("(?:立即|翻倍)领取", "听书赚金币"))
        {
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取额外存金币奖励")
    depositReward(): void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS &&
            this.scrollClick("(?:立即|翻倍)领取", "听书额外存金币"))
        {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        this.openBook("开始播放|续播")
        if(fixedClick("看视频领时长")){
            this.watch(text("看视频领时长"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        this.openBook("阅读电子书")
        this.read(totalTime)
    }

    openBook(str: string): void{
        if(selectedClick("推荐", 170)){
            for(let i = 1;i<5;i++){
                const component = search(i.toString())
                if(findAndClick(className("android.widget.TextView"), {
                    bounds: {top: component?.bounds.top, left:component?.bounds.right},
                })){
                    if(fixedClick(str)){
                        break
                    } else{
                        back()
                        waitRandomTime(4)
                    }
                }
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(this.scrollClick("立即观看", "看视频赚金币", true)){
            this.watch(text("日常福利"))
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
        if(this.scrollClick("去抽奖", "天天抽奖赢金币", true)){
            if(findAndClick("抽奖", {fixed:true, waitTimes:10})){
                let cycleCounts = 0
                while(++cycleCounts < MAX_CYCLES_COUNTS 
                    && findAndClick("待领取")){
                    this.watchAdsForCoin("已领取")
                }
            }
        }
    }

}